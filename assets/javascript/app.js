$(document).ready(function () {
    var options = [
        {
            question: "Wat is the longest river in Germany?", 
            choice: ["Danube", "Inn", "Rhine", "Moselle"],
            answer: 2,
            photo: "assets/images/fluss.jpeg"
         },
         {
            question: "How many people does Germany count?", 
            choice: ["39 Million", "112 Million", "51 Million", "83 Million"],
            answer: 3,
            photo: "assets/images/menschenmenge.jpg"
         },
         {
            question: "Wat is the name for a mountain in the german Alps?", 
            choice: ["Sleeping Cat", "Gentle Giant", "Bad B*****", "Sun Circle"],
            answer: 2,
            photo: "assets/images/berge.jpg"
         },
         {
            question: "How many states does Germany have?", 
            choice: ["19", "23", "16", "32"],
            answer: 2,
            photo: "assets/images/bundesländer.jpg"
         }, 
         {
            question: "What are the three colours of the German flag (from top to bottom)??", 
            choice: ["Red-black-gold", "Black-red-gold", "Gold-red-Blue", "Blue-white-red" ],
            answer: 1,
            photo: "assets/images/flagge.jpg"
        }, 
        {
            question: "What is the capital city of Germany?", 
            choice: ["Cologne", "Hamburg", "Frankfurt", "Berlin" ],
            answer: 3,
            photo: "assets/images/berlin.jpg"
        }, 
        {
            question: "How many countries border to Germany?", 
            choice: ["6", "4", "9", "7" ],
            answer: 2,
            photo: "assets/images/grenzen.jpg"
        }, 
        {
            question: "How many different kind of beers does Germany brew?", 
            choice: ["7500", "150", "430", "5000" ],
            answer: 3,
            photo: "assets/images/bier.jpg"
        }, 
        {
            question: "What is the most consumed food in Germany?", 
            choice: ["Meat", "Potatoes", "Noodles", "Vegetables" ],
            answer: 0,
            photo: "assets/images/fleisch.jpg"
        }, 
        {
            question: "How is a traditional outfit called for women in Bavaria?", 
            choice: ["Strickjackerl", "Gummistiefel", "Lederhos'n", "Dirndl" ],
            answer: 3,
            photo: "assets/images/dirndl.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();

    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })

    //timer starts
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer counts down from 20
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop the timer if it reaches 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stops
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //pick a new question randomly if not shown yet 
    //display question, loop through and display possible answers
    function displayQuestion() {

        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            //continue to loop through questions until one is chosen that is not shown in this game yet
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);

                //assign array position to it so it can check answer that the user chose
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
   
    }
    
    //click function to select an answer and outcomes
    $(".answerchoice").on("click", function () {

        //grab array position (answer) from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //outcomes right or wrong
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the final screen if all questions answered and show the score
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })