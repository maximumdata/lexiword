var board = $('#board');
var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var word = [];
var Letter = function(letter, pos) {
  this.letter = letter;
  this.pos = pos;
};

$(document).ready(function() {
  setupBoard();

  $('.tile').click(function(){
    $(this).toggleClass('selected');
    addOrRemoveLetter($(this));
  });

  $('#check').click(function(){
    checkWord($('#output').text());
  });

  $('#reset').click(function() {
    setupBoard();
  });
});


function getRandomLetter() {
  var rando = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
  return letters[rando];
}

function setupBoard() {
  $('.tile').each(function(){
    $(this).text(getRandomLetter());
    $(this).removeClass('selected');
  });
  word = [];
  $('#result').removeClass().html('');
  outputCurrentWordAsText();
}

function addOrRemoveLetter(el) {
  var letterText = el.text();
  var pos = el.attr('id');
  if(el.hasClass('selected')) {
    var newLet = new Letter(letterText, pos);
    word.push(newLet);
  } else {
    for(var i = 0; i < word.length; i++) {
      if(word[i].pos == pos) {
        word.splice(i, 1);
      }
    }
  }
  outputCurrentWordAsText();
}

function outputCurrentWordAsText() {
  var tempWord = '';
  for(var i = 0; i < word.length; i++) {
    tempWord += word[i].letter;
  }
  return $('#output').text(tempWord);
}

function checkWord(word) {
  var url = 'http://mikedettmer.com:7080/word/'+word;
  $.get(url, function(data) {
    $('#result').removeClass();
    if(data.failed) {
      $('#result').html('<span class="displayWord">'+word+'</span> is not a word! Try again.').addClass('failed');
    } else {
      $('#result').html('<span class="displayWord">'+word+'</span> is a word! Congrats!').addClass('worked');
    }
    setupBoard();
  });
}
