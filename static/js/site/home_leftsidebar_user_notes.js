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
    }
)

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
        listItem.innerHTML = note.name;
        $("#user-notes").append(listItem);
    }
}