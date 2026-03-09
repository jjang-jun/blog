# jjangjun's 기술 블로그

Next.js 13 App Router 기반 개인 기술 블로그입니다. 파일 시스템 기반으로 Markdown 콘텐츠를 관리합니다.

## 기술 스택

- **프레임워크**: Next.js 13 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS + @tailwindcss/typography
- **콘텐츠**: Markdown (react-markdown + remark-gfm)
- **코드 하이라이팅**: react-syntax-highlighter (Prism)
- **패키지 매니저**: Yarn

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── layout.tsx        # 루트 레이아웃 (Header + Footer)
│   ├── page.tsx          # 홈 (프로필 + 최근 게시글)
│   ├── posts/
│   │   ├── page.tsx      # 게시글 목록 (카테고리 필터)
│   │   └── [slug]/
│   │       └── page.tsx  # 게시글 상세
│   ├── about/
│   │   └── page.tsx      # 소개 (타임스탬프)
│   └── opengraph-image.tsx
├── components/           # React 컴포넌트
│   ├── Header.tsx        # 헤더 (로고 + 네비게이션)
│   ├── Footer.tsx        # 푸터 (소셜 링크)
│   ├── Navbar.tsx        # 네비게이션 바
│   ├── Info.tsx          # 프로필 정보
│   ├── RecentPosts.tsx   # 최근 게시글 목록
│   ├── PostCard.tsx      # 게시글 카드
│   ├── PostContent.tsx   # 게시글 본문
│   ├── CategoryFilter.tsx # 카테고리 필터
│   ├── FilteredPosts.tsx # 필터된 게시글 목록
│   ├── CarouselPosts.tsx # 캐러셀 게시글
│   ├── MarkdownViewer.tsx # Markdown 렌더러
│   └── TimeStamp.tsx     # 타임스탬프 (About)
└── lib/                  # 데이터 페칭
    ├── posts.ts          # 게시글 데이터 로드
    ├── metadata.ts       # 블로그 메타데이터
    └── about.ts          # About 페이지 데이터

data/
├── metadata.json         # 블로그 전역 메타데이터
├── posts/
│   ├── posts.json        # 게시글 메타데이터 목록
│   └── *.md              # Markdown 게시글 파일
└── about/
    └── timestamps.json   # 타임스탬프 데이터
```

## 시작하기

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start

# 린트
yarn lint

# 타입 체크
npx tsc --noEmit
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 게시글 추가 방법

1. `data/posts/` 디렉토리에 `{slug}.md` 파일 생성
2. `data/posts/posts.json`에 메타데이터 추가:

```json
{
  "title": "게시글 제목",
  "date": "2024-01-01",
  "category": "카테고리명",
  "path": "slug",
  "tags": ["태그1", "태그2"],
  "readingTimeInMinutes": "5",
  "desc": "게시글 설명"
}
```

## 컨벤션

- **Prettier**: 세미콜론 없음, 싱글 쿼트, 2스페이스 들여쓰기
- **Path Alias**: `@/*` -> `./src/*`
- **커밋**: `feat:`, `fix:`, `chore:`, `post:`, `refactor:` 접두사 사용
- **컴포넌트**: PascalCase, 서버 컴포넌트 기본, 클라이언트는 `'use client'` 명시
