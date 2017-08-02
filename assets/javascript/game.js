var hangman = (function(){
  var newWord = "",
      wordWithoutAccent = '';

    
  var bindNewGame = function(el, block) {
    var id = document.getElementById(el),
        human = document.getElementById('human').querySelectorAll('.human-parts-visible'),
        h = 0;
        
    hangman.init();
    
    while (h < human.length) {
      human[h].className = 'human-parts';
      h++;
    }
    
    document.getElementById('value-actual-score').innerHTML = 0;
    document.getElementById('value-total-score').innerHTML = 100;
    
    id.addEventListener('click', function(){
      block.style.display = 'none';
    });
  };

  var setRightLetter = function(letter) {
    var containerWord = document.getElementById('list-hide-word');
    var blocksWord = containerWord.querySelectorAll('li'),
        countBlocks = 0,
        newValue = 0,
        blockActual = document.getElementById('value-actual-score'),
        blockTotalValue = document.getElementById('value-total-score'),
        blockSuccess = document.getElementById('success-hangman');
    
    var actualValue = blockActual.innerHTML;
    
    while (countBlocks < blocksWord.length) {
      if (blocksWord[countBlocks].getAttribute('data-letter') == letter) {
        blocksWord[countBlocks].setAttribute('class', 'active-letter');
      }
      countBlocks++;
    }
    
    activeBlocksWord = containerWord.querySelectorAll('.active-letter');
    
    newValue = parseInt(actualValue) + 10;
    blockActual.innerHTML = newValue;
    
    blockTotalValue.innerHTML = 100 + parseInt(newValue);
    
    if (activeBlocksWord.length == wordWithoutAccent.length) {
      blockSuccess.querySelector('p').innerHTML = 'Your final score was ' + (100 + parseInt(newValue));
      blockSuccess.style.display = 'block';
      bindNewGame('success-new-game', blockSuccess);
    }
  };
  
  var setWrongLetter = function() {
    var human = document.getElementById('human');
    var partsHuman = human.querySelector('.human-parts');
    var allPartsHuman = human.querySelectorAll('.human-parts'),
        newValue = 0,
        blockActual = document.getElementById('value-actual-score'),
        blockTotalValue = document.getElementById('value-total-score'),
        blockError = document.getElementById('error-hangman');
    
    var actualValue = blockActual.innerHTML;
    partsHuman.className = 'human-parts-visible';

    newValue = parseInt(actualValue) - 10;
    blockActual.innerHTML = newValue;

    blockTotalValue.innerHTML = 100 + parseInt(newValue);

    if (allPartsHuman.length == 1) {
      blockError.querySelector('p').innerHTML = 'Your final score was ' + (100 + parseInt(newValue));
      blockError.style.display = 'block';
      bindNewGame('error-new-game', blockError);
    }
  };
  
  var attachEventsLetters = function() {
    var blockLetters = document.getElementById('letters');
    var linkLetter = blockLetters.querySelectorAll('.link-letters'),
        countLetter = 0;

    var findLetter = function(el, word) {      
      var letter  = el.innerHTML;
      var hasLetter = word.indexOf(letter);
      
      if (hasLetter > -1) {
        setRightLetter(letter);
      } else {
        setWrongLetter();
      }
    };
    
    var eventLetter = function(element) {
          if ( element.classList.contains('active-link-letter') ) {
             var containClass = true;
          } else  { 
            element.setAttribute('class', 'link-letters active-link-letter');
            findLetter(element, wordWithoutAccent);
          }  
    };
    
    while (countLetter < linkLetter.length) {
      linkLetter[countLetter].addEventListener('click', function(){
        eventLetter(this);
      });
      
      countLetter++;
    }
  };
  
  var buildLetters = function() {
      var keyLetters = 0,
          linkLetter = document.createElement('a'),
          newLinkLetter = '',
          blockLetters = document.getElementById('letters'),
          letters =['a','b','c','d','e','f','g',
                    'h','i','j','k','l','m','n','o',
                    'p','q','r','s','t','u','v','w','x','y','z'];
    
      blockLetters.innerHTML = '';
      linkLetter.setAttribute('href', 'javascript:;');
      linkLetter.setAttribute('class', 'link-letters');
    
      while (keyLetters < letters.length) {
        newLinkLetter = linkLetter.cloneNode();
        newLinkLetter.innerHTML = letters[keyLetters];
        blockLetters.appendChild(newLinkLetter);
        
        keyLetters++;
      }
    
      attachEventsLetters();
  };
  
  var getRandomWord = function() {
      var blockWord = document.getElementById('random-word');
          words = [
            'goat',
            'bonanza',
            'human',
            'pork',
            'earth',
            'moon',
            'pancheta',
            'language',
            'orchestra',
            'cat',
            'finish',
            'tassle',
            'uber'
          ];
    
    blockWord.innerHTML = '';
    newWord = words[parseInt(Math.random() * words.length) + 1];
    buildSpaces(newWord, blockWord);

  };
 
  var buildSpaces = function(word, block) {
    var listWord = document.createElement('ul'),
        pieceWord = document.createElement('li'),
        letterWord = document.createElement('span'),
        newPiece = '',
        newLetter ='',
        markLetter = '',
        keyWord = 0,
        contentWord = [],
        testA = new RegExp("(á|à|ã|â|ä)","gi"),
        testE = new RegExp("(é|è|ê|ë)","gi"),
        testI = new RegExp("(î|í|ì|ï)","gi"),
        testO = new RegExp("(ó|ò|õ|ô|ö)","gi"),
        testU = new RegExp("(ú|ù|û|ü)","gi");
   
    listWord.setAttribute('id', 'list-hide-word');
    
    while(keyWord < word.length) {
      newPiece = pieceWord.cloneNode();
      newLetter = letterWord.cloneNode();

      newLetter.innerHTML = word[keyWord];
      markLetter = word[keyWord];
      
      markLetter = markLetter.match(testA) ? 'a' : markLetter;
      markLetter = markLetter.match(testE) ? 'e' : markLetter;
      markLetter = markLetter.match(testI) ? 'i' : markLetter;
      markLetter = markLetter.match(testO) ? 'o' : markLetter;
      markLetter = markLetter.match(testU) ? 'u' : markLetter;
      
      wordWithoutAccent += markLetter;
      
      newPiece.setAttribute('data-letter', markLetter);
      newPiece.appendChild(newLetter);
      listWord.appendChild(newPiece);
      
      keyWord++;
    } 
    
    block.appendChild(listWord);
  }; 
  
  var init = function() {
    buildLetters();
    getRandomWord();  
  };
  
  return {
    init : function() {
      init();
    }
  }
}());

hangman.init();


//had trouble with onKeyUp just used onClick