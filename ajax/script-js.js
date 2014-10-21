// github user finder example


function getGithubInfo(user) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200){
      console.log("success");
      var userObject = JSON.parse(xmlhttp.responseText);
      showUser(userObject);
      } else {
      console.log("fail");
      unknownUser();
      }
    }
  };
  xmlhttp.open("GET", 'https://api.github.com/users/'+ user, true);
  xmlhttp.send();
  return xmlhttp;
}

function unknownUser(){
  $("#profile h2").html('No such user');
}

function showUser(userObject){
  $("#profile h2").html(userObject.login + ' is GitHub user #' + userObject.id);
  $("#profile .information").html('<a href="' + userObject.html_url + '" class="profile" >Link to profile</a>');
  $("#profile .avatar").html('<img src="https://gravatar.com/avatar/' + userObject.gravatar_id+ '?s=220" />');
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

