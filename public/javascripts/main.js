var app = {};
app.alphabet = "A B C D E F G H I J K L M N O P Q R S T U V Q X Y Z";

app.start = function(){
  // Run on game start.
  $.get('/getword', function(data){
    console.log(data);
    app.word = data.split('');

    var alphaArray = app.utils.generateAlpha();

    app.utils.printAlpha(alphaArray);
    app.utils.printWord(app.word);

    app.run();
  });
};

app.run = function(){
  var guesses = 0;
  var wrongGuesses = 1;

  $('.alphaBtn').on('click', function(){
    guesses++;
    var letterElement = $(this);
    var letter = $(this).text();
    var lowerLetter = letter.toLowerCase();
    
    if(app.word.indexOf(lowerLetter) !== -1){
      $('.word-container span:contains(' + lowerLetter + ')').each(function(i, e){
        console.log('CORRECT GUESS! Showing letter.');
        $(e).css({'visibility': 'visible'});
        letterElement.off('click');
        letterElement.css('text-decoration', 'line-through');
      });
    }else{
      wrongGuesses++;
    }

  });
};

app.utils = {
  generateAlpha: function(){
    return app.alphabet.split(' ');
  },
  printAlpha: function(alpha){
    var alphaContainer = $('.alpha-container');
    console.log(alpha);

    $.each(alpha, function(i, e){
      var button = $('<a/>').addClass('alphaBtn').text(e);
      alphaContainer.append(button);
    });
  },
  printWord: function(word){
    var wordContainer = $('.word-container');

    $.each(word, function(i,e){
      var letterDiv = $('<div/>').css({
        'border-bottom':'1px solid black',
        'margin':'0 7px',
        'display':'inline-block'
      });
      var letter = $('<span/>').text(e).css('visibility', 'hidden');
      letterDiv.append(letter);
      wordContainer.append(letterDiv);
    });
  }
};

$(function(){
  $('.game-start').on('click', function(){
    $(this).off('click');
    app.start();
  });
});