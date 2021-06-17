# React-Firebase-SNS

Google Firebase 서비스를 이용하여 Server-Side를 구축하고, React를 활용하여 웹 사이트를 만들며 진행중인 프로젝트입니다. 유명 소셜 미디어 서비스인 [Twitter](https://twitter.com/?lang=ko)에서 지원하는 기능을 최대한 많이, 비슷하게 구현하는 동시에 최적화된 성능을 가지는 것을 목표로 두고 있습니다. 아래 웹 URL을 통해 웹 사이트에 접속하여 회원 가입을 하시면 현재 개발된 기능들을 체험할 수 있습니다.

프로젝트 시작일: 2021년도 4월 12일

## 1. 웹 URL

> 홈페이지 링크: [Kwitter](https://sudo-terry.github.io/Deploy-Kwitter/) (현재 개발을 위해 비활성화)

## 2. 사용된 기술/프레임워크

    -React
    -Google Firebase
    -React-Redux
    -styled-components

## 3. 프로젝트 소개

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

## 4. 설치

    yarn add
    
## 5. 로그

## 6. 확인된 버그

    -다른 유저 프로필 화면에서 좌측 메뉴의 버튼으로 내 프로필로 이동할 경우, url은 정상적으로 변경되나 화면은 그대로인 버그 확인
    -
    
## 7. 참고
이 프로젝트는 Nomad Coder님의 강의인 '트위터 클론코딩'을 기반으로 뼈대를 잡고 살을 붙여 개발한 프로젝트입니다.<br/>
[강의 URL]: https://nomadcoders.co/nwitter/lobby
