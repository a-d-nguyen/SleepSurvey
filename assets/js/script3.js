
(function() {
  var questions = [{
    question: "How many times do you exercise per week?",
    choices: ['I am a couch potato', "Once per week", "A few times per week", "Everyday"],
      awsA: 0,
    	awsB: 1,
    	awsC: 2,
    	awsD: 3
  }, {
    question: "How intense is your exercise?",
    choices: ["I told you. I am a couch potato.", "Mild", "Moderate", "Vigorous"],
      awsA: 0,
      awsB: 1,
      awsC: 2,
      awsD: 3
  }, {
    question: "How many hours before sleep do you exercise?",
    choices: ["N/A", "0-3 hours", "3-5 hours", "more than 5 hours"],
      awsA: 0,
      awsB: 1,
      awsC: 2,
      awsD: 3
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  // $('#start').on('click', function (e) {
  //   e.preventDefault();
    
  //   if(quiz.is(':animated')) {
  //     return false;
  //   }
  //   questionCounter = 0;
  //   selections = [];
  //   displayNext();
  //   $('#start').hide();
  // });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
          $('img').hide();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
          $('img').hide();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $('img').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].awsA) {
        numCorrect += 0;
      }
      else if (selections[i] === questions[i].awsB) {
        numCorrect++;
      }
      else if (selections[i] === questions[i].awsC) {
        numCorrect += 2;
      }
      else {
        numCorrect += 3;
      }
    }
    
    if (numCorrect >5) {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Exercising several hours before bed is the best time to exercise because it allows our brains to return to baseline activity and eventually allow us to feel sleepy. Because brains are increasingly active during exercise, you should not exercise right before bed or you might risk feeling restless. You’re doing great by giving your brain enough time before bed to calm down! If you don’t exercise, it is still recommended that you start exercising consistently because it correlates with benefits on your sleep quality and memory consolidation - just keep in mind not to exercise too close to bedtime! ');
      return score;
    } else {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Exercising too close to your bedtime can affect your sleepiness levels and impede on your ability to fall asleep quickly. Because our brains are increasingly active during exercise, they will need an adequate amount of time to return to base level and eventually allow us to feel sleepy. Exercising is good, but do not do it too close to bedtime or else you will not be able to sleep!');
      return score;
    }
  }
})();