## 레거시 코드에서 마주한 의문

개발을 하다 보면 예상치 못한 버그를 마주할 때가 있어요. 특히 레거시 프로젝트를 유지보수하다 보면 더욱 그렇죠. 저 또한 회사의 레거시 코드를 개선하던 중, 이상한 이슈를 발견했어요.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"></script>
    <title>Document</title>
  </head>
  <body>
    <div id="vue-container">
      <div>컨텐츠</div>
      <script type="application/javascript">
        console.log('script executed')
      </script>
    </div>

    <script>
      const vm = new Vue({
        el: '#vue-container',
        mounted() {
          console.log('vm mounted')
        },
      })
    </script>
  </body>
</html>
```

**콘솔 출력:**

```
script executed
script executed  // 왜 두 번?
vm mounted
```

분명 `script` 태그는 하나인데, 콘솔에는 `script executed`가 두 번 출력되고 있었어요. 이러한 문제는 예상치 못한 부작용을 일으킬 수 있고, 특히 API 호출이나 DOM 조작이 포함된 경우 심각한 버그로 이어질 수 있어요.

## 과연 Vue는 Script를 어떻게 처리하는 걸까?

### SFC와 In-DOM Template의 차이

처음에는 SFC(Single File Component)와 In-DOM template의 동작 방식 차이 때문이라고 생각했어요.

- **SFC (`.vue` 파일)**: 빌드 타임에 컴파일되어 `createElement` 함수로 변환되기 때문에 `template` 안의 `script`는 실행되지 않음
- **In-DOM template**: HTML에 직접 작성되어 브라우저가 파싱하면서 실행됨

하지만 In-DOM template라도 한 번만 실행될 거라고 예상했는데, 실제로는 두 번 실행되고 있었어요.

### 디버거로 추적한 실행 경로

정확한 원인을 찾기 위해 `debugger` 문을 추가하고 Call Stack을 확인했어요.

```html
<script type="application/javascript">
  debugger
  console.log('script executed')
  console.trace()
</script>
```

**1차 실행 (브라우저 파싱):**

```
(anonymous) @ inline script
```

**2차 실행 (Vue 내부):**

```
(anonymous) @ inline script
insertBefore (native)
insert @ vue.js:xxxx
createElm @ vue.js:xxxx
patch @ vue.js:xxxx
Vue._update @ vue.js:xxxx
```

여기서 핵심은 Vue의 `insertBefore`에서 script가 다시 실행되고 있다는 점이에요.

### Vue의 DOM Patching 메커니즘

Vue가 In-DOM template을 처리하는 과정을 살펴보면:

1. `#vue-container`의 내용을 template으로 읽기
2. Virtual DOM 생성
3. 실제 DOM으로 patch (여기서 `insertBefore` 호출)
4. script 노드가 DOM에 삽입되면서 재실행

중요한 점은, `insertBefore`나 `appendChild`로 script 노드를 DOM에 삽입하면 브라우저가 자동으로 실행한다는 거예요.

```jsx
// 간단한 테스트
const script = document.createElement('script')
script.textContent = 'console.log("test")'
// 여기까지는 실행 안 됨

document.body.appendChild(script)
// 여기서 실행됨!
```

## 그런데 모든 Script가 두 번 실행되는 건 아니었다

여기까지 이해하고 나니, 또 다른 의문이 생겼어요. "그럼 모든 In-DOM template의 script가 두 번 실행되는 건가?" 실제로 테스트를 해보았습니다.

```html
<div id="vue-container">
  <script type="text/javascript">
    console.log('text/javascript')
  </script>
  <script type="application/javascript">
    console.log('application/javascript')
  </script>
</div>
```

**결과:**

```
text/javascript (1회만 실행!)
application/javascript (2회 실행)
```

놀랍게도 `text/javascript`는 한 번만 실행되고, `application/javascript`만 두 번 실행되었어요.

## Vue의 Script 필터링 로직

### Vue는 왜 특정 Script만 제거할까?

