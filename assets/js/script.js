
(function() {
  var questions = [{
    question: "How many hours do you sleep per day on average?",
    choices: ['less than 5 hours', "5-6 hours", "7-8 hours", "more than 8 hours"],
      awsA: 0,
    	awsB: 1,
    	awsC: 2,
    	awsD: 3
  }, {
    question: "How many hours of sleep do you think you need per night?",
    choices: ["Less than 4 hours", "4-5 hours", "6-7 hours", "8 or more hours"],
      awsA: 0,
      awsB: 1,
      awsC: 2,
      awsD: 3
  }, {
    question: "How do you usually feel when you wake up?",
    choices: ["Extremely tired", "Somewhat tired", "Indifferent", "Well-Rested; Ready to take on the day"],
      awsA: 0,
      awsB: 1,
      awsC: 2,
      awsD: 3
  }, {
    question: "How long do you take to fall asleep?",
    choices: ["I fall asleep easily/almost immediately", "It takes a couple of minutes", "It takes me more than 10 minutes", "I lie in bed for an hour or more before falling asleep"],
      awsA: 3,
      awsB: 2,
      awsC: 1,
      awsD: 0
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
    
    if (numCorrect <8) {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Oh no! A survey given to Berkeley students shows that on average, students get around 6.8 hours of sleep per night, which is not the adequate amount of sleep we should be getting. If you only get below 6 hours of sleep per night on average, there can be detrimental effects to your memory consolidation abilities, as well as your physical and mental health. Physically, not getting enough sleep has been shown to affect your metabolism and immune system negatively. Please try to get more sleep!');
      return score;
    } else {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Awesome! Humans on average need at least 8 hours of sleep per night to be at optimal functioning level. Getting enough sleep will keep your physical, as well as mental, health balanced. Additionally, getting enough sleep can help improve memory consolidation and maybe even inspire creativity. If you only get below 6 hours of sleep per night on average, there can be detrimental effects to your memory consolidation abilities, as well as your physical and mental health. You are doing great by getting enough sleep; keep on sleeping well!');
      return score;
    }
  }
})();