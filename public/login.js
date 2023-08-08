// function switchTab(event, tabName) {
//     var i, tabContent;
//     tabContent = document.getElementsByClassName("tab-content");
//     for (i = 0; i < tabContent.length; i++) {
//       tabContent[i].style.display = "none";
//     }
//     document.getElementById(tabName).style.display = "block";
//   }
  
//   document.getElementById("login").style.display = "block";
$(document).ready(function(){

    $('#login_form').on('submit', function(event) {
        event.preventDefault(); // 기본 제출 동작을 막습니다.

        const loginForm = document.getElementById('login_form');
        const userIDInput = loginForm.querySelector('input[type="email"]');
        const userNameInput = loginForm.querySelector('input[type="text"]');

        const userID = userIDInput.value;
        const userName = userNameInput.value;

        localStorage.setItem('userID', userID);
        localStorage.setItem('userName', userName);

        window.location.href = '/chat';
    });

});