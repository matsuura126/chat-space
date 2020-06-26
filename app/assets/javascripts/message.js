$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="message-items">` +
        `<div class="message-items__top">` +
        `<p class="message-items__top__name">` +
        message.user_name +
        `</p>` +
        `<p class="message-items__top__date">` +
        message.created_at +
        `</p>` +
        `</div>` +
        `<p class="message-items__message">` +
        message.content +
        `<img class="messageJ-items__image" src="` + message.image + `" alt="Amaebi computer">` +
        `</p>` +
        `</div>`
      return html;
    } else {
      var html = `<div class="message-items">` +
        `<div class="message-items__top">` +
        `<p class="message-items__top__name">` +
        message.user_name +
        `</p>` +
        `<p class="message-items__top__date">` +
        message.created_at +
        `</p>` +
        `</div>` +
        `<p class="message-items__message">`+
        message.content +
        `</p>` +
        `</div>` 
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    })
  })
});