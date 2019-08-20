$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 3;
var attempts = 0;
var games_played = 0;
var cardClickable = true;
var images = [
    "./assets/images/brian-may.png",
    "./assets/images/black_tele.png",
    "./assets/images/gibson_explorer.png",
    // "./assets/images/gibson_lp.png",
    // "./assets/images/gibson_v.png",
    // "./assets/images/white_strat.png",
    // "./assets/images/yellow_tele.png",
    // "./assets/images/martin_acoustic.png",
    // "./assets/images/schecter_black.png"
];
var guitarRiff = new Audio('./assets/audio/guitar_riff.wav')

var allImages = images.concat(images);
var c_Note = new Audio("./assets/audio/c_note.mp3");
var d_Note = new Audio('./assets/audio/d_note.mp3');
function initializeApp() {
    randomizeCards(allImages);
    appendToDom();
    $('.card').click(handleCardClick);
}
function handleCardClick(event) {
    var spamPrevention = event.target;
    if ($(spamPrevention).hasClass('cardFront') || cardClickable === false) {
        return;
    }
    // if (cardClickable === false) {
    //     return
    // }
    // $(event.currentTarget).find('.cardBack').addClass('hidden');
    $(event.currentTarget).find('.cardBack').fadeOut(500);

    if (firstCardClicked === null) {
        firstCardClicked = event.currentTarget;
    } else {
        // cardClickable = false;
        secondCardClicked = event.currentTarget;
        checkForMatch(firstCardClicked, secondCardClicked);
        firstCardClicked = null;
        secondCardClicked = null;
        displayStats();
    }
}
function appendToDom() {
    // var config_object = {
    //     'noteName':
    // }
    for(var i = 0; i < allImages.length; i++) {
        var newCardContainer = $('<div>').addClass('cardContainer');
        var newCard = $('<div>').addClass('card');
        var cardFront = $('<div>').addClass('cardFront').css('background-image', "url(" +allImages[i]+ ")");
        var cardBack = $('<div>').addClass('cardBack');
        // var cardExample = $("<div>",config_object)

        // )
        // var cardImage = cardFront.
        // cardFront.append(cardImage);
        // newCard.append(cardFront);
        newCard.append(cardFront,cardBack);
        newCardContainer.append(newCard);
        $('.playArea').append(newCardContainer);
    }
}

function checkForMatch(firstCardClicked, secondCardClicked) {
    var firstImg = $(firstCardClicked).find('.cardFront').css("background-image");
    var secondImg = $(secondCardClicked).find('.cardFront').css("background-image");
    attempts++;
    cardClickable = false;
    if (firstImg === secondImg) {
        matches++;
        cardClickable = true;
        // var original = firstImg.substring(55,60);
        // var imageIndex = images[0].substring(16,21);
        // switch (original) {
        //     case images[0].substring(16,21):
        //         c_Note.play();
        //         break;
        //     case images[1].substring(16,21):
        //         d_Note.play();
        //     default:
        //         break;
        // }
        if (matches === max_matches) {
            games_played++;
            $(".winningModal").removeClass('hidden');
            $('button').on('click', resetStats);
            guitarRiff.play();
        }
    } else {
        setTimeout(function () {
            $(firstCardClicked).find(".cardBack").fadeIn(100);
            $(secondCardClicked).find(".cardBack").fadeIn(100);
            // $(firstCardClicked).find(".cardBack").removeClass("hidden");
            // $(secondCardClicked).find(".cardBack").removeClass("hidden");
            cardClickable = true;
        }, 1500);
    }
}

function calculateAccuracy() {
    return Math.round(matches/attempts * 100);
}
function randomizeCards(allImages) {
    for (var i = allImages.length - 1; i >=0; i--) {
        var randomNumber = Math.floor(Math.random() * (i + 1));
        var newImage = allImages[randomNumber];
        allImages[randomNumber] = allImages[i];
        allImages[i] = newImage;
    }
}
function displayStats() {
    $(".gamesPlayed").text(games_played);
    $(".attempts").text(attempts);
    $('.accuracy').text(calculateAccuracy() + "%");
    $(".totalMatches").text(matches);
}

function resetStats() {
    matches = 0;
    attempts = 0;
    displayStats();
    $(".cardBack").fadeIn();
    $(".accuracy").text("0%");
    $(".winningModal").addClass("hidden");
    $(".cardContainer").remove();
    initializeApp();
}
