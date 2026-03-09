# About 페이지 전면 수정

- **날짜**: 2026-03-09
- **타입**: feat
- **브랜치**: feat/about-page-redesign

## 변경 사항
- About 페이지를 타임라인 기반에서 텍스트 기반 3개 섹션 구조로 전면 재작성
- 프로필 영역: 아바타 이미지 + 실명(장준혁) + 소갯말 표시
- 소셜 링크: GitHub, LinkedIn 아이콘 링크 추가
- 섹션 3개 구현: "지금" / "이 블로그에 대해" / "일상"
- 블루 계열 컬러 시스템 적용 (섹션 제목 blue-500)
- motion 기반 섹션별 fade-in 애니메이션 적용
- metadata.json에 LinkedIn URL 추가
- 불필요 파일 삭제 (TimeStamp, TimelineItem, about.ts, timestamps.json)

## 수정된 파일
- `src/app/about/page.tsx` - 전면 재작성 (프로필 + 3개 텍스트 섹션)
- `src/components/FadeIn.tsx` - 신규 생성 (fade-in 애니메이션 래퍼 컴포넌트)
- `data/metadata.json` - LinkedIn URL 추가

## 삭제된 파일
- `src/components/TimeStamp.tsx` - 타임라인 UI 컴포넌트
- `src/components/TimelineItem.tsx` - 타임라인 애니메이션 래퍼
- `src/lib/about.ts` - timestamps.json 읽기 유틸리티
- `data/about/timestamps.json` - 이력 데이터
- `data/about/` - 빈 디렉토리

## 테스트 결과
- [x] 린트 통과
- [x] 타입 체크 통과
- [x] 빌드 성공
