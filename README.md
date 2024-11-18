# Todolist

## 프로젝트 시작 방법
```bash
npm install
npm run dev
```
## env 파일
``` bash
답변 받은 뒤 업로드
```


## 기술 스택
![NextJS](https://img.shields.io/badge/Next.JS%20-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/Typescript%20-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NextJS](https://img.shields.io/badge/vercel%20-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 프로젝트 설명
### 설명
사용자의 Todo를 입력받아 진행 상태와 완료 상태를 체크하는 동시에, 이미지와 메모를 추가할 수 있는 투두리스트입니다. 
<br/> 모바일, 태블릿 및 데스크탑 환경을 지원합니다.

### 공통
- 사용된 폰트 : `NanumSquare`
- 컬러 시스템 : `Figma`에 제시된 컬러
- 공용 컴포넌트 : Button 컴포넌트
### 메인 페이지 "/"
<img width="1920" alt="スクリーンショット 0006-11-19 7 28 46" src="https://github.com/user-attachments/assets/9a12f4c9-fcf4-4a38-97de-2216d09fb2cb">

- 새로운 Todo를 추가할 수 있습니다. (Button, Enter키 모두 작동)
- 작성한 Todolist를 한 눈에 살펴볼 수 있습니다. (최대 10개; 페이지네이션X)
- 진행중인 Todo와 완료된 Todo의 상태를 구분하여 알려줍니다.
- 진행중인 Todo나 완료된 Todo가 없다면, Empty아이콘을 출력합니다.
- Todo 옆의 버튼을 누르면 Status가 전환됩니다.

### 상세 페이지 "/items/:itemId"
- 작성한 Todo를 수정할 수 있습니다.
- 메인 페이지와 동일하게 상단바에서는 상태의 변경이 가능하며, Todo의 제목 또한 수정할 수 있습니다.
<img width="1920" alt="スクリーンショット 0006-11-19 7 38 53" src="https://github.com/user-attachments/assets/970d6a7f-f4d7-4c8a-b35a-c3bd917120e5">
- 메인 페이지와는 상이하게 이미지, 메모의 추가가 가능합니다.
  - 이미지의 경우, `5MB이하, 오직 숫자와 영문으로 된 이미지만 첨부`가 가능합니다.
#### 이미지, 메모가 작성되지 않은 경우
<img width="1920" alt="スクリーンショット 0006-11-19 7 29 06" src="https://github.com/user-attachments/assets/7df81e1a-5d36-4166-9c5c-53e306df3d3c">
- 입력된 이미지, Memo가 없을 경우 이렇게 버튼의 색이 회색입니다.

#### 이미지, 메모가 작성된 경우
<img width="1920" alt="スクリーンショット 0006-11-19 6 35 41" src="https://github.com/user-attachments/assets/f02e5e1b-da9f-42f1-b7cd-fcf8074293e5">
- 입력된 이미지, 메모가 있다면 버튼의 색상이 연두색으로 변합니다.
- 이미지 업로드가 끝나기 전에는(업로드까지 약 3초 소요), 버튼의 색상이 연두색으로 변하지 않으며 눌러도 alert가 뜨게 됩니다.

#### 수정 완료, 삭제 완료 버튼을 눌렀을 경우
- 루트 페이지("/")로 즉각 리다이렉트됩니다.

### 추가 구현 요구사항
#### 반응형
- 모바일 레이아웃에서 정상 작동합니다.
- 태블릿, 데스크탑 환경에서 정상 작동합니다.

#### Readme.md 작성
- 프로젝트 설명 명시
- 사용 방법 명시

#### 코드 주석 및 문서화
- 주요 기능과 컴포넌트에 대한 주석

