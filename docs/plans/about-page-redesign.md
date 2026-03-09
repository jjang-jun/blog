# `/about` 페이지 전면 수정 설계서

- **작성자**: @pm
- **작성일**: 2026-03-09
- **상태**: 완료
- **선행 설계서**: `docs/plans/about-page-improvement.md` (이전 타임라인 개선 — 이번 설계로 대체됨)

---

## 1. 배경

사용자가 `about.md` 스펙을 제공하여 About 페이지의 방향이 근본적으로 변경되었다.
기존 설계서(`about-page-improvement.md`)는 타임라인 UI 강화에 초점을 두었으나,
새 스펙은 **타임라인 제거, Skills 제거, 텍스트 기반 3개 섹션 구성**으로 완전히 다른 방향이다.

---

## 2. 현재 상태 vs 새 스펙 비교

| 항목 | 현재 구현 | 새 스펙 (`about.md`) |
|---|---|---|
| **프로필 이름** | `jjangjun` (닉네임) | `장준혁 (Jang Junhyeok)` (실명) |
| **소갯말** | "프론트엔드 개발자 \| 더 나은 사용자 경험을 고민합니다" | "이해한 것만 만듭니다. 그래서 가끔 너무 오래 걸립니다." |
| **프로필 아이콘** | 이모지 `👨‍💻` (sky-100 배경 원) | 없음 (제거 또는 단순화) |
| **소셜 링크** | GitHub만 (Footer/Info에 존재, About 페이지에는 없음) | GitHub, Bluesky, LinkedIn |
| **메인 콘텐츠** | 타임라인 (이력 3개 항목, 카드형 UI, 스크롤 애니메이션) | 텍스트 섹션 3개: "지금" / "이 블로그에 대해" / "일상" |
| **타임라인** | 있음 (핵심 UI) | **없음** |
| **Skills/기술 스택** | 태그 뱃지 (timestamps.json의 tags) | **없음** |
| **컬러 테마** | 다중 카테고리 색상 (sky, green, purple, amber) | 흰색 배경 + 블루 단일 계열 (#3b82f6, #bfdbfe, #eff6ff) |
| **애니메이션** | motion 기반 스크롤 fade-in | 불필요 (단순 텍스트 레이아웃) |

---

## 3. 요구사항 체크리스트

### P0 (긴급 - 핵심 변경)

- [ ] `about/page.tsx` 전면 재작성: 프로필 + 3개 텍스트 섹션 구조
- [ ] 프로필 영역: 이름 `장준혁 (Jang Junhyeok)` + 소갯말 표시
- [ ] 소셜 링크 3개 추가: GitHub, Bluesky, LinkedIn (아이콘 + 링크)
- [ ] 섹션 3개 구현: "지금" / "이 블로그에 대해" / "일상"
- [ ] 각 섹션의 본문 텍스트를 `about.md` 내용 그대로 반영
- [ ] 타임라인 UI 완전 제거 (`<TimeStamp />` 컴포넌트 사용 제거)

### P1 (높음 - 디자인/데이터)

- [ ] 블루 계열 컬러 적용: `#3b82f6` (blue-500), `#bfdbfe` (blue-200), `#eff6ff` (blue-50)
- [ ] 흰색 배경 기반 깔끔한 레이아웃
- [ ] `data/metadata.json`에 Bluesky, LinkedIn 링크 추가
- [ ] About 페이지 메타데이터(title, description) 갱신
- [ ] 반응형 대응 (모바일/데스크탑)

### P2 (보통 - 정리)

- [ ] 불필요 파일 삭제: `src/components/TimeStamp.tsx`
- [ ] 불필요 파일 삭제: `src/components/TimelineItem.tsx`
- [ ] 불필요 파일 삭제: `src/lib/about.ts`
- [ ] 불필요 파일 삭제: `data/about/timestamps.json`
- [ ] `data/about/` 디렉토리 삭제 (비어있을 경우)
- [ ] `motion` 패키지가 About 페이지에서만 사용되는지 확인 후, 다른 곳에서 미사용 시 제거 검토

### P3 (낮음 - 추후 개선)

- [ ] 다크 모드 대응 (블루 계열 다크 변환)
- [ ] 섹션 간 부드러운 스크롤 전환
- [ ] 프로필 이미지 추가 (사용자 요청 시)

---

## 4. 삭제 대상 파일 목록

| 파일 | 사유 |
|---|---|
| `src/components/TimeStamp.tsx` | 타임라인 UI 컴포넌트 — 스펙에서 타임라인 제거 |
| `src/components/TimelineItem.tsx` | 타임라인 애니메이션 래퍼 — 타임라인 제거로 불필요 |
| `src/lib/about.ts` | timestamps.json 읽기 유틸리티 + 타입 정의 — 더 이상 사용하지 않음 |
| `data/about/timestamps.json` | 이력 데이터 — 타임라인 제거로 불필요 |

> **주의**: `TimelineItem.tsx`는 `motion` 패키지를 사용한다. 삭제 전 프로젝트 내 `motion` 사용처를 확인하여 패키지 제거 여부를 판단해야 한다.

---

## 5. 새로운 UI 구조 설계

### 5.1 페이지 레이아웃

```
┌─────────────────────────────────────┐
│           프로필 영역                │
│                                     │
│     장준혁 (Jang Junhyeok)          │
│     "이해한 것만 만듭니다.            │
│      그래서 가끔 너무 오래 걸립니다."  │
│                                     │
│     [GitHub] [Bluesky] [LinkedIn]   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ── 지금 ──                          │
│                                     │
│  삼성 청년 SW 아카데미(SSAFY)를       │
│  수료하고 금융권에 입사해 ...          │
│                                     │
│  요즘은 AI 에이전트에 빠져있습니다...  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ── 이 블로그에 대해 ──               │
│                                     │
│  실무에서 마주친 문제와 ...            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ── 일상 ──                          │
│                                     │
│  래그돌 고양이와 함께 삽니다...        │
│                                     │
└─────────────────────────────────────┘
```

### 5.2 컬러 시스템

| 용도 | 색상 코드 | Tailwind 클래스 |
|---|---|---|
| 섹션 제목/강조 텍스트 | `#3b82f6` | `text-blue-500` |
| 소셜 링크 호버/배경 | `#bfdbfe` | `bg-blue-200` |
| 섹션 배경 (선택적) | `#eff6ff` | `bg-blue-50` |
| 본문 텍스트 | 기존 gray 계열 유지 | `text-gray-700` / `text-gray-900` |
| 페이지 배경 | 흰색 | `bg-white` |

### 5.3 컴포넌트 구조

기존 About 페이지는 Server Component + async 데이터 로딩 구조였으나,
새 스펙은 **정적 텍스트 콘텐츠**이므로 단순 Server Component로 충분하다.

```
src/app/about/page.tsx    ← 전면 재작성 (단일 파일로 완결)
```

- 별도 컴포넌트 분리 불필요: 섹션 3개는 정적 텍스트이므로 `page.tsx` 내에서 직접 렌더링
- 데이터 파일 불필요: JSON에서 읽어올 동적 데이터가 없음
- 소셜 링크 URL은 `data/metadata.json`에서 관리 (기존 패턴 유지)

### 5.4 소셜 링크 아이콘

`react-icons` 패키지가 이미 설치되어 있으므로 활용:

| 서비스 | 아이콘 | import |
|---|---|---|
| GitHub | `AiFillGithub` | `react-icons/ai` (기존 사용 중) |
| LinkedIn | `AiFillLinkedin` | `react-icons/ai` (기존 사용 중) |
| Bluesky | `SiBluesky` | `react-icons/si` (Simple Icons) |

> Bluesky 아이콘이 `react-icons@4.10.1`에 없을 수 있다. 없으면 SVG 직접 구현 또는 패키지 업데이트 필요. FE에서 확인할 것.

---

## 6. 데이터 변경

### `data/metadata.json` 수정안

```json
{
  "author": "jjangjun",
  "title": "어렴풋, 모호한 것 보다는 상세하고 명확하게",
  "links": [
    {
      "name": "github",
      "url": "https://github.com/95rolancia"
    },
    {
      "name": "bluesky",
      "url": "https://bsky.app/profile/[사용자에게 확인 필요]"
    },
    {
      "name": "linkedin",
      "url": "https://linkedin.com/in/[사용자에게 확인 필요]"
    }
  ]
}
```

> **TODO**: Bluesky, LinkedIn 프로필 URL을 사용자에게 확인받아야 한다.

---

## 7. 메타데이터 변경

### 현재

```typescript
title: 'About | jjangjun',
description: 'jjangjun의 소개 페이지입니다. 이력, 프로젝트, 기술 스택을 확인할 수 있습니다.',
```

### 변경안

```typescript
title: 'About | jjangjun',
description: '장준혁의 소개 페이지입니다. 지금 하고 있는 일, 블로그에 대해, 그리고 일상.',
```

---

## 8. 작업 분배

### @fe (프론트엔드)

- [ ] **P0** `src/app/about/page.tsx` 전면 재작성
  - 프로필 영역: 이름 + 소갯말 + 소셜 링크 3개
  - 섹션 3개: "지금" / "이 블로그에 대해" / "일상"
  - 블루 계열 컬러 시스템 적용
  - 반응형 레이아웃 (모바일/데스크탑)
- [ ] **P1** Bluesky 아이콘 확인: `react-icons@4.10.1`에서 `SiBluesky` 존재 여부 확인
  - 없으면 SVG 직접 구현 또는 패키지 업그레이드
- [ ] **P2** 불필요 파일 삭제
  - `src/components/TimeStamp.tsx`
  - `src/components/TimelineItem.tsx`
  - `src/lib/about.ts`
  - `data/about/timestamps.json` + `data/about/` 디렉토리
- [ ] **P2** `motion` 패키지 사용처 확인 → About 전용이면 제거 검토

### @be (백엔드/데이터)

- [ ] **P1** `data/metadata.json`에 Bluesky, LinkedIn URL 추가
  - 사용자에게 실제 URL 확인 필요
- [ ] **P2** `data/about/` 디렉토리 및 `timestamps.json` 삭제 확인

### @qa (품질 보증)

- [ ] **P0** 새 About 페이지 콘텐츠 검증: `about.md` 내용과 정확히 일치하는지 확인
- [ ] **P1** 반응형 테스트: 375px (모바일), 768px (태블릿), 1024px+ (데스크탑)
- [ ] **P1** 소셜 링크 동작 확인: 3개 링크 모두 새 탭에서 올바른 페이지 열림
- [ ] **P1** 메타데이터 확인: title, description, OpenGraph
- [ ] **P2** 접근성 검증: 링크 aria-label, 색상 대비, 키보드 내비게이션
- [ ] **P2** lint / tsc / build 통과 확인
- [ ] **P2** 삭제된 파일의 import가 다른 곳에 남아있지 않은지 확인

---

## 9. 구현 순서

1. **Phase 1** (BE): `data/metadata.json`에 소셜 링크 추가 (Bluesky, LinkedIn URL 확인 후)
2. **Phase 2** (FE): `about/page.tsx` 전면 재작성 — 프로필 + 3개 섹션 + 블루 컬러
3. **Phase 3** (FE): 불필요 파일 삭제 (TimeStamp, TimelineItem, about.ts, timestamps.json)
4. **Phase 4** (FE): motion 패키지 사용처 확인 및 정리
5. **Phase 5** (QA): 전체 테스트 + 빌드 검증

---

## 10. 사용자 확인 필요 사항

| 항목 | 설명 |
|---|---|
| Bluesky URL | Bluesky 프로필 주소 (예: `https://bsky.app/profile/...`) |
| LinkedIn URL | LinkedIn 프로필 주소 (예: `https://linkedin.com/in/...`) |
| 프로필 이미지 | 이미지 사용 여부 (현재 스펙에는 없으나 필요 시 추가 가능) |
| 이모지/아바타 | 현재 `👨‍💻` 이모지 원형 — 유지 or 제거? |

---

## 11. 리스크

| 리스크 | 영향 | 대응 |
|---|---|---|
| Bluesky 아이콘 미지원 (`react-icons@4.10.1`) | 아이콘 렌더링 불가 | SVG 직접 구현 또는 패키지 업데이트 |
| `motion` 패키지 다른 곳에서 사용 중 | 제거 불가 | 사용처 확인 후 판단 (About 전용이 아닐 수 있음) |
| 소셜 링크 URL 미확인 | 데이터 불완전 | 사용자 확인 전까지 placeholder 처리 |
