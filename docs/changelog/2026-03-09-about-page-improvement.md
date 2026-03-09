# About 페이지 개선

- **날짜**: 2026-03-09
- **타입**: feat
- **브랜치**: main

## 변경 사항

- 타임라인 데이터 구조 확장 (category, icon, tags 필드 추가)
- 타임라인 UI 전면 개편 (카테고리별 색상/아이콘, 태그 뱃지, detail.link 렌더링)
- 스크롤 기반 등장 애니메이션 추가 (motion 패키지 활용)
- About 페이지 메타데이터 추가 (SEO)
- 프로필 섹션 추가 (이모지 아바타 + 한 줄 소개)
- Mobile First 반응형 레이아웃 적용

## 수정된 파일

- `src/lib/about.ts` - 타입 확장 (TimeStampCategory, TimeStampDetail) + 카테고리 색상/아이콘 매핑 상수
- `data/about/timestamps.json` - 데이터 구조 확장 (category, icon, tags, description 추가)
- `src/components/TimelineItem.tsx` - 신규 생성, Client Component, 스크롤 등장 애니메이션
- `src/components/TimeStamp.tsx` - 전면 개편, 카테고리별 아이콘/색상, 태그 뱃지, link 렌더링
- `src/app/about/page.tsx` - 메타데이터, 프로필 섹션, 레이아웃 개선
- `package.json` - motion 패키지 추가

## 테스트 결과

- [x] 린트 통과
- [x] 타입 체크 통과
- [x] 빌드 성공
