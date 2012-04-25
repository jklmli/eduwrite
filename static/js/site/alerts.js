/**
 * Fades all alerts out in some number of milliseconds
 */
$(document).ready(function() {
  setTimeout(function() {
    $('.alert').fadeOut('fast');
  }, 2000);
});