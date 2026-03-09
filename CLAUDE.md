# CLAUDE.md

개인 기술 블로그. Next.js 13 App Router + TypeScript + Tailwind CSS. 파일 시스템 기반 Markdown 콘텐츠.

## 명령어

```bash
yarn dev            # 개발 서버
yarn build          # 프로덕션 빌드
yarn lint           # ESLint
npx tsc --noEmit    # 타입 체크
```

## 구조

- `src/app/` — 페이지 (layout, page, posts/[slug], about, api)
- `src/components/` — 컴포넌트 (PascalCase, 서버 기본, 클라이언트는 `'use client'`)
- `src/lib/` — 데이터 페칭 (fs/promises, `path.join(process.cwd(), ...)`)
- `data/` — 콘텐츠 (posts.json + *.md, metadata.json, timestamps.json)

## 컨벤션

- **Prettier**: 세미콜론 없음, 싱글 쿼트, 2스페이스
- **TS**: strict, path alias `@/*` → `./src/*`, 타입은 lib 내 co-locate
- **스타일**: Tailwind 유틸리티, **Mobile First** 반응형 (`md`(768px), `lg`(1024px)), 액센트 `sky-600`, prose for markdown
- **이미지**: Next.js `Image` 컴포넌트, 외부 도메인 `images.unsplash.com`만 허용
- **커밋**: `feat:` `fix:` `chore:` `post:` `refactor:` `style:` `data:` `deprecated:`
- **PR**: 본문에 `Close #이슈_번호`

## 에이전트

`@pm`(Opus) → `@arch`(Sonnet) → `@fe`/`@be`(Sonnet) → `@qa`(Sonnet)
워크플로우: PM 설계 → Arch 기술설계 & QA 테스트작성 → FE/BE 개발 → QA 검증 → 실패 시 반복 → 문서화 → PR

## 참고

- `experimental.appDir: true` 사용 중
- 테스트 프레임워크 미설정
- 한국어 응답 기본
