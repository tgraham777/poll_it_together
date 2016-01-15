$('.add-new-button').on('click', function() {
  appendQuestion();
});

function appendQuestion() {
  var questionNumber = $('.question').length + 1;
  var newQuestion = 'Question '
                    + questionNumber + ':<br><input data-id="'
                    + questionNumber + '" type="text" name="question-'
                    + questionNumber + '" class="question" id="question-'
                    + questionNumber + '" placeholder="Enter a question"><br><br>';
  $('.question-list').append(newQuestion).off();
}

// $('.poll-submit').on('click', function() {
//   recordPollName();
//   recordPollDescription();
//   recordQuestions();
//   recordAutoClose();
//   recordShowResults();
//   $('.poll-submit').off('click');
// });
//
// function recordPollName() {
//   var name = $('.poll-name').val();
//   $('#poll-form').append(`<div>
//   <h3>${name}</h3>
//   </div>`)
// }
//
// function recordPollDescription() {
//   var description = $('.poll-description').val();
//   console.log(description);
// }
//
// function recordQuestions() {
//   var questions = document.getElementsByClassName("question");
//   var i;
//   for (i = 0; i < questions.length; i++) {
//     var questionId = "#question-" + (i + 1);
//     var question = $(questionId).val();
//     console.log(question);
//   }
// }
//
// function recordAutoClose() {
//   console.log($('#auto-close-list').val());
// }
//
// function recordShowResults() {
//   if($('input[name="Yes"]').is(':checked')) {
//     console.log("Yes");
//   } else if($('input[name="No"]').is(':checked')) {
//     console.log("No");
//   } else {
//     console.log("Nothing is checked");
//   }
// }
