
(function() {
  var questions = [{
    question: "How often do consume caffeinated food/beverages? (Coffee, Energy Drinks, etc.)",
    choices: ['I do not consumer caffeinated food/beverages', "Sometimes", "Everyday", "Multiple times a day"],
      awsA: 3,
    	awsB: 2,
    	awsC: 1,
    	awsD: 0
  }, {
    question: "What time do you consume caffeinated substances? (e.g. coffee, tea, caffein pills",
    choices: ["N/A", "Morning - Noon", "Noon - Afternoon", "Afternoon or After"],
      awsA: 3,
      awsB: 2,
      awsC: 1,
      awsD: 0
  }, {
    question: "How many hours before sleep do you consume caffeinated food/beverages?",
    choices: ["N/A", "more than 5 hours before bedtime", "3-5 hours before bedtime", "0-2 hours before bedtime"],
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
    
    if (numCorrect >5) {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Nice! Your caffeine consumption habits should not impact your ability to fall asleep! Adenosine is a neurotransmitter that makes us tired. Adenosine levels increase when we are awake and decrease when we are asleep. Due to its molecularly similar structure, caffeine can take the place of adenosine in adenosine receptors. Consuming too much caffeine or too close to bedtime can block adenosines ability to help you sleep!');
      return score;
    } else {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. It seems like you are consuming a lot of caffeine! Try to dial back with your caffeine consumption habits to improve your sleeping habits! Adenosine is a neurotransmitter that makes us tired. Adenosine levels increase when we are awake and decrease when we are asleep. Due to its molecularly similar structure, caffeine can take the place of adenosine in adenosine receptors. Consuming too much caffeine or too close to bedtime can block adenosines ability to help you sleep!');
      return score;
    }
  }
})();