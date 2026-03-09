# 인덱스(홈) 페이지 개선 설계서

## 1. 현재 상태 분석

### 홈 페이지 (`/`, `src/app/page.tsx`)
- `<Info />`: 아바타 이미지 + 작성자명 + SNS 링크 + 블로그 제목
- `<RecentPosts />`: 최근 10개 글을 카드 그리드(썸네일 포함)로 표시
- 사용 컴포넌트: `Info` -> `RecentPosts` -> `GridPosts` -> `PostCard`

### Posts 페이지 (`/posts`, `src/app/posts/page.tsx`)
- 카테고리 필터(All, 회고, React, Vue...) + 카드 그리드 목록
- 사용 컴포넌트: `PostsCategoryFilter` -> `PostList` -> `PostCard`

### Navbar (`src/components/Navbar.tsx`)
- 링크: `About` (`/about`), `Posts` (`/posts`)

---

## 2. blogList.md 스펙과 현재 구현 비교

| 항목 | blogList.md 스펙 | 현재 홈 | 현재 Posts |
|------|-----------------|---------|-----------|
| 상단 소개 | 없음 | Info 컴포넌트 (아바타+이름) | 없음 |
| 글 표시 형태 | 텍스트 리스트 (날짜+제목+설명) | 카드 그리드 (썸네일 포함) | 카드 그리드 (썸네일 포함) |
| 연도별 그룹핑 | sticky 연도 레이블 + 가로선 | 없음 | 없음 |
| 카테고리 필터 | 명시적 제외 | 없음 | 있음 |
| 썸네일 | 명시적 제외 | 있음 | 있음 |
| 표시 글 수 | 전체 | 최근 10개 | 전체 |

**결론**: 현재 구현은 스펙과 완전히 다른 형태. 홈 페이지를 전면 재설계해야 함.

---

## 3. `/posts` 페이지 제거 분석

### 제거 찬성 (권장)

1. **기능 중복**: 홈 페이지에 전체 글 목록이 들어가면 `/posts`와 역할이 100% 겹침
2. **사용자 혼란 감소**: "홈에서 글 목록이 보이는데 Posts 메뉴를 또 눌러야 하나?" 혼란 제거
3. **네비게이션 단순화**: `About` / `Posts` 2개 -> `About` 1개. 블로그 특성상 홈 = 글 목록이 자연스러움
4. **불필요한 코드 제거**: 카테고리 필터 관련 컴포넌트 일괄 정리 가능
5. **참고 사례**: 개인 기술 블로그에서 홈 = 글 목록은 매우 일반적인 패턴 (leerob.io, overreacted.io 등)

### 제거 시 주의사항

1. **기존 URL 리다이렉트**: `/posts`로 직접 접근하는 트래픽이 있을 수 있음 -> `/posts` -> `/` 리다이렉트 설정 필요
2. **`/posts/[slug]`는 유지**: 개별 게시글 상세 페이지는 그대로 유지
3. **SEO**: `/posts` 페이지가 검색엔진에 인덱싱되어 있다면 301 리다이렉트 필요

### PM 의견

> **`/posts` 페이지 제거에 동의합니다.** 홈에 전체 글 목록이 연도별로 그룹핑되어 표시되면, `/posts`는 완전히 중복됩니다. 다만 기존 URL 보존을 위해 리다이렉트는 반드시 설정해야 합니다.

---

## 4. 영향 범위 분석

### 제거/대폭 수정 대상 파일

| 파일 | 상태 | 이유 |
|------|------|------|
| `src/app/posts/page.tsx` | 제거 (리다이렉트로 대체) | `/posts` 페이지 제거 |
| `src/app/page.tsx` | 대폭 수정 | 새로운 글 목록 렌더링 |
| `src/components/Info.tsx` | 미사용 (제거 후보) | 홈에서 소개 섹션 제거 |
| `src/components/RecentPosts.tsx` | 미사용 (제거 후보) | 카드 그리드 대신 텍스트 리스트 |
| `src/components/GridPosts.tsx` | 미사용 (제거 후보) | 카드 그리드 제거 |
| `src/components/PostCard.tsx` | 미사용 (제거 후보) | 썸네일 카드 제거 |
| `src/components/PostsCategoryFilter.tsx` | 미사용 (제거 후보) | 카테고리 필터 제거 |
| `src/components/PostList.tsx` | 미사용 (제거 후보) | 카드 그리드 기반 목록 제거 |
| `src/components/CategoryFilter.tsx` | 미사용 (제거 후보) | 카테고리 필터 제거 |
| `src/components/FilteredPosts.tsx` | 미사용 (제거 후보) | 필터링된 카드 목록 제거 |
| `src/components/Navbar.tsx` | 수정 | `Posts` 링크 제거 |

### 유지 대상

| 파일 | 이유 |
|------|------|
| `src/app/posts/[slug]/page.tsx` | 개별 글 상세 페이지 유지 |
| `src/lib/posts.ts` | 데이터 페칭 로직 유지 (새 목록에서도 사용) |
| `data/posts/posts.json` | 콘텐츠 데이터 유지 |

### 신규 생성 대상

| 파일 | 설명 |
|------|------|
| `src/components/YearlyPostList.tsx` | 연도별 그룹핑 글 목록 (메인 컴포넌트) |
| `src/components/YearSection.tsx` | 연도 레이블 + 가로선 (sticky header) |
| `src/components/PostItem.tsx` | 글 항목 (날짜 MM.DD + 제목 + 한 줄 설명) |

