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

  function makeRandomName(){
    var name = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for( var i = 0; i < 3; i++ ) {
      name += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return name;
  }
  
  function click_send()
  {
    var $msgForm = $(".message_input");
    // 서버로 메시지를 전송한다.
    let msg_content=$msgForm.val();
    socket.emit("chat", { msg: $msgForm.val() });
    $msgForm.val("");
    
    $(".messages").append("<div class='client_content content'>" + msg_content+"</div>");
    $('.messages').scrollTop($('.messages').prop('scrollHeight'));
  }
  clickSend=click_send;
});
function js_click_send(){
  clickSend();
}
