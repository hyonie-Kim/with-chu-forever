# Wedding Invitation - React + TypeScript + Vite

웨딩 청첩장 프로젝트입니다.

## 🚀 실행 방법

### 1. 의존성 설치
```bash
yarn install
```

### 2. 개발 서버 실행

#### 프론트엔드만 실행 (배포된 API 사용)
```bash
yarn dev
```
- **URL**: http://localhost:5173

#### 프론트엔드 + 백엔드 동시 실행 (로컬 개발)
```bash
# 터미널 1: 프론트엔드
yarn dev

# 터미널 2: 백엔드 (JSON Server)
yarn dev:db
```
- **프론트엔드**: http://localhost:5173
- **백엔드**: http://localhost:8888

### 3. 빌드
```bash
# 프로덕션 빌드
yarn build

# 빌드 결과 미리보기
yarn preview
```

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: SCSS Modules
- **UI Components**: Swiper, React Day Picker
- **Backend**: JSON Server (Mock API)
- **Deployment**: Vercel (Frontend), Render (Backend)

## 📁 주요 기능

- 📸 이미지 갤러리 (Swiper)
- 📅 웨딩 날짜 표시
- 🗺️ 카카오맵 연동
- 📱 반응형 디자인
- ✨ 애니메이션 효과

## 🔧 환경 설정

### 개발 환경
- Node.js 18+
- Yarn 4.6.0

### 환경 변수
```bash
# .env 파일 생성
VITE_KAKAO_APP_KEY=your_kakao_app_key
```

## 📦 배포

- **Frontend**: Vercel
- **Backend**: Render (JSON Server)
- **API**: https://with-chu-forever-1.onrender.com/wedding