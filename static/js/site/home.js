// The jstile data structure
var numberOfNotes = 0;
var mosaic;

// Loads course data and user notes on page load
$(document).ready(
  function load() {
    loadUserNotes();
    loadCourses();

    $("#newNoteModal").on("show", function() {
      // get classes to put in the course select list
      $.post("/getCourses", null,
        loadCoursesIntoModal,
        "json"
      );
    });
    // onchange event for select list
    $("#newNoteCourse").change(function(e){
      // use the courses array and the new selected index to get the id
      var courseId = courses[this.selectedIndex].data.id;
      // get lectures for course to put in the lecture select list
      $.post("/getLecturesByCourseId", {
          courseId: courseId
        },
        loadLecturesIntoModal,
        "json"
      );
    });
    mosaic = $('.content').jstile();
  }
);

function loadLecturesIntoModal(data){
  $("#newNoteLecture").empty();
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      // Add the lecture to the modal
      $("#newNoteLecture").append($("<option></option>")
        .attr("value", i)
        .attr("id", data[i].id)
        .text(data[i].name));
    }
  }
}

function loadCoursesIntoModal(data){
  courses = loadCoursesCallback(data);
  $("#newNoteCourse").empty();
  for (i in courses) {
    if (courses.hasOwnProperty(i)) {
      $("#newNoteCourse").append($("<option></option>")
        .attr("value", i)
        .attr("id", courses[i].data.id)
        .text(courses[i].data.title));
      // load the first classes lectures into the lecture modal!
      if(i == 0){
        $.post("/getLecturesByCourseId", {
            courseId: courses[i].data.id
          },
          loadLecturesIntoModal,
          "json"
        );
      }
    }
  }
}

/**
 * Add event handler for when the new note button is clicked
 */
function createNoteClicked() {
    var selectedItem = document.getElementById("newNoteLecture");
    console.log(selectedItem);
    var lectureId = selectedItem.options[selectedItem.selectedIndex].id;
    console.log(lectureId);

    // Pass lecture ID and Title to the the server to be placed in database
    $.post("/addNote",{lectureId: lectureId, title:$("#newNoteName").val()}, createNoteClickedCallback,"json");


    $('#newNoteModal').modal('hide');

}

function createNoteClickedCallback(data) {

    // Create Etherpad frame with name from newNoteName Input box
    loadNoteIntoUserSpace($('#newNoteName').val(),data.insertId);

    loadUserNotes();
    loadCourses();
    return;
}

/**
 * Function for placing /newPad/ frame
 */
function newNote() {
    $('.content').html("<iframe class='noteFrame' src='/newPad/'></iframe>");
}

/**
 * The course returned by /getCourses.  If we can
 * find a way to get the courses from jstree, we won't need
 * this global variable.
 */
var courses;
var notes;

/**
 * Creates a jstree with id="#notes-tree".  Once loaded, lectures and notes are added to the tree.
 */
function loadCourses() {
  $("#notes-tree")
    .bind("loaded.jstree", function (event, data) {
      for (i in courses) {
        if (courses.hasOwnProperty(i)) {
          loadLecturesByCourseId(courses[i].data[0].id);
        }
      }

    })
    .jstree({
      plugins:[
        "themes", "json_data", "crrm", "dnd", "types", "ui", "sort"
      ],
      "json_data":{
        "ajax":{
          "type":"POST",
          "url":"/getCourses",
          "success":loadCoursesCallback
        }
      },
      "types": {
        // only course nodes as root nodes
        "valid_children" : ["course"],
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
                onNewNoteButtonClick("select_node",data)
              }
            },
            "lecture" : {
              // can only have notes as children
              "valid_children" : ["note"],
              "move_node" : false,
              "start_drag" : false,
              "select_node" : toggleNode
            },
            "course" : {
              // can have lectures and notes as children
              "valid_children" : ["lecture", "note"],
              "move_node" : false,
              "start_drag" : false,
              "select_node" : toggleNode
            }
        }
      }
    });
}

