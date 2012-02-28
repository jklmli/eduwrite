/**
 * Created by JetBrains PhpStorm.
 * User: xion
 * Date: 2/24/12
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(
    function load(){
        loadUserNotes();
        loadClasses();
    }
)

/**
 * The classes returned by /getClasses.  If we can
 * find a way to get the classes from jstree, we won't need
 * this global variable.
 */
var classes;

/**
 * Creates a jstree with id="#notes-tree".  Once loaded, lectures and notes are added to the tree.
 */
function loadClasses(){
    $("#notes-tree")
        .bind("loaded.jstree",function(event,data){
            console.log("TREE IS LOADED");
            $("#notes-tree").jstree("hide_icons");
            for(i in classes){
                loadLecturesByClassId(classes[i].data[0].id);
            }

        })
        .jstree({
            "json_data" : {
                "ajax" : {
                    "type" : "POST",
                    "url" : "/getClasses",
                    "success" : loadClassesCallback
                }
            },
            "plugins" : [
                "themes", "json_data", "crrm"
             ]
    });
}

/**
 * Modifies the data returned from the Facade so jstree can recognize each element as a node;
 * @param data
 */
function loadClassesCallback(data){
    classes = [];
    for(i in data){
        classes[i] = {data: data[i], attr: {id: "class" + data[i].id}};
    }
    return classes;
}

/**
 * calls /getLecturesByClassId
 * @param id
 */
function loadLecturesByClassId(id){
    $.post("/getLecturesByClassId", {
            classId: id
        },
        loadLecturesByClassIdCallback,
        "json"
    );

}

function loadLecturesByClassIdCallback(data){
    var lecture;
    for (i in data){
        lecture = {data: data[i], attr: {id: "lecture" + data[i].id}};
        // Add the lecture to the class
        $("#notes-tree").jstree("create", "#class" + data[i].classId, "inside", lecture);
        $("#class" + data[i].classId).jstree("show_icons");
        $.post("/getNotesByLectureId", {
                lectureId: data[i].id
            },
            loadNotesByLectureIdCallback,
            "json"
        );
    }
}

function loadNotesByLectureIdCallback(data){
    console.log(data);
    var note;
    for (i in data){
        note = {data: data[i], attr: {id: "note" + data[i].id}};
        $("#notes-tree").jstree("create", "#lecture" + data[i].lectureId, "inside", note);
    }
}

function loadUserNotes() {

    var userId = 1;
    $.post("/getNotesByUserId", {
            userId: userId
        },
        loadUserNotesCallback,
        "json"
    );
}

function loadUserNotesCallback(data) {
    $("#user-notes").empty();
    for (i in data) {
        var note = data[i];
        var listItem = document.createElement('li');
        var noteLocation = document.createElement('a');
        console.log(note.location);
        noteLocation.href = note.location;
        noteLocation.innerText = note.title;
        listItem.appendChild(noteLocation);
        $("#user-notes").append(listItem);
    }
}