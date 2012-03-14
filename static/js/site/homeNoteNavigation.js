// Loads class data and user notes on page load
$(document).ready(
  function load() {
    loadUserNotes();
    loadClasses();
    $('#new-note-button').click(newNote);
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
      $("#notes-tree").jstree("hide_icons");
      for (i in classes) {
        if (classes.hasOwnProperty(i)) {
          loadLecturesByClassId(classes[i].data[0].id);
        }
      }

    })
    .jstree({
      "json_data":{
        "ajax":{
          "type":"POST",
          "url":"/getClasses",
          "success":loadClassesCallback
        }
      },
      "plugins":[
        "themes", "json_data", "crrm"
      ]
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
      classes[i] = {data:data[i], attr:{id:"class" + data[i].id}};
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
      lecture = {data:data[i], attr:{id:"lecture" + data[i].id}};
      // Add the lecture to the class
      $("#notes-tree").jstree("create", "#class" + data[i].classId, "inside", lecture);
      $("#class" + data[i].classId).jstree("show_icons");
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
  console.log(data);
  var note;
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      note = {data:data[i], attr:{id:"note" + data[i].id}};
      $("#notes-tree").jstree("create", "#lecture" + data[i].lectureId, "inside", note);
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
        "themes", "json_data", "crrm", "ui"
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