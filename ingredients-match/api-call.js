
function getFruitVegInfo(item) {
  // xmlhttp = new XMLHttpRequest();
  // xmlhttp.onreadystatechange = function(){
  //   if (xmlhttp.readyState == 4) {
  //     if (xmlhttp.status == 200){
  //     console.log("success");
  //     var userObject = JSON.parse(xmlhttp.responseText);
  //     showItem(itemObject);
  //     } else {
  //     console.log("failed :|");
  //     unknownItem();
  //     }
  //   }
  // };
  // xmlhttp.open("GET", 'http://api.tropicalfruitandveg.com/tfvjsonapi.php?tfvitem='+ item, true);
  // xmlhttp.send();
  // return xmlhttp;


  $.ajax({
    type: 'GET',
       // jsonpCallback: 'jsonCallback',
       // contentType: "/json",
       // dataType: 'jsonp',
    url: "https://en.wikipedia.org/wiki/List_of_culinary_fruits",
    beforeSend: function(xhr) {
      xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
    }
  })
    .done(function(data) {
        console.log( "done, wooo!" );
        var hihi =[];
        hihi = $('li span.#'+item);
        console.log(hihi);
    });
}

function unknownItem(){
  $("#result h3").html('Item not found');
}

function showItem(itemObject){
 console.log('The api call works! We get: ' + itemObject);
 $("#result h3").html(itemObject.tfvname);
}

$(document).ready(function(){
  $(document).on('keypress', '#item', function(evnt){
    var enter = 13;
    if (evnt.which == enter) {
      var item = $('#item').val();
    getFruitVegInfo(item);
    }
  })
});