// Toggles whether the node is open/closed
function toggleNode(node){
  $("#notes-tree").jstree("toggle_node",node);
}

/**
 * Modifies the data returned from the Facade so jstree can recognize each element as a node;
 * @param data
 */
function loadCoursesCallback(data) {
  courses = [];
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      courses[i] = {data:data[i], attr:{id:"course" + data[i].id, rel: "course"}};
      courses[i].data.title = courses[i].data.name;
    }
  }
  return courses;
}

/**
 * calls /getLecturesByCourseId
 * @param id
 */
function loadLecturesByCourseId(id) {
  $.post("/getLecturesByCourseId", {
      courseId:id
    },
    loadLecturesByCourseIdCallback,
    "json"
  );
}

function loadLecturesByCourseIdCallback(data) {
  var lecture;
  for (i in data) {
    if (data.hasOwnProperty(i)) {
      lecture = {data:data[i], attr:{id:"lecture" + data[i].id, rel: "lecture"}};
      lecture.data.title = lecture.data.name;
      // Add the lecture to the ourse
      $("#notes-tree").jstree("create_node", $("#course" + data[i].courseId), "inside", lecture);
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
      note = {data:data[i], attr:{id:data[i].id, rel: "note", title: data[i].title}};
      $("#notes-tree").jstree("create_node", $("#lecture" + data[i].lectureId), "inside", note);
    }
  }
}

/**
 * Triggers the callback to load the user note data.
 * Generates a tree at the user-notes div
 */
function loadUserNotes() {

  $("#user-notes")
    .jstree({
      "json_data":{
        "ajax":{
          "type":"POST",
          "url":"/getNotes",
          "success":loadUserNotesCallback
        }
      },
      "plugins":[
        "themes", "json_data", "crrm", "ui", "sort"
      ]
    })
    .bind("select_node.jstree", onNewNoteButtonClick)
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
      notes[i] = {data:data[i], attr:{id:data[i].id, title: data[i].title, href:data[i].location}};
    }
  }
  return notes;
}

/**
 * Executed when a user clicks on a note from the sidebar, triggers loading a note.
 */
function onNewNoteButtonClick(event, data) {
  var title = data.rslt.obj.attr("title");
  var id = data.rslt.obj.attr("id");
  loadNoteIntoUserSpace(title,id);
}

/**
 * Loads the note based on the title onto the page
 * @param title The title of the new note
 */
function loadNoteIntoUserSpace(title, id){

  // Set content div to absolute height of 800px
  $('.content').height(800);

  // Remove the placeholder if there is
  if(numberOfNotes === 0) {
    $('.content').find('.hero-unit').remove();
  }
  numberOfNotes++;

  // Add the frame for the new note
  var newElement = $(
    "<div class='tileChild'>" +
      "<table class='noteHeader'>" +
        "<tr>" +
          "<td style='width:90%;'><h3>" + title + "</h3></td>" +
          "<td style='width:10%;'>" +
            "<button class='btn closeNoteButton'>" +
              "<i class='icon-remove'></i>" +
            "</button>" +
          "</td>" +
        "</tr>" +
      "</table>" +
      "<iframe class='noteFrame' src='/p/" +  id + "'></iframe>" +
    "</div>");

  var newTileAndSibling = mosaic.add(newElement);

  // Attach a listener to remove this tile when the close button is clicked
  newElement.find('.closeNoteButton').click(function() {
    var thisTile = newTileAndSibling[newTileAndSibling.length-1];
    mosaic.remove(thisTile);
    pack();
  });

  // Attach a callback to resize the note frames once the page is loaded
  newElement.ready(pack);
}

function pack() {
  $('.noteFrame').css('overflow-y', 'scroll');
  $('.noteFrame').each(function() {
    $(this).height($(this).parent().height()-$(this).siblings('.noteHeader').height());
  });
}