---

## 5. 상세 설계

### 5.1 홈 페이지 구조

```
/ (홈)
└── YearlyPostList (서버 컴포넌트)
    ├── YearSection (2025)
    │   ├── PostItem (11.17 | Vue In-DOM 템플릿... | 설명)
    │   └── ...
    ├── YearSection (2024)
    │   ├── PostItem (02.17 | React key와 memo... | 설명)
    │   ├── PostItem (01.06 | 2023 회고 | 설명)
    │   └── ...
    └── ...
```

### 5.2 YearSection 스타일

- `position: sticky; top: 0` (Navbar 높이 고려 필요)
- 연도 텍스트 + 가로선 (`border-b` 또는 `<hr>`)
- 배경색 설정 (sticky 시 아래 콘텐츠가 비치지 않도록)
- primary 계열 컬러 사용 (about 페이지와 통일)

### 5.3 PostItem 스타일

- 날짜: `MM.DD` 포맷, 고정폭 (`w-16` 정도), `text-gray-500`
- 제목: 기본 텍스트 색상, hover 시 `text-primary-500`
- 설명: `text-gray-400`, `font-[system-ui]`, `truncate` (한 줄)
- 전체 행: `flex` 레이아웃, 클릭 시 `/posts/[slug]`로 이동

### 5.4 데이터 처리

- `getAllPosts()` 사용 (전체 글, 날짜 내림차순 정렬 - 이미 구현됨)
- 연도별 그룹핑: `posts.json`의 `date` 필드에서 연도 추출하여 `Map<string, Post[]>` 생성
- `src/lib/posts.ts`에 `getPostsGroupedByYear()` 헬퍼 함수 추가 고려

### 5.5 `/posts` 리다이렉트

- `src/app/posts/page.tsx`를 Next.js `redirect('/')` 또는 `next.config.js`의 `redirects` 설정으로 대체
- 301 (영구) 리다이렉트 권장

### 5.6 Navbar 변경

- `Posts` 링크 제거
- 남은 링크: `About` (`/about`) 만 유지
- 또는 홈 로고 클릭 = 글 목록이므로 추가 메뉴 불필요할 수 있음

---

## 6. 체크리스트 및 작업 분배

### P0 (긴급 - 핵심 기능) -- 완료

- [x] **@fe** 홈 페이지에서 `<Info />`, `<RecentPosts />` 제거
- [x] **@fe** `YearlyPostList` 컴포넌트 구현 (연도별 그룹핑 + 전체 글 표시) -- page.tsx에 인라인 구현
- [x] **@fe** `YearSection` 컴포넌트 구현 (sticky 연도 레이블 + 가로선) -- page.tsx에 인라인 구현
- [x] **@fe** `PostItem` 컴포넌트 구현 (MM.DD + 제목 + 설명) -- page.tsx에 인라인 구현
- [x] **@fe** `src/app/page.tsx` 재구성 (새 컴포넌트 연결)

### P1 (높음 - 정리 및 리다이렉트) -- 완료

- [x] **@fe** `/posts` -> `/` 리다이렉트 설정 (301)
- [x] **@fe** `Navbar.tsx`에서 `Posts` 링크 제거
- [x] **@be** `src/lib/posts.ts` 정리 (`getCategories`, `getRecentPosts` 제거)
- [x] **@fe** 반응형 레이아웃 적용 (Mobile First: 모바일에서 설명 숨김, md에서 표시)

### P2 (보통 - 코드 정리) -- 완료

- [x] **@fe** 미사용 컴포넌트 제거: `PostCard.tsx`, `GridPosts.tsx`, `RecentPosts.tsx`, `PostsCategoryFilter.tsx`, `PostList.tsx`, `CategoryFilter.tsx`, `FilteredPosts.tsx`
- [x] **@fe** `Info.tsx` 제거 (홈 페이지에서만 사용 중, about 페이지 미사용 확인됨)
- [x] **@fe** 메타데이터(title, description) 유지

### P3 (낮음 - 개선)

- [ ] **@fe** 스크롤 시 연도 전환 애니메이션 부드럽게 처리
- [x] **@qa** 전체 페이지 회귀 테스트 (홈, /posts 리다이렉트, /posts/[slug] 상세)
- [ ] **@qa** 모바일/태블릿/데스크탑 반응형 검증
- [ ] **@qa** SEO 검증 (메타데이터, 301 리다이렉트 동작)

---

## 7. 참고: primary 컬러 팔레트

```
primary-50:  #eef4fe
primary-100: #d9e6fd
primary-200: #b8d1fb
primary-300: #89b4f7
primary-400: #6a9cf5
primary-500: #4683f1  (메인 액센트)
primary-600: #2e6bdb
primary-700: #2356b8
```

연도 레이블에 `text-primary-600`, hover 시 `text-primary-500` 사용 권장.

---

## 8. 리스크

| 리스크 | 영향도 | 대응 |
|--------|--------|------|
| `/posts` URL로 유입되는 기존 트래픽 | 중 | 301 리다이렉트 반드시 설정 |
| 글 수가 많아지면 홈 로딩 느려짐 | 낮 (현재 3개) | 추후 가상 스크롤/페이지네이션 고려 |
| sticky header가 Navbar와 겹침 | 중 | Navbar 높이를 `top` 값으로 정확히 설정 |
| `Info.tsx` 제거 | 없음 | 홈에서만 사용 확인됨, 안전하게 제거 가능 |
