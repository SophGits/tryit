// github user finder example


function getGithubInfo(user) {
 $.ajax({
  url: 'https://api.github.com/users/'+ user,
  beforeSend: function( xhr ) {
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
  }
})
 .done(function(data){
    var userObject = $.parseJSON(data);
    console.log(userObject);
    showUser(userObject);
 });
}

function unknownUser(){
  $("#profile h2").html('No such user');
}

function showUser(userObject){
  $("#profile h2").html(userObject.login + ' is GitHub user #' + userObject.id);
  $("#profile .information").html('<a href="' + userObject.html_url + '" class="profile" >Link to profile</a>');
  $("#profile .avatar").html('<img src="' + userObject.avatar_url+ '" />');
}

$(document).ready(function(){
  $(document).on('keypress', '#username', function(evnt){
    var enter = 13;
    if (evnt.which == enter) {
      var user = $('#username').val();
    getGithubInfo(user);
    }
  })
});

