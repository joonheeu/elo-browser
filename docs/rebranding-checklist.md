# Flow → Elo Browser 리브랜딩 체크리스트

이 문서는 Flow Browser에서 Elo Browser로의 완전한 리브랜딩 작업을 추적하기 위한 체크리스트입니다.

## 📊 **진행 상황 요약**

- **완료된 작업**: 30개 파일, 2,642개 추가, 2,346개 삭제
- **마지막 업데이트**: 2024년 (v0.0.2 릴리즈)
- **전체 진행률**: 약 60% 완료

---

## ✅ **완료된 작업들**

### 🎯 **1단계: 사용자 대면 요소** (완료)

- [x] **앱 메타데이터**
  - [x] `package.json` - 제품명, 패키지명 변경
  - [x] `electron-builder.json` - AppID, 제품명, 실행파일명 변경
- [x] **사용자 인터페이스**
  - [x] 온보딩 화면 (welcome, new-tab, finish, icon)
  - [x] 설정 페이지 (브라우저 정보, 기본 브라우저, 업데이트)
  - [x] 확장 관리 페이지
  - [x] 게임 페이지
  - [x] About 페이지 (URL 목록)
  - [x] 창 제목 변경
- [x] **문서 파일**
  - [x] `README.md` - 프로젝트 설명, 로고 alt 텍스트
  - [x] `CONTRIBUTING.md` - 기여 가이드 제목, 클론 URL
  - [x] `docs/api/extensions/index.md`
  - [x] `docs/contributing/hot-reloading.md`
  - [x] `docs/api/tabs/tab.md`
  - [x] `docs/components/portal.md`
  - [x] `docs/references/logs.md` - 로그 경로 변경

---

## 🔄 **진행 중인 작업들**

### 🟡 **2단계: 내부 코드 구조**

#### **API 인터페이스 이름 변경**

- [ ] **FlowAPI 인터페이스들** → **EloAPI**로 변경
  - [ ] `FlowAppAPI` → `EloAppAPI`
  - [ ] `FlowBrowserAPI` → `EloBrowserAPI`
  - [ ] `FlowTabsAPI` → `EloTabsAPI`
  - [ ] `FlowPageAPI` → `EloPageAPI`
  - [ ] `FlowNavigationAPI` → `EloNavigationAPI`
  - [ ] `FlowInterfaceAPI` → `EloInterfaceAPI`
  - [ ] `FlowOmniboxAPI` → `EloOmniboxAPI`
  - [ ] `FlowNewTabAPI` → `EloNewTabAPI`
  - [ ] `FlowProfilesAPI` → `EloProfilesAPI`
  - [ ] `FlowSpacesAPI` → `EloSpacesAPI`
  - [ ] `FlowSettingsAPI` → `EloSettingsAPI`
  - [ ] `FlowIconsAPI` → `EloIconsAPI`
  - [ ] `FlowOpenExternalAPI` → `EloOpenExternalAPI`
  - [ ] `FlowOnboardingAPI` → `EloOnboardingAPI`
  - [ ] `FlowWindowsAPI` → `EloWindowsAPI`
  - [ ] `FlowExtensionsAPI` → `EloExtensionsAPI`
  - [ ] `FlowUpdatesAPI` → `EloUpdatesAPI`
  - [ ] `FlowActionsAPI` → `EloActionsAPI`
  - [ ] `FlowShortcutsAPI` → `EloShortcutsAPI`

#### **폴더 구조 변경**

- [ ] **`src/shared/flow/`** → **`src/shared/elo/`**로 이름 변경
  - [ ] 폴더 이름 변경
  - [ ] 모든 import 경로 업데이트 (`~/flow/` → `~/elo/`)

#### **함수명 변경**

- [ ] **Flow 관련 함수명들**
  - [ ] `registerFlowProtocol` → `registerEloProtocol`
  - [ ] `registerFlowExternalProtocol` → `registerEloExternalProtocol`
  - [ ] `registerFlowInternalProtocol` → `registerEloInternalProtocol`
  - [ ] `setupCorsBypassForFlowProtocols` → `setupCorsBypassForEloProtocols`

#### **변수명 변경**

- [ ] **Flow 관련 변수명들**
  - [ ] `isFlowProtocol` → `isEloProtocol`
  - [ ] `isFlowInternalProtocol` → `isEloInternalProtocol`

---

## 📝 **수정해야 할 파일들**

### **우선순위 1: README 링크 수정**

- [x] **`README.md`**
  - [x] FlowSetup.exe 다운로드 링크 → EloSetup.exe로 수정
  - [x] `flow://games` 링크 설명 업데이트
  - [x] GitHub 저장소 링크 모두 수정 (MultiboxLabs → joonheeu)
  - [x] Badge 링크 업데이트 (DeepWiki, CodeRabbit, Star History)

### **우선순위 2: 핵심 API 파일들**

- [ ] **`src/shared/flow/flow.ts`** - 메인 API 타입 정의
- [ ] **`src/preload/index.ts`** - 모든 FlowAPI 사용 부분
- [ ] **API 인터페이스 파일들** (21개 파일)
  - [ ] `src/shared/flow/interfaces/app/` (6개 파일)
  - [ ] `src/shared/flow/interfaces/browser/` (7개 파일)
  - [ ] `src/shared/flow/interfaces/sessions/` (2개 파일)
  - [ ] `src/shared/flow/interfaces/settings/` (4개 파일)

### **우선순위 3: 프로토콜 관련 파일들**

- [ ] **`src/main/browser/utility/protocols/`**
  - [ ] `index.ts` - 프로토콜 등록 함수들
  - [ ] `_protocols/flow.ts` - Flow 프로토콜 구현
  - [ ] `_protocols/flow-external.ts` - Flow External 프로토콜
  - [ ] `_protocols/flow-internal.ts` - Flow Internal 프로토콜
- [ ] **`src/main/browser/utility/intercept-rules.ts`**

---

## 🟢 **3단계: 장기적 고려사항** (선택사항)

### **프로토콜 마이그레이션**

- [ ] **프로토콜 스킴 변경 고려** (`flow://` → `elo://`)
  - [ ] 기존 사용자 호환성 검토
  - [ ] 북마크 마이그레이션 계획
  - [ ] 확장 프로그램 호환성 검토
  - [ ] 점진적 마이그레이션 전략 수립

### **추가 정리**

- [ ] **주석 및 문서 내 Flow 언급**
  - [ ] 코드 주석에서 Flow 언급 부분
  - [ ] API 문서 업데이트
  - [ ] 개발자 가이드 업데이트

---

## 🛠 **작업 지침**

### **변경 시 주의사항**

1. **호환성 유지**: 기존 사용자의 데이터와 설정 보존
2. **단계적 접근**: 한 번에 너무 많은 변경 금지
3. **테스트**: 각 단계마다 빌드 및 기능 테스트
4. **백업**: 중요한 변경 전 브랜치 생성

### **테스트 체크리스트**

- [ ] 로컬 빌드 성공 (`bun run build:mac`)
- [ ] 앱 실행 및 기본 기능 테스트
- [ ] 확장 기능 테스트
- [ ] 설정 저장/로드 테스트
- [ ] 자동 업데이트 기능 테스트

### **커밋 가이드라인**

- **형식**: `refactor(rebrand): [작업 내용]`
- **예시**: `refactor(rebrand): rename FlowAPI interfaces to EloAPI`

---

## 📈 **진행률 추적**

### **단계별 완료율**

- **1단계 (사용자 대면)**: ✅ 100% 완료
- **2단계 (내부 구조)**: 🔄 0% 진행 중
- **3단계 (장기 계획)**: ⏳ 계획 단계

### **파일별 진행률**

- **문서 파일**: 8/8 완료 (100%)
- **UI 컴포넌트**: 15/15 완료 (100%)
- **API 인터페이스**: 0/21 진행 중 (0%)
- **프로토콜 파일**: 0/4 진행 중 (0%)

---

## 📅 **작업 로그**

### **2024년 - 초기 리브랜딩**

- **완료**: 사용자 대면 요소 전체 변경
- **릴리즈**: v0.0.2 태그로 GitHub 릴리즈 생성
- **변경**: 30개 파일, 총 4,988줄 수정

### **다음 작업**

- [ ] API 인터페이스 이름 변경 시작
- [ ] 폴더 구조 리팩토링
- [ ] README 다운로드 링크 수정

---

*최종 업데이트: 2024년*
*작성자: AI Assistant*
*상태: 진행 중 (60% 완료)*
