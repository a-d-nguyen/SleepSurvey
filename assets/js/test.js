

	alert("Hello World");

	function buildQuiz(){

		alert("Hello World");
	  	// we'll need a place to store the HTML output
	  	const output = [];

	  	// for each question...
	  	myQuestions.forEach(
	    	(currentQuestion, questionNumber) => {

		    // we'll want to store the list of answer choices
		    const answers = [];

		    // and for each available answer...
		    for(letter in currentQuestion.answers){

		      	// ...add an HTML radio button
		    	answers.push(
		          `<label>
		            <input type="radio" name="question${questionNumber}" value="${letter}">
		            ${letter} :
		            ${currentQuestion.answers[letter]}
		          </label>`
		        );
		    }

		      	// add this question and its answers to the output
		      	output.push(
		        	`<div class="question"> ${currentQuestion.question} </div>
		        	<div class="answers"> ${answers.join('')} </div>`
		      	);
		    }
	  );

	  // finally combine our output list into one string of HTML and put it on the page
	  quizContainer.innerHTML = output.join('');
	}

	function showResults(){

		// gather answer containers from our quiz
		const answerContainers = quizContainer.querySelectorAll('.answers');

		// keep track of user's answers
		let sum = 0;

		// for each question...
		myQuestions.forEach( (currentQuestion, questionNumber) => {

		    // find selected answer
		    const answerContainer = answerContainers[questionNumber];
		    const selector = 'input[name=question'+questionNumber+']:checked';
		    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

		    // if answer is correct
		    if(userAnswer===currentQuestion.awsA){
		      // add to the number of answers
		      sum += 0;
		    } else if(userAnswer===currentQuestion.awsB){
		    	sum += 1;
		    } else if(userAnswer===currentQuestion.awsC){
		    	sum += 2;
		    } else if(userAnswer===currentQuestion.awsD){
		      sum += 3
		    } else {
		    	answerContainers[questionNumber].style.color = 'red';
		    }
		});

		// show number of correct answers out of total
		resultsContainer.innerHTML = 'Your score is ' + sum;
	}

	const quizContainer = document.getElementById('quiz');
	const resultsContainer = document.getElementById('results');
	const submitButton = document.getElementById('submit');

	const myQuestions = [
	  	{
	    question: "How many hours do you sleep at night?",
	    answers: {
	      	a: "Less than 5 hours",
	      	b: "5-6 Hours",
	      	c: "7-8 Hours",
	      	d: "Over 8 Hours"
	    },
	    awsA: "a"
	    awsB: "b"
	    awsC: "c"
	    awsD: "d"
	  },
	  {
	    question: "How long do you take to fall asleep?",
	    answers: {
	      	a: "I fall asleep easily/almost immediately",
	      	b: "It takes a couple of minutes for me to fall asleep",
	      	c: "It takes me a while to fall asleep"
	      	d: "I have trouble falling asleep for a long time"
	    },
	    awsA: "a"
	    awsB: "b"
	    awsC: "c"
	    awsD: "d"
	  },
	  {
	    question: "How often do consume caffeine? (Coffee, Energy Drinks, etc.)",
	    answers: {
	      	a: "None",
	      	b: "Sometimes",
	      	c: "Everyday",
	      	d: "Multimple per day"
	    },
	    awsA: "a"
	    awsB: "b"
	    awsC: "c"
	    awsD: "d"
	  }
	];

	// display quiz right away
	buildQuiz();

	// on submit, show results
	submitButton.addEventListener('click', showResults);