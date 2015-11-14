$(document).ready(function(){
  var $area;
  var $text;
  var $refresh;

  var currentUserId;
  var chatRoomId;

  $area = $("#area-chat");
  $text = $("#text-chat");
  $messages = $(".messages");
  $refresh = $("#refresh");

  currentUserId = $("#current-user").data("id");

  chatRoomId = $("#current-channel").data("id");

  function createWell(content, username, id, avatar_url) {
    var $boldUsername;
    var $chatRow;
    var $messages;
    var $avatar;
    var $message;

    $boldUsername = $("<b/>").html(username + " ");
    $chatRow = $("<div/>").addClass("chat-row");
    $avatar = $("<img/>").attr("src", avatar_url);
    $messages = $("<div/>").addClass("messages").attr("data-id", id);
    $message = $("<div/>").addClass("message");

    $avatar.appendTo($messages);
    $boldUsername.appendTo($messages);
    $message.append(content).appendTo($messages);
    $messages.appendTo($chatRow);


    return $chatRow;
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
            $well = createWell(message.content, message.username, message.id, message.avatar_url);
            $well.appendTo($area);
            $.playSound('http://soundbible.com/mp3/Pop Cork-SoundBible.com-151671390');
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

        $well = createWell(data.content, data.username, data.id, data.avatar_url);
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

  $text.keyup(function(event){
    var content;

    if(event.keyCode == 13){
      content = $text.val();
      if(content.trim() != "") {
        sendMessage(content, chatRoomId, currentUserId);
        clearText();
      }
    }
  });

  window.setInterval(function(){
    refresh();
  }, 500);

  scrollDown();
});