Vue 2는 In-DOM template을 처리할 때, 특정 script 태그를 제거하는 로직이 있어요. 이미 브라우저가 실행했다고 간주하고, 재실행을 방지하기 위해서죠.

```jsx
// Vue 2 내부 로직 (추정)
function shouldRemoveScript(type) {
  // 표준 타입만 제거
  return !type || type === '' || type === 'text/javascript'
}

if (tagName === 'script' && shouldRemoveScript(scriptType)) {
  // template에서 제거 → 재실행 안 됨
} else {
  // 일반 요소로 유지 → 재삽입 시 재실행됨
}
```

### MDN에서 찾은 답

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#textjavascript)를 살펴보니 명확한 답이 있었어요.

> JavaScript content should always be served with the MIME type text/javascript.

**Legacy JavaScript MIME types (모두 Deprecated):**

- `application/javascript` - Deprecated
- `application/ecmascript` - Deprecated
- `text/ecmascript` - Deprecated
- 그 외 다양한 비표준 타입들...

`application/javascript`는 역사적인 이유로 브라우저가 지원하지만, **deprecated된 레거시 타입**이었어요. Vue는 표준을 따르는 타입만 필터링하고, deprecated 타입은 개발자가 특수한 목적으로 사용했을 수 있다고 간주하여 그대로 유지하는 것으로 보여요.

## 해결 방법

### 1. 표준을 따르는 것이 가장 안전해요

가장 간단한 해결책은 `type` 속성을 생략하거나 `text/javascript`를 사용하는 거예요.

```html
<!-- 권장: type 생략 -->
<div id="vue-container">
  <script>
    console.log('1회만 실행됨!')
  </script>
</div>
```

```html
<!-- 또는 명시적으로 text/javascript 사용 -->
<div id="vue-container">
  <script type="text/javascript">
    console.log('1회만 실행됨!')
  </script>
</div>
```

### 2. In-DOM Template에서 Script 사용을 피하기

In-DOM template에 실행 가능한 script를 넣는 건 좋은 패턴이 아니에요. Vue의 라이프사이클 훅을 활용하는 것이 더 명확하고 안전해요.

```html
<div id="vue-container">
  <div>컨텐츠</div>
</div>

<script>
  const vm = new Vue({
    el: '#vue-container',
    mounted() {
      // 필요한 로직은 여기서 실행
      console.log('안전하게 1회 실행!')
    },
  })
</script>
```

### 3. 데이터 저장이 목적이라면

만약 실행이 아닌 데이터 저장이 목적이라면, `application/json` 타입을 사용하면 됩니다. 이 경우 브라우저가 실행하지 않아요.

```html
<div id="vue-container">
  <script type="application/json" id="config">
    {
      "apiUrl": "https://api.example.com",
      "timeout": 5000
    }
  </script>
</div>

<script>
  new Vue({
    el: '#vue-container',
    mounted() {
      const config = JSON.parse(document.getElementById('config').textContent)
      console.log(config)
    },
  })
</script>
```

## 유연한 사고와 웹 표준에 대한 이해

이 버그를 해결하는 과정에서 몇 가지 중요한 교훈을 얻었어요.

1. **표준을 따르는 것의 중요성**: `application/javascript`처럼 `deprecated`된 타입은 예상치 못한 동작을 일으킬 수 있어요.
2. **프레임워크의 내부 동작 이해**: Vue가 왜 특정 방식으로 동작하는지 이해하면, 더 나은 코드를 작성할 수 있어요.
3. **디버깅 도구의 활용**: Call Stack을 추적하여 정확한 실행 경로를 파악하는 것이 문제 해결의 핵심이에요.

더 나아가, 레거시 코드를 유지보수할 때는 "이게 왜 이렇게 작성되었을까?"라는 의문을 항상 가지고 접근하는 것이 중요해요. 때로는 과거의 코드가 당시의 제약사항이나 버전 이슈 때문에 작성된 것일 수 있고, 현재는 더 나은 방법이 있을 수 있어요.
