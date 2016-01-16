$('.add-new-button').on('click', function() {
  appendQuestion();
});

function appendQuestion() {
  var questionNumber = $('.question').length + 1;
  var newQuestion = 'Question '
                    + questionNumber + ':<br><input data-id="'
                    + questionNumber + '" type="text" name="questions[question'
                    + questionNumber + ']" class="question" id="question'
                    + questionNumber + '" placeholder="Enter a question"><br><br>';
  $('.question-list').append(newQuestion).off();
}
