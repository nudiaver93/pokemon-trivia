
var questions = [{
  question: 'Misty is the Gym Leader for which city?',
  answers: ["Saffron City", "Celadon City", "Cerulean City", "Lavender Town"],
  correctAnswer: "Cerulean City",
  image:"assets/images/misty.gif"
}, {
  question: "Which stone can be used to evolve Eevee?",
  answers: ["Leaf Stone", "Moon Stone", "Fire Stone", "Sun Stone"],
  correctAnswer: "Fire Stone",
  image:"assets/images/eevee.gif"
}, {
  question: "In Pokemon Red, where does the player catch Lapras?",
  answers: ["Silph Co", "Safari Zone", "Cinnabar Island", "Diglett's Cave"],
  correctAnswer: "Silph Co",
  image:"assets/images/lapras.gif"
}, {
  question: 'In Generation 1, the Pokemon with the highest attack stat is _',
  answers: ["Tyranitar", "Machamp", "Mewtwo", "Dragonite"],
  correctAnswer: "Dragonite",
  image:"assets/images/dragonite.gif"
}, {
  question: "Which Pokemon did Ash Ketchum release?",
  answers: ["Pikachu", "Tauros", "Snorlax", "Butterfree"],
  correctAnswer: "Butterfree",
  image:"assets/images/butterfree.gif"
}, {
  question: "Which of these Pokemon is not an ice type?",
  answers: ["Shellder", "Seaking", "Dewgong", "Jynx"],
  correctAnswer: "Seaking",
  image:"assets/images/seaking.gif"
}, {
  question: "_ is the name of the glitched Pokemon in Pokemon Red.",
  answers: ["Mewthree", "UB-01", "Missingno", "Shuckle"],
  correctAnswer: "Missingno",
  image:"assets/images/missingno.gif"
}, {
  question: "Which Pokemon type was added in Generation 2?",
  answers: ["Ghost", "Steel", "Fairy", "Gold"],
  correctAnswer: "Steel",
  image:"assets/images/magnemite.gif"
}];

var timerCount = 30;

var game = {
  questions:questions,
  currentQuestion: 0,
  counter:timerCount,
  correct:0,
  incorrect:0,
  
  countdown: function(){
    game.counter--;
  
    $('#counter-number').html(game.counter);
  
    if (game.counter === 0){
      game.timeUp();
    }
  
  },
  

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
  
    $('.content').fadeOut('slow');
  
    var questionhtml = '<h2>Timer: <span id="counter-number">30</span></h2><h2>' + 
        (game.currentQuestion + 1) + '. ' + questions[this.currentQuestion].question + '</h2>';
        for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
          questionhtml += '<button class="answer-button" id="button"' + 
          'data-name="' + questions[this.currentQuestion].answers[i] + '">' + 
          questions[this.currentQuestion].answers[i]+ '</button>';
        };

    $('.content').queue(function (next) {
      $(this).empty();
      $(this).append(questionhtml);
      $(this).fadeIn('slow');
      next();
    });
    
  },
  

  nextQuestion: function(){
    game.counter = timerCount;
  
    $('#counter-number').html(game.counter);
  
    game.currentQuestion++;
  
    game.loadQuestion();
  
  },
  

  timeUp: function (){
    clearInterval(timer);

    $('.content').fadeOut('slow');

    var resulthtml = '<h2>Out of Time! It was ' + questions[this.currentQuestion].correctAnswer + 
                      '!</h2>' + '<img src="' + questions[this.currentQuestion].image + '"/>';

    $('.content').queue(function (next) {
      $(this).empty();
      $(this).append(resulthtml);
      $(this).fadeIn('fast');
      next();
    });

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },


  results: function() {
    clearInterval(timer);

    $('.content').fadeOut('slow');

    var resultshtml = '<h2>The results are in!</h2><h3>' + 
        'Correct Answers: ' + game.correct + '</h3><h3>Incorrect Answers: ' + 
        game.incorrect + '</h3><h3>Unanswered: ' + 
        (questions.length - (game.incorrect + game.correct)) + '</h3>' +
        '<br><button id="start-over">Start Over?</button>';

    $('.content').queue(function (next) {
      $(this).empty();
      $(this).append(resultshtml);
      $(this).fadeIn('slow');
      next();
    });
  },


  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } 
    else {
      this.answeredIncorrectly();
    }
  },


  answeredIncorrectly: function() {
    clearInterval(timer);
    game.incorrect++;
    
    $('.content').fadeOut('slow');

    var resulthtml = '<h2>Sorry! It was ' + questions[this.currentQuestion].correctAnswer + 
                      '!</h2>' + '<img src="' + questions[this.currentQuestion].image + '"/>';

    $('.content').queue(function (next) {
      $(this).empty();
      $(this).append(resulthtml);
      $(this).fadeIn('fast');
      next();
    })

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },


  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    $('.content').fadeOut('slow');

    var resulthtml = '<h2>Correct! It was ' + questions[this.currentQuestion].correctAnswer + 
                      '!</h2>' + '<img src="' + questions[this.currentQuestion].image + '"/>';

    $('.content').queue(function (next) {
      $(this).empty();
      $(this).append(resulthtml);
      $(this).fadeIn('fast');
      next();
    });

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3000);
    } else {
      setTimeout(game.nextQuestion, 3000);
    }
  },


  reset: function(){
    location.reload();
  }
};

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  game.loadQuestion();
});