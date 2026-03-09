# Project Context

> Orchestrator가 세션 시작/종료 시 자동 갱신. 수동 편집 금지.
> Last updated: YYYY-MM-DD

## 구현 상태

| 영역 | 상태 | 핵심 파일 |
|---|---|---|
| 프로젝트 초기 설정 | ❌ | package.json, tsconfig.json |
| Next.js App Router | ❌ | app/layout.tsx, app/page.tsx |
| 마크다운 렌더링 (remark-gfm) | ❌ | lib/markdown.ts |
| 코드 하이라이팅 (react-syntax-highlighter) | ❌ | components/CodeBlock.tsx |
| 블로그 포스트 목록 | ❌ | app/posts/page.tsx |
| 블로그 포스트 상세 | ❌ | app/posts/[slug]/page.tsx |

## 핵심 파일 위치

```
(프로젝트 초기 설정 후 업데이트)
```

## Next.js 13.4 주의사항

- `middleware.ts` 사용 (proxy.ts 아님)
- App Router 기본, 필요 시 Pages Router 혼용 가능

## 남은 작업

1. 프로젝트 초기 설정
2. 블로그 포스트 CRUD
3. 마크다운 렌더링 + GFM
4. 코드 하이라이팅
