//This file will control the clicks of the menu buttons.



$(document).ready(function(){
  $("#remove_all").click(function(){state="removeAll"; model.removeAll();});

  $("#add_vertex").click(function(){state="add_vertex"; model.removeAll();});
  $("#remove_vertex").click(function(){state="remove_vertex"; model.removeAll()});
  $("#edit_vertex").click(function(){state="edit_vertex"; model.removeAll()});


  $("#add_edge").click(function(){state="add_edge"; model.removeAll()});
  $("#remove_edge").click(function(){state="remove_edge"; model.removeAll()});



});