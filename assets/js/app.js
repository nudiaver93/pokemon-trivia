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
  question: 'In Generation 1, the Pokemon with the highest attack stat is ___',
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
  question: "__ is the name of the glitched Pokemon in Pokémon Red.",
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
  
    var questionhtml = '<h2>Time Left: <span id="counter-number">30</span> Seconds</h2><h2>' + 
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
}