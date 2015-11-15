(function() {
  window.client = new Faye.Client('/faye');

  $(function() {
    client.subscribe('/messages', function(payload) {
      if (payload.message) {
        $('#messages').find('.media-list').prepend(payload.message);
      }
    });

    $('#new_message').submit(function() {
      $(this).find("input[type='submit']").val('Sending...').prop('disabled', true);
    });
  });

})();
