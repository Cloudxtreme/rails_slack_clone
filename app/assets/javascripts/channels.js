$(document).ready(function(){
  var $area;
  var $text;
  var $refresh;

  var currentUserEmail;
  var currentUserId;

  var chatRoomId;

  $area = $("#area-chat");
  $text = $("#text-chat");
  $messages = $(".messages");
  $refresh = $("#refresh");


  currentUserEmail = $("#current-user").data("email");
  currentUserId = $("#current-user").data("id");

  chatRoomId = $("#current-channel").data("id");

  function createWell(content, username, id) {
    var $boldUsername;
    var $well;

    $boldUsername = $("<b/>").html(username + " ");
    $well = $("<div/>").addClass("well").attr("data-id", id);

    $boldUsername.appendTo($well);
    return $well.append(content);
  }

  function clearText() {
    $text.val('');
  }

  function clearMessageArea(){
    $area.html("");
  }

  function getMessages(chatId) {
    $.ajax({
      type: "GET",
      url: "/messages",
      data: {
        chat_room_id: chatId
      },
      success: function(messages){
        var message;
        var domMessageId;
        var auxQuery;


        for (var i=0; i < messages.length; i++) {
          message = messages[i];
          auxQuery = "[data-id='"+message.id+"']";

          if($(auxQuery).length == 0) {
            $well = createWell(message.content, message.user_email, message.id);
            $well.appendTo($area);
            scrollDown();
          }
        }
      }
    });
  }

  function sendMessage(message, chatId, userId) {
    $.ajax({
      type: "POST",
      url: "/messages",
      data: {
        content: message,
        chat_room_id: chatId,
        user_id: userId
      },
      success: function(data){
        console.log("Message posted!");

        $well = createWell(data.content, data.user_email, data.id);
        $well.appendTo($area);
        scrollDown();
      }
    });
  }

  function refresh() {
    getMessages(chatRoomId);
  }

  function scrollDown() {
    $("#area-chat").animate({
      scrollTop: $('#area-chat').get(0).scrollHeight
    }, 2000);
  }

  $("#send-chat").click(function(){
    var content;

    content = $text.val();

    sendMessage(content, chatRoomId, currentUserId);

    clearText();
  });

  window.setInterval(function(){
    refresh();
  }, 3000);

  scrollDown();
});
