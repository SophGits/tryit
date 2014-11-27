function showItems(items, container){
    container.html('');
  $.each(items, function(index, item){
    container.append("<li>" + item + "</li>");
  });
}