## 들어가며

흔히 "React에서 List에서 key는 unique한 값을 넣어야 한다." 라고 하는데 왤까?

궁금해서
[React 공식문서](https://react-ko.dev/learn/rendering-lists#why-does-react-need-keys)에서는 아래와 같이 설명한다.

> 데스크톱의 파일에 이름이 없다고 상상해 봅시다. 파일 이름 대신 첫 번째 파일, 두 번째 파일 등의 순서로 파일을 참조할 것입니다. 물론 익숙해질 수도 있지만, 파일을 삭제하면 혼란스러워질 수도 있습니다. 두 번째 파일이 첫 번째 파일이 되고, 세 번째 파일이 두 번째 파일이 되는 식으로 말이죠.\_

> 폴더의 파일 이름과 배열의 JSX key는 비슷한 역할을 합니다. key를 사용하면 형제 항목 사이에서 특정 항목을 고유하게 식별할 수 있습니다. 잘 선택한 key는 배열 내 위치보다 더 많은 정보를 제공합니다. 만약 재정렬로 인해 어떤 항목의 위치가 변경되더라도, 해당 항목이 사라지지 않는 한, React는 `key`를 통해 그 항목을 식별할 수 있습니다.\_

그런데 나는 텍스트만으로는 와닿지 않아서 직접 확인해보려 한다.

## 왜 key를 써야하는지 직접 확인해보기

Todo App을 간단하게 만들어서 key에 unique한 값을 써보는 것(1)과 index를 사용해보는 것(2)로 테스트를 해보았다.

```jsx showLineNumbers
let id = 1

export default function UseIndexForKey() {
  const [todos, setTodos] = useState([])

  const handleAdd = (text, id) => {
    setTodos([...todos, { text, id }])
  }

  const handleDel = useCallback((targetId) => {
    setTodos((prev) => {
      return prev.filter(({ id }) => id !== targetId)
    })
  }, [])

  const shuffle = () => {
    const newTodos = todos.slice()
    for (let i = newTodos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newTodos[i], newTodos[j]] = [newTodos[j], newTodos[i]]
    }
    setTodos(newTodos)
  }

  return (
    <>
      <ul>
        {todos.map((todo, idx) => (
          <Item key={idx} todo={todo} del={handleDel} />
        ))}
      </ul>
      <AddForm add={handleAdd} />
      <button onClick={() => shuffle()}>shuffle</button>
    </>
  )
}

function AddForm({ add }) {
  const [text, setText] = useState('')
  return (
    <form>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          add(text, id++)
          setText('')
        }}
      >
        Add
      </button>
    </form>
  )
}

const Item = memo(
  ({ todo, del }) => {
    const [text, setText] = useState(todo.text)
    console.log(`${todo.text} rendered`)
    return (
      <li>
        <span>{todo.text}</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => del(todo.id)}>Delete</button>
      </li>
    )
  },
  (a, b) => {
    console.log(a, b)
    return Object.is(a, b)
  }
)
```

위 코드를 실행해보면 대략 아래와 같은 앱이 구동된다.

![TODO](/images/posts/react-key-memo-rerender/todo-app.png)

간단히 앱을 설명하자면

- Todo Item을 추가했을 때 입력된 값을 라벨 및 Input의 초기 데이터로 가진다.
- 각 Item은 삭제 가능하다
- `shuffle` 버튼을 클릭 시 순서를 뒤섞는다

### 1. key에 id 사용

가운데에 있는 라인을 삭제 하거나 `shuffle` 클릭 시 어떻게 될까?

![삭제했을때](/images/posts/react-key-memo-rerender/id-delete.png)

![셔플했을때](/images/posts/react-key-memo-rerender/id-shuffle.png)

정상적으로 라벨과 Input의 값이 일치하는 걸 볼 수 있다.

그러면 key에 index를 사용한다면 어떻게 될까?

### 2. key에 index 사용

key에 index를 넣고 두번째에 있는 카카오를 삭제해보자.

![](/images/posts/react-key-memo-rerender/idx-delete.png)

`shuffle`을 클릭해보자

![](/images/posts/react-key-memo-rerender/idx-shuffle.png)

그러면 라벨과 Input의 데이터가 꼬인 것을 볼 수 있다.

왜그럴까?

확인해보고자 Item 컴포넌트에 `memo`를 사용해봤다. `memo`를 사용하면 리-렌더링을 하기전에 이전 props와 다음 props를 확인해볼 수 있다.

![](/images/posts/react-key-memo-rerender/console-memo.png)

위 사진을 보면 `라인`만이 리-렌더링이 된 것을 볼 수 있다.

idx: 0(카카오) → idx: 0(카카오) prop이 같으니 리-렌더링 패스

idx: 1(네이버) → idx: 1(라인) 어 얘는 prop이 바뀌었네? 리렌더링하자!

prop이 바뀌고 나서 prop에서 꺼내온 값들(라인)은 잘 바뀌었는데

input에 있는 데이터는 안바뀌었다. **왜냐 State는 리-렌더링이 되어도 바뀌지 않기 때문**이다.

이런 이유로 key에 index를 사용하고나서, 중간에 아이템을 삭제하거나, 리-오더를 해버리면 이슈가 생긴다.

## 번외: key에 Math.random()을 넣으면…?

그래도 key에 index를 사용하고 `memo`를 사용하면 `Todo`를 추가 할 때 이미 생성된 `Todo`의 리-렌더링이 발생하지 않는다.

그런데 `key`에 `Math.random()`을 사용하면? 이미 추가된 `Todo`도 리-렌더링이 된다.(OMG)
또 신기했던게 `memo`를 사용해서 이전, 다음 `props`를 확인해보려했으나 아예 콜백이 수행되지도 않았다. 그렇다면 memo에 도달하기 전에 `key` 값으로 검사하는 것 같다!

- 리-렌더링 시 `key`가 같음 → `memo` 사용했으면 props 비교해보고 리-렌더링 결정해줄게~
- 리-렌더링 시 `key`가 다름 → `memo`고 뭐고 너는 바로 리-렌더링이야

## 요약

- `key`는 유니크한 값으로 넣자!
- `key`가 다르면 아예 `memo` 최적화도 못해요!
-
