# 인덱스(홈) 페이지 개선 + /posts 페이지 제거

- **날짜**: 2026-03-09
- **타입**: feat
- **브랜치**: feat/index-page-redesign

## 변경 사항
- 홈 페이지를 연도별 그룹핑 텍스트 리스트로 전면 재설계
- `/posts` 페이지 제거 및 `/` 로 301 리다이렉트 설정
- Navbar에서 Posts 링크 제거 (About만 유지)
- 미사용 컴포넌트 8개 일괄 삭제
- `src/lib/posts.ts`에서 불필요한 함수 제거 (`getCategories`, `getRecentPosts`)

## 수정된 파일
- `src/app/page.tsx` - 연도별 글 목록으로 전면 재작성
- `src/components/Navbar.tsx` - Posts 링크 제거
- `next.config.js` - /posts -> / 301 리다이렉트 추가
- `src/lib/posts.ts` - 미사용 함수 제거

## 삭제된 파일
- `src/components/PostCard.tsx`
- `src/components/RecentPosts.tsx`
- `src/components/Info.tsx`
- `src/components/GridPosts.tsx`
- `src/components/PostList.tsx`
- `src/components/CategoryFilter.tsx`
- `src/components/FilteredPosts.tsx`
- `src/components/PostsCategoryFilter.tsx`
- `src/app/posts/page.tsx`

## 테스트 결과
- [x] 린트 통과
- [x] 타입 체크 통과
- [x] 빌드 성공
