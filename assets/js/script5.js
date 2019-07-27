
(function() {
  var questions = [{
    question: "How often do you pull all-nighters?",
    choices: ['N/A', "Every now and then near exams", "at least once per week", "More than once a week"],
      awsA: 3,
    	awsB: 2,
    	awsC: 1,
    	awsD: 0
  }, {
    question: "When you have a difficult and important exam coming up, how likely are you to pull an all-nighter?",
    choices: ["I do not pull all-nighters", "Not likely", "Somewhat likely", "Likely"],
      awsA: 3,
      awsB: 2,
      awsC: 1,
      awsD: 0
  }, {
    question: "How often do you take naps?",
    choices: ["Not at all", "Rarely (once in a while)", "Often (a couple times per week)", "Frequently (almost everyday)"],
      awsA: 0,
      awsB: 1,
      awsC: 2,
      awsD: 3
  }, {
    question: "How long is each nap?",
    choices: ["N/A", "Multiple Hours", "Around 1-2 hours", "Less than an hour"],
      awsA: 0,
      awsB: 1,
      awsC: 3,
      awsD: 2
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
    
    if (numCorrect >7) {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. It is a good thing that you are not pulling all-nighters!  Pulling even one all-nighter can severely damage your memory abilities the following day, and the effects can last for several days at a time. Studies show that compared to students who did not pull an all-nighter, students who pulled an all-nighter the day before an exam did not perform as well. While some students take naps during the day to make up the amount of sleep lost during the all-nighter, the effects will not be compensated for. Not getting enough sleep will decrease your immune function, making it more likely for you to get sick, and also alter your hormone levels, making you at risk for weight gain and diabetes. Keep up the good work, and remember to take naps during the day if you ever get too tired.');
      return score;
    } else {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Pulling even one all-nighter can severely damage your memory abilities the following day, and the effects can last for several days at a time. Studies show that compared to students who did not pull an all-nighter, students who pulled an all-nighter the day before an exam did not perform as well. While some students take naps during the day to make up the amount of sleep lost during the all-nighter, the effects will not be compensated for. Not getting enough sleep will decrease your immune function, making it more likely for you to get sick, and also alter your hormone levels, making you at risk for weight gain and diabetes. Please refrain from pulling all-nighters if possible!');
      return score;
    }
  }
})();