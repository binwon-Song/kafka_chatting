$(document).ready(function(){
  // socket.io 서버에 접속한다
  var socket = io();
  const chat_form=$(".messages");
  // 서버로 자신의 정보를 전송한다.
  socket.emit("login", {
    // name: "ungmo2",
    name: localStorage.getItem('userName'),
    userid: localStorage.getItem('userID')
  });
  
  // 서버로부터의 메시지가 수신되면
  socket.on("login", function(data) {
    $(".messages").append("<div><strong>" + data + "</strong> has joined</div>");
  });

  // 서버로부터의 메시지가 수신되면
  socket.on("chat", function(data) {
    console.log(data.msg);
    console.log(data.from.name);
    $(".messages").append("<div class='server_content content'>" + data.msg + " : from &nbsp;<strong>" + data.from.name + "</strong></div>");
    
  });

  // Send 버튼이 클릭되면
  $(".send_message").click(function(e) {
    e.preventDefault();
    click_send();
  });
  
  function click_send() {
    var $msgForm = $(".message_input");
    let msg_content = $msgForm.val();

    $.ajax({
        url: "/chat/send",
        type: "POST",
        data: JSON.stringify({ msg: msg_content }),
        contentType: "application/json",
        success: (result) => {
            if (result.success) {
                alert("Message sent successfully");
            } else {
                alert("Failed to send message. Please try again later.");
            }
        }
        // error: (error) => {
        //     console.error("Error sending message:", error);
        //     alert("Failed to send message. Please try again later.");
        // }
    });

    $msgForm.val("");
    $(".messages").append("<div class='client_content content'>" + msg_content + "</div>");
    $('.messages').scrollTop($('.messages').prop('scrollHeight'));
  }
  clickSend=click_send;
});

function js_click_send(){
  clickSend();
}
