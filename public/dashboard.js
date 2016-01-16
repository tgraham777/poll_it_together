$(document).ready(function(){
  var pollUrl = $('#poll-url');
  var pollFullUrl = window.location.origin + "/" + pollUrl.text();
  pollUrl.text(pollFullUrl);
  pollUrl.attr('href', pollFullUrl);

  // var adminUrl = $('#admin-url');
  // var adminFullUrl = $(location).attr('href');
  // adminUrl.text(adminFullUrl);
  // adminUrl.attr('href', adminUrl.text());
})
