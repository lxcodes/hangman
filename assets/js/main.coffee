#= require vendor/jquery

class Utils
  printAlpha: (alpha) ->
    alphaContainer = $('.alpha-container')
    console.log alpha
    $.each alpha, (i, e) ->
      button = $('<a/>').addClass('alphaBtn').text(e)
      alphaContainer.append(button)
  printWord: (word) ->
    wordContainer = $('.word-container')

    $.each word, (i, e) ->
      letterDiv = $('<div/>')
      letterDiv.css
        'border-bottom':'1px solid black',
        'margin':'0 7px',
        'display':'inline-block'
      letter = $('<span/>').text(e).css('visibility', 'hidden')
      letterDiv.append(letter)
      wordContainer.append(letterDiv)

class App
  alphabet: "A B C D E F G H I J K L M N O P Q R S T U V Q X Y Z"
  constructor: () ->
    @alphabet_split = @alphabet.split(' ')
    @word = ""
    @utils = new Utils

  start: () ->
    console.log "Grabbing new word..."
    self = @
    utils = @utils
    $.get '/getword', (data) =>
      console.log "New word: #{data}"
      @word = data.split('')

      @utils.printAlpha(@alphabet_split)
      @utils.printWord(@word)

      @.run()

  run: () ->
    guesses = 0
    wrongGuesses = 1

    $('.alphaBtn').on 'click', (e) =>
      guesses = guesses + 1
      letterElement = $(e.currentTarget)
      letter = letterElement.text()
      lowerLetter = letter.toLowerCase()

      console.log "You clicked the letter: #{letter}. Determining if it is correct..."

      if @word.indexOf(lowerLetter) != -1
        $(".word-container span:contains('#{lowerLetter}')").each (i, e) ->
          console.log 'CORRECT GUESS! Showing letter(s).'
          $(e).css('visibility':'visible')
          letterElement.off 'click'
          letterElement.css 'text-decoration', 'line-through'
      else
        console.log "Incorrect guess!"
        wrongGuesses = wrongGuesses + 1
        console.log "You now have #{wrongGuesses - 1} incorrect guesses."

$ ->
  app = new App

  $('.game-start').on 'click', (e) ->
    e.preventDefault
    console.log 'Starting Game...'
    $(this).off 'click'
    app.start()


