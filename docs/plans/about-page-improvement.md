# `/about` 페이지 개선 설계서

- **작성자**: @pm
- **작성일**: 2026-03-09
- **상태**: 완료 (2026-03-09)

---

## 1. 현재 상태 분석

### 파일 구조

| 파일 | 역할 |
|---|---|
| `src/app/about/page.tsx` | About 페이지 (Server Component, 단순히 제목 + TimeStamp 렌더링) |
| `src/components/TimeStamp.tsx` | 타임라인 UI 컴포넌트 (Server Component, async) |
| `src/lib/about.ts` | JSON 파일 읽기 유틸리티 + `TimeStamp` 타입 정의 |
| `data/about/timestamps.json` | 이력 데이터 (3개 항목) |

### 문제점

1. **데이터 빈약**: 이력 항목 3개, 카테고리 구분 없음
2. **UI 단조로움**: CSS `border-left` + `before` 의사요소 세로선, 아이콘/색상/애니메이션 없음
3. **타입 제한적**: `detail.link` 필드 존재하나 렌더링 미구현
4. **메타데이터 없음**: About 페이지 SEO 미흡
5. **반응형 미흡**: 날짜 115px 고정폭, 모바일에서 답답
6. **스크롤 인터랙션 없음**: 정적 렌더링만 존재
7. **카테고리/섹션 구분 없음**: 경력/교육/프로젝트 시간순 혼재

---

## 2. 요구사항 체크리스트

### P0 (긴급 - 핵심 기능)

- [ ] 데이터 구조 확장: category, icon, tags 등 필드 추가
- [ ] 타임라인 UI 전면 개편: 한 눈에 이력 파악 가능
- [ ] detail.link 실제 렌더링 (포트폴리오 연결)

### P1 (높음 - 사용자 경험)

- [ ] 스크롤 기반 등장 애니메이션 (순차 fade-in + slide-up)
- [ ] 카테고리별 아이콘/색상 구분
- [ ] Mobile First 반응형 (모바일 1열, 데스크탑 좌우 교차)
- [ ] About 페이지 메타데이터 추가

### P2 (보통 - 품질 향상)

- [ ] 페이지 상단 자기소개 섹션 (프로필 이미지 + 한 줄 소개)
- [ ] 기술 스택 뱃지/태그 표시
- [ ] 타임라인 항목 호버 시 상세 확장

### P3 (낮음 - 추후 개선)

- [ ] 다크/라이트 모드 대응
- [ ] 카테고리별 필터링
- [ ] 인쇄용 레이아웃

---

## 3. 라이브러리 선정

### 후보 비교

| 라이브러리 | Stars | 최근 커밋 | 번들 크기 | 판정 |
|---|---|---|---|---|
| react-vertical-timeline-component | 1.2k | 2026.02 | ~7kB | 커스터마이징 한계 |
| react-chrono | ~4k | 활발 | ~63.8kB | 번들 과대 |
| **motion (framer-motion)** | **30.7k** | **활발** | **~15kB** (LazyMotion) | **채택** |

### 선정: motion + Tailwind CSS 직접 구현

- motion: 스크롤 애니메이션 전용 (LazyMotion + domAnimation = ~15kB)
- 타임라인 레이아웃: Tailwind CSS 직접 구현 (프로젝트 일관성)
- react-icons: 이미 설치됨, 아이콘 추가 비용 없음

---

## 4. 데이터 구조 변경안

### 현재 (`data/about/timestamps.json`)

```json
{
  "date": "2022.01 ~",
  "activity": "케이뱅크 채널계 업무",
  "detail": [{ "title": "...", "link?": "..." }]
}
```

### 변경안

```json
{
  "date": "2022.01 ~",
  "activity": "케이뱅크 채널계 업무",
  "category": "career",
  "icon": "MdWork",
  "tags": ["React", "TypeScript", "Java"],
  "detail": [
    {
      "title": "휴대폰 본인확인 화면 개발 및 운영",
      "description": "간략한 설명 (선택)",
      "link": "https://..."
    }
  ]
}
```

### 타입 변경안 (`src/lib/about.ts`)

```typescript
export type TimeStampCategory = 'career' | 'education' | 'project' | 'activity'

export type TimeStampDetail = {
  title: string
  description?: string
  link?: string
}

export type TimeStamp = {
  date: string
  activity: string
  category: TimeStampCategory
  icon: string
  tags?: string[]
  detail: TimeStampDetail[]
}
```

---

## 5. 카테고리별 색상/아이콘 매핑

| 카테고리 | 색상 | 아이콘 |
|---|---|---|
| career | `sky-500` | `MdWork` |
| education | `green-500` | `MdSchool` |
| project | `purple-500` | `MdCode` |
| activity | `amber-500` | `MdStar` |

---

## 6. 변경 파일 목록

| 파일 | 작업 | 담당 |
|---|---|---|
| `package.json` | `motion` 패키지 추가 | FE |
| `data/about/timestamps.json` | 데이터 구조 확장 + 콘텐츠 보강 | BE |
| `src/lib/about.ts` | 타입 정의 확장 | BE |
| `src/app/about/page.tsx` | 메타데이터, 프로필 섹션, 레이아웃 변경 | FE |
| `src/components/TimeStamp.tsx` | 타임라인 UI 전면 개편 | FE |
| `src/components/TimelineItem.tsx` | **신규** - 스크롤 애니메이션 (Client Component) | FE |

---

## 7. 작업 분배

### @be (백엔드/데이터)

- [ ] `src/lib/about.ts` 타입 확장
- [ ] `data/about/timestamps.json` 스키마 변경 및 데이터 마이그레이션
- [ ] 카테고리별 색상/아이콘 매핑 상수 정의

### @fe (프론트엔드)

- [ ] `motion` 패키지 설치
- [ ] `TimeStamp.tsx` 리팩토링: 카테고리 색상/아이콘, tags 뱃지
- [ ] `TimelineItem.tsx` 신규: 스크롤 등장 애니메이션
- [ ] `detail.link` 렌더링
- [ ] Mobile First 반응형 (모바일 1열 → `md`/`lg` PC 대응)
- [ ] `about/page.tsx` 메타데이터 + 프로필 섹션

### @qa (품질 보증)

- [ ] 반응형 테스트 (375px, 768px, 1024px+)
- [ ] 스크롤 애니메이션 성능 (Lighthouse)
- [ ] 접근성 (스크린리더, 키보드, color contrast)
- [ ] 링크 동작 테스트
- [ ] lint / tsc / build 검증

---

## 8. 구현 순서

1. **Phase 1** (BE): 데이터 구조 변경 + 타입 확장 + 콘텐츠 보강
2. **Phase 2** (FE): motion 설치 + 타임라인 UI 개편 + 스크롤 애니메이션
3. **Phase 3** (FE): 프로필 섹션 + 메타데이터 + 반응형 마무리
4. **Phase 4** (QA): 전체 테스트 + 피드백 반영
