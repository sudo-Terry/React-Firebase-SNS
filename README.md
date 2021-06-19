# 🙆‍♂️React-Firebase-SNS🙇‍♂️

<b>Google Firebase</b> 서비스를 이용하여 Server-Side를 구축하고, <b>React</b>를 활용하여 웹 사이트를 만들며 진행중인 프로젝트입니다. 유명 소셜 미디어 서비스인 [Twitter](https://twitter.com)에서 지원하는 기능을 최대한 많이, 비슷하게 구현하는 동시에 최적화된 성능을 가지는 것을 목표로 두고 있습니다. 아래 웹 URL을 통해 웹 사이트에 접속하여 회원 가입을 하시면 현재 개발된 기능들을 체험할 수 있습니다.

프로젝트 시작일: 2021년도 4월 12일

## 1. 웹 URL 🌏

> 홈페이지 링크: [Kwitter](https://sudo-terry.github.io/Deploy-Kwitter/) (현재 개발을 위해 비활성화)

## 2. 사용된 기술/프레임워크 ⚙

    React.js
    Google Firebase
    React-Redux
    styled-components

## 3. 프로젝트 소개 (FrontEnd) 📑

</br></br></br></br></br>
![githubSignin](https://user-images.githubusercontent.com/76080411/122159499-68530c00-cea9-11eb-841c-db8e8cc5a5d1.gif)
</br></br></br></br></br>

Kwitter 웹 사이트는 사이트 전용 계정을 생성하거나, 구글 및 깃헙 계정을 연동하여 로그인 할 수 있습니다.
구글, 깃헙 계정을 연동한 로그인은 Firebase.Auth에서 제공하는 기능을 사용합니다.


</br></br></br></br></br>
![textkweet](https://user-images.githubusercontent.com/76080411/122159997-2a0a1c80-ceaa-11eb-9aec-97125622d7da.gif)
![imageKweet](https://user-images.githubusercontent.com/76080411/122160007-2d050d00-ceaa-11eb-9399-f63ddc42314b.gif)
</br></br></br></br></br>

Kwitter의 홈 페이지에서는 타 사용자들과 소통을 할 수 있습니다.
사용자는 자신이 상대방에게 전달하고 싶은 내용을 이미지를 첨부하여 업로드 하는 것으로 상대방과 소통할 수 있습니다. 


</br></br></br></br></br>
![nav](https://user-images.githubusercontent.com/76080411/122160283-a43aa100-ceaa-11eb-8a04-f84c7d152214.gif)
</br></br></br></br></br>

화면 왼쪽의 사이드 바를 이용하여 사용자는 Kwitter에서 제공하는 다양한 기능을 사용할 수 있습니다.
홈 페이지로 이동하여 다른 사용자들과 소통하거나, 내 프로필로 이동하여 자신의 정보를 관리하는 등의 기능이 지원됩니다.

</br></br></br></br></br>
![users](https://user-images.githubusercontent.com/76080411/122160536-13b09080-ceab-11eb-9b86-84d959f86cac.gif)
</br></br></br></br></br>

게시된 글의 프로필 사진, 또는 닉네임을 클릭하여 해당 사용자의 프로필 화면으로 이동할 수 있습니다.

</br></br></br></br></br>
![displayNameChange](https://user-images.githubusercontent.com/76080411/122160648-4490c580-ceab-11eb-9823-37da53369fb1.gif)
![photosChange](https://user-images.githubusercontent.com/76080411/122183103-e1f8f300-cec5-11eb-9df3-ee20561e3d86.gif)
</br></br></br></br></br>

내 프로필 화면에서 프로필 수정 버튼을 누르는 것으로, 나의 프로필 이미지 등 다양한 정보를 수정하고 관리할 수 있습니다.

## 4 프로젝트 소개 (BackEnd)💾

서비스 구축에 있어서 필요한 데이터 저장소는 Google의 No SQL 기반의 데이터베이스인 Firebase를 사용하여 개발을 진행하였습니다.

### 4.1 Firestore Database

#### 📁kweets/kweetId
> attatchmentUrl  </br>
> createdAt </br>
> creatorId </br>
> text </br>
    
작성된 게시글 정보들을 저장하는 저장소입니다. 폴더 내 문서명은 각 게시글의 id로 이루어져 있습니다. attachmentUrl은 사용자가 사진을 첨부하여 게시글을 업로드한 경우, 사진의 Url정보가 저장됩니다. createdAt은 게시글이 저장소에 최초로 저장될 때 JavaScript의 [Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)를 통해 작성 시간 정보를 저장합니다. creatorId는 게시글을 작성한 사용자의 uid 정보를 저장하며, text는 게시글 본문의 내용을 저장합니다. 게시글을 작성할 경우 새 문서가 작성되며, 게시글을 삭제할 경우 해당 문서가 삭제되고, 내 게시글 보기, 팔로우한 사람들 게시글만 보기 등의 기능을 구현함에 있어 필터링을 통해 필요한 문서만을 불러와 화면에 표시합니다.

#### 📁users/uid
> displayName  </br>
> uid </br>
> photoURL </br>

등록된 사용자들의 정보를 저장하는 저장소입니다. 폴더 내 문서명은 각 사용자의 uid로 이루어져 있습니다. displayName은 사용자의 이름(닉네임), uid는 사용자 계정의 uid, photoURL은 사용자의 프로필 사진 url정보를 담고 있습니다. 현재 접속하고 있지 않은 계정의 프로필 사진, 닉네임 등의 정보를 불러올 경우 Firebase Authentication의 기능만으로는 한계가 있어 추가된 저장소입니다.

### 4.2 Firestore Storage

#### 📁uid/fileUrl

폴더명의 uid를 가진 사용자가 파일이 포함된 게시글을 작성한 경우, 업로드한 파일이 저장되는 저장소 입니다.

#### 📁userBackground/uid

사용자 프로필상의 배경 이미지를 저장하는 저장소입니다. 파일명은 해당 이미지를 배경이미지로 사용하고 있는 사용자의 uid와 일치합니다. 현재 접속하고 있지 않은 계정의 프로필 사진, 닉네임 등의 정보를 불러올 경우 Firebase Authentication의 기능만으로는 한계가 있어 추가된 저장소입니다.

#### 📁userImg/uid

사용자 프로필상의 프로필 이미지를 저장하는 저장소입니다. 파일명은 해당 이미지를 프로필 이미지로 사용하고 있는 사용자의 uid와 일치합니다. 현재 접속하고 있지 않은 계정의 프로필 사진, 닉네임 등의 정보를 불러올 경우 Firebase Authentication의 기능만으로는 한계가 있어 추가된 저장소입니다.

## 5. 설치 및 환경 💻

### 5.1 설치

업로드된 파일을 폴더에 넣고 코드 편집기를 열어 코드 편집기의 터미널에 아래와 같은 명령어를 입력해 주세요.

    npm install
    
또는
    
    yarn add
    
해당 명령어는 package.json파일에 적혀있는 프로젝트에 필요한 패키지들을 다운받도록 해줍니다. 그 후, 실행을 위해 다음과 같은 명령어를 입력합니다.

    npm start
    
또는
 
    yarn start     
    
### 5.2 지원 환경

|브라우저|지원 여부|
|:------:|:---:|
|![chrome_browser_logo_icon_153007](https://user-images.githubusercontent.com/76080411/122536040-1522ba00-d05f-11eb-9225-cc48f1ecab66.png)|⭕|
|![edge_browser_logo_icon_152998 (1)](https://user-images.githubusercontent.com/76080411/122536173-384d6980-d05f-11eb-9274-d12d40d553a5.png)|⭕|
|![firefox_browser_logo_icon_152991 (1)](https://user-images.githubusercontent.com/76080411/122536366-67fc7180-d05f-11eb-8317-97c532da4786.png)|⭕|
|![opera_browser_logo_icon_152972](https://user-images.githubusercontent.com/76080411/122536332-603ccd00-d05f-11eb-81c8-bc3dcf163090.png)|⭕|
|![4202108browsereedgelogo-115709_115592](https://user-images.githubusercontent.com/76080411/122536401-72b70680-d05f-11eb-869a-8ba641f8a45b.png)|❌|
|![safari_ios_browser_logo_icon_152966](https://user-images.githubusercontent.com/76080411/122536463-84001300-d05f-11eb-898d-38f654af507b.png)|❓|
|![samsung_internet_browser_logo_icon_152962](https://user-images.githubusercontent.com/76080411/122536485-895d5d80-d05f-11eb-9973-7bb1def22792.png)|❓|


## 6. 이슈 및 버그 리포트 💬

    -다른 유저 프로필 화면에서 좌측 메뉴의 버튼으로 내 프로필로 이동할 경우, url은 정상적으로 변경되나 화면은 그대로인 버그 확인
    -타 플랫폼 연동이 아닌 방법으로 신규 회원 가입 직후 displayName값이 읽히지 않아 오류가 나는 버그 확인
    
## 7. 참고 ❗
이 프로젝트는 Nomad Coder님의 강의인 '트위터 클론코딩'을 기반으로 뼈대를 잡고 살을 붙여 개발한 프로젝트입니다.<br/>
[강의 URL]: https://nomadcoders.co/nwitter/lobby
