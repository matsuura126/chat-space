$(function(){

  var search_user = $("#user-search-result");

  function appendUser(User) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${User.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${User.id}" data-user-name="${User.name}">追加</div>
                </div>`
    search_user.append(html);
  }
  function appendErrMsgToHTML() {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    search_user.append(html);
  }
  function appendGroupMember(userName, userId) {
    var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${userId}'> 
                <p class='chat-group-user__name'>${userName}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    $("#chat-group-users.js-add-user").append(html)
  }
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendErrMsgToHTML();
      }
    })
    .fail(function() {
      console.log("通信エラーです。ユーザが表示出来ません。");
    });
  });
  $(document).on('click', ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendGroupMember(userName, userId);
  });
  $(document).on('click', ".js-remove-btn", function(){
    $(this).parent().remove();
  });
});