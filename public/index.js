$('.add-new-button').on('click', function() {
  appendQuestionField();
});

function appendQuestionField() {
  var questionNumber = $('.question').length + 1;
  var newQuestion = 'Question '
                    + questionNumber + ':<br><input class="question" data-id="'
                    + questionNumber + '" type="text" name="question-'
                    + questionNumber + '" placeholder="Enter a question"><br><br>';
  $('.question-list').append(newQuestion).off();
}
