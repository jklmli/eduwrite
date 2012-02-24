/**
 * Created by JetBrains PhpStorm.
 * User: xion
 * Date: 2/24/12
 * Time: 3:54 PM
 * To change this template use File | Settings | File Templates.
 */
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
    console.log(data);
}