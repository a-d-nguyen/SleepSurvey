
(function() {
  var questions = [{
    question: "How many times do you drink alcohol per week?",
    choices: ['I do not drink alcohol', "1-2 times", "3-4 times", "Almost everyday"],
      awsA: 3,
    	awsB: 2,
    	awsC: 1,
    	awsD: 0
  }, {
    question: "How would you rate your alcohol consumption habits? (sipping vs. handle pulls)",
    choices: ["N/A", "Light", "Moderate", "Heavy"],
      awsA: 3,
      awsB: 2,
      awsC: 1,
      awsD: 0
  }, {
    question: "How many times do you consume drugs per week? (e.g. marijuana, cigarettes, ecstasy)",
    choices: ["N/A", "1-2 times", "3-4 times", "Almost everyday"],
      awsA: 3
,      awsB: 2,
      awsC: 1,
      awsD: 0
  }, {
    question: "How would you rate your drug consumption habits?",
    choices: ["N/A", "Light", "Moderate", "Heavy"],
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
    
    if (numCorrect >7) {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Based on your answers, your drug and/or alcohol consumption habits are at a level that has minimal effect on your sleeping habits. Studies show that consuming alcohol, even a few days after studying, can negatively affect your ability to recall said content even if your exam is a few days after drinking. Drugs can have a wide variety of effects on your body and sleep habits. MDMA, a popular drug amongst young people and college students, is a psychoactive drug that causes greater release of serotonin, which is the precursor to melatonin. This release causes a great depletion of the neurotransmitter important for sleep regulation. Users also report sleep-paralysis and night terrors as a common side-effect after an MDMA binge.');
      return score;
    } else {
      score.append('You scored ' + numCorrect + ' out of ' +
                   questions.length * 3 + '. Based on your answers, your drug and/or alcohol consumption habits are at a level that may negatively affect your sleeping habits. Here is why you may be having trouble sleeping or reaping the benefits of sleep. Studies show that consuming alcohol, even a few days after studying, can negatively affect your ability to recall said content even if your exam is a few days after drinking. Drugs can have a wide variety of effects on your body and sleep habits. MDMA, a popular drug amongst young people and college students, is a psychoactive drug that causes greater release of serotonin, which is the precursor to melatonin. This release causes a great depletion of the neurotransmitter important for sleep regulation. Users also report sleep-paralysis and night terrors as a common side-effect after an MDMA binge.');
      return score;
    }
  }
})();