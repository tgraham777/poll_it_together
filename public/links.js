$(document).ready(function(){
  var pollUrl = $('#poll-url');
  var pollFullUrl = window.location.origin + "/" + pollUrl.text();
  pollUrl.text(pollFullUrl);
  pollUrl.attr('href', pollFullUrl);

  var adminUrl = $('#admin-url');
  var adminFullUrl = window.location.origin + "/" + adminUrl.text();
  adminUrl.text(adminFullUrl);
  adminUrl.attr('href', pollFullUrl);
})
