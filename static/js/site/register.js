/**
 * Checks if a password is valid, i.e. at least 6 characters long
 */
function checkPassword() {
    var currentPassword = $("#password-input").val();
    if (currentPassword.length < 6) {
        $("#password-box").addClass("warning");
        $("#password-box").removeClass("error");
        $("#password-box").removeClass("success");
    } else {
        $("#password-box").addClass("success");
        $("#password-box").removeClass("warning");
        $("#password-box").removeClass("error");
    }
}

/**
 * Checks that the password confirmation matches so far, exactly, or detects a mismatch
 */
function checkPasswordConfirmation() {

    var password = $("#password-input").val();
    var passwordConfirmation = $("#password-confirm-input").val();

    var equalSoFar = passwordConfirmation == password.substr(0, passwordConfirmation.length);

    // Passwords match so far, but not equal
    if (password.length > passwordConfirmation.length && passwordConfirmation.length > 0 && equalSoFar) {

        $("#password-confirm-box").addClass('warning');
        $("#password-confirm-box").removeClass('success');
        $("#password-confirm-box").removeClass('error');

    // Password mismatch
    } else if (passwordConfirmation.length > 0 && (password != passwordConfirmation || !equalSoFar)) {

        $("#password-confirm-box").addClass('error');
        $("#password-confirm-box").removeClass('success');
        $("#password-confirm-box").removeClass('warning');

    // Passwords match
    } else if (password == passwordConfirmation && password.length > 0) {

        $("#password-confirm-box").addClass('success');
        $("#password-confirm-box").removeClass('error');
        $("#password-confirm-box").removeClass('warning');
    }
}

function validateRegistrationForm() {
    checkPasswordConfirmation();
    checkPassword();
}