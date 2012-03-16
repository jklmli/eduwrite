// Loads class data and user notes on page load
$(document).ready(
  function load() {
    loadUserNotes();
    loadClasses();
    $('.new-note-button').click(newNote);

  }
);

/**
 * Add event handler for when the new note button is clicked
 */


/**
 * Function for placing /newPad/ frame
 */
function newNote() {
    $('.content').html("<iframe class='noteFrame' src='/newPad/'></iframe>");
}

/**
 * The classes returned by /getClasses.  If we can
 * find a way to get the classes from jstree, we won't need
 * this global variable.
 */
var classes;
var notes;

/**
 * Creates a jstree with id="#notes-tree".  Once loaded, lectures and notes are added to the tree.
 */
function loadClasses() {
  $("#notes-tree")
    .bind("loaded.jstree", function (event, data) {
      console.log("TREE IS LOADED");
//      $("#notes-tree").jstree("hide_icons");
      for (i in classes) {
        if (classes.hasOwnProperty(i)) {
          loadLecturesByClassId(classes[i].data[0].id);
        }
      }

    })
    .jstree({
      plugins:[
        "themes", "json_data", "crrm", "dnd", "types", "ui", "sort"
      ],
      json_data:{
        ajax:{
          type:"POST",
          url:"/getClasses",
          success:loadClassesCallback
        }
      },
      types: {
        // only class nodes as root nodes
        valid_children : ["class"],
          "types" : {
            "note" : {
              // This type should have no children
              "valid_children" : "none",
              "icon" : {
                "image" : "/static/img/fileicons.gif"
              },
              "select_node" : function(node){
                // put node in data so it works with the function
                data = {rslt: {obj: node}};
                loadNoteIntoUserSpace("select_node",data)
              }
            },
            "lecture" : {
              // can only have notes as children
              "valid_children" : ["note"],
              "move_node" : false,
              "start_drag" : false
//              "select_node" : false
            },
            "class" : {
              // can have lectures and notes as children
              "valid_children" : ["lecture", "note"],
//              "select_node" : false,
              "move_node" : false,
              "start_drag" : false
            }
        }
      }
    });
}

/**
 * Modifies the data returned from the Facade so jstree can recognize each element as a node;
 * @param data
 */
function loadClassesCallback(data) {
  classes = [];
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      classes[i] = {data:data[i], attr:{id:"class" + data[i].id, rel: "class"}};
    }
  }
  return classes;
}

/**
 * calls /getLecturesByClassId
 * @param id
 */
function loadLecturesByClassId(id) {
  $.post("/getLecturesByClassId", {
      classId:id
    },
    loadLecturesByClassIdCallback,
    "json"
  );

}

function loadLecturesByClassIdCallback(data) {
  var lecture;
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      lecture = {data:data[i], attr:{id:"lecture" + data[i].id, rel: "lecture"}};
      // Add the lecture to the class
      $("#notes-tree").jstree("create_node", $("#class" + data[i].classId), "inside", lecture);
      $.post("/getNotesByLectureId", {
          lectureId:data[i].id
        },
        loadNotesByLectureIdCallback,
        "json"
      );
    }
  }
}

function loadNotesByLectureIdCallback(data) {
  var note;
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      note = {data:data[i], attr:{id:"note" + data[i].id, rel: "note"}};
      $("#notes-tree").jstree("create_node", $("#lecture" + data[i].lectureId), "inside", note);
    }
  }
}

/**
 * Triggers the callback to load the user note data.
 */
function loadUserNotes() {

  $("#user-notes")
    .jstree({
      "json_data":{
        "ajax":{
          "type":"POST",
          "url":"/getNotesByUserId",
          "success":loadUserNotesCallback
        }
      },
      "plugins":[
        "themes", "json_data", "crrm", "ui", "sort"
      ]
    })
    .bind("select_node.jstree", loadNoteIntoUserSpace)
    // 2) if not using the UI plugin - the Anchor tags work as expected
    //    so if the anchor has a HREF attirbute - the page will be changed
    //    you can actually prevent the default, etc (normal jquery usage)
    .delegate("a", "click", function (event, data) {
      event.preventDefault();
    })

}


/**
 * The callback triggered when we've loaded user note data from the server.
 */
function loadUserNotesCallback(data) {
  notes = [];
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      notes[i] = {data:data[i], attr:{id:"user_note" + data[i].id, href:data[i].location}};
    }
  }
  return notes;
}

/**
 * Executed when a user clicks on a note from the sidebar, triggers loading a note.
 */
function loadNoteIntoUserSpace(event, data) {
  var id = data.rslt.obj.attr("id");
  $('.content').html("<iframe class='noteFrame' src='/pad/"+id+"'></iframe>");
}