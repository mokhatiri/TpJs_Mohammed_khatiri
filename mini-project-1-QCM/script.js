var count;

var Answers = [];

var Difficulty = [];
var Category = [];
var type = [];

var testend = false; // to know the test ended


// when the DOM content is loaded first:
document.addEventListener("DOMContentLoaded", function() {

    // start quiz
    document.getElementById("start_button").addEventListener("click", async function(){
        document.getElementById("generator").style.display = "none"

        // load the info and wait for that
        await load_info()

        // load the first timer
        time_update(0)
    })
})


// to load the info from the api
async function load_info() {
    // Show loading animation
    document.getElementById("loading").style.display = "block";

    // start by getting the info from the api
    // the base url is: https://opentdb.com/api.php

    // the number of questions is in the input with id="number_of_questions"
    if (document.getElementById("random_number_of_questions").checked) {
        count = Math.floor(Math.random() * 50) + 1; // generate a random number between 1 and 50
    }else{
        count = parseInt(document.getElementById("number_of_questions").value, 10); // parse the value to an integer
    }

    // the category is in the select with id="category"
    let category = document.getElementById("category").value;
    // the difficulty is in the select with id="difficulty"
    let difficulty = document.getElementById("difficulty").value;
    // the type is in the select with id="type"
    let type = document.getElementById("type").value;
    // the url is the base url + number of questions + category + diffucilty + type
    let url = "https://opentdb.com/api.php?amount=" + count;
    // if the category is not "any"
    if (category != "any") {
        url += "&category=" + category;
    }
    // if the difficulty is not "any"
    if (difficulty != "any") {
        url += "&difficulty=" + difficulty;
    }
    // if the type is not "any"
    if (type != "any") {
        url += "&type=" + type;
    }

    try {
        let response = await fetch(url);
        let data = await response.json();

        // Hide loading animation
        document.getElementById("loading").style.display = "none";
        console.log(url);

        if (data.response_code !== 0) {
            alert("Error loading questions.");
            return;
        }

        // Display the quiz
        document.getElementById("quiz").style.display = "block";
        
        // Process and display questions...
        processQuizData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load quiz data.");
        document.getElementById("loading").style.display = "none"; // Hide loader on error
    }
}

function processQuizData(data) {
    
    // display the data
        /* this is the general format of the data
        <div class="question" id="question_k">
            <div id="question_header">
                <div>Type: ${the type}</div> <div>|</div>
                <div>Difficulty: ${the difficulty}</div> <div>|</div>
                <div>Category: ${the category}</div>
            </div>
            <div id="question_content">${the question}</div>
            <div id="question_answers">
                <div id="answers_0">
                    <input type="radio" name="answer_0" value="{the first answer}">${the first answer}
                    ...
                    <input type="radio" name="answer_n" value="{last answer}">${the last answer}
                </div>
            </div>
            <button id="submit_k" class="submit_button" onclick="time_update(k+1)">next</button>
        </div>
        */
    // for reference every question other then the 1st one id set to style.display = "none"

    // loop through the questions using the already known number of questions count // the only surely known variable
    for(let i = 0; i < count; i++) {
        
        // get the question
        let question = data["results"][i]["question"];
        // get the answers
        let answers = data["results"][i]["incorrect_answers"];
        // add the correct answer
        answers.push(data["results"][i]["correct_answer"]);
        Answers.push(`${data["results"][i]["correct_answer"]}`);// push the correct answer to the array to be compared later
        // shuffle the answers
        answers.sort(() => Math.random() - 0.5); // randomize the order of the answers

        // get the type
        let type = data["results"][i]["type"];
        // get the difficulty
        let difficulty = data["results"][i]["difficulty"];
        // give every diffucilty a score
        if (difficulty == "easy") {
            Difficulty.push(1);
        }
        else if (difficulty == "medium") {
            Difficulty.push(2);
        }
        else if (difficulty == "hard") {
            Difficulty.push(3);
        }
        // get the category
        let category = data["results"][i]["category"];

        // create the answers divs
        let answers_div = "";
        for (let j = 0; j < answers.length; j++) {
            answers_div += "<div id='answer_" + j + "'>";
            answers_div += "<input type='radio' name='answer_" + i + "' value='" + answers[j] + "'>" + answers[j];
            answers_div += "</div>";
        }

        // create the question div
        let question_div = "<div class='question' id='question_" + i + "'>";

        question_div += "<div id='question_header'>";
        question_div += "<div>Type: " + type + "</div>";
        question_div += "<div>|</div>"
        if (difficulty == "easy") {
            question_div += "<div style='color: green;'>Difficulty: " + difficulty + "</div>";
        }
        else if (difficulty == "medium") {
            question_div += "<div style='color: orange;'>Difficulty: " + difficulty + "</div>";
        }
        else if (difficulty == "hard") {
            question_div += "<div style='color: red;'>Difficulty: " + difficulty + "</div>";
        }
        question_div += "<div>|</div>"

        question_div += "<div>Category: " + category + "</div>";
        question_div += "<div>|</div>";

        // give each question a score depending on the difficulty
        if (difficulty == "easy") {
            question_div += "<div style='color: grey;'>Score: 1</div>";
        }
        else if (difficulty == "medium") {
            question_div += "<div style='color: green;'>Score: 2</div>";
        }
        else if (difficulty == "hard") {
            question_div += "<div style='color: yellow;'>Score: 3</div>";
        }

        question_div += "</div>";
        question_div += "<div id='question_content'>" + question + "</div>";
        question_div += "<div id='question_answers'>" + answers_div + "</div>";
        // if it's the last question, add a submit button
        if (i != count - 1){
            question_div += "<button id='submit_" + i + "' class='submit_button' onclick='endtest()'>next</button>";
        }else{
            question_div += "<button id='submit_" + i + "' class='submit_button' onclick='endtest()'>submit</button>";
        }
        question_div += "</div>";

        // add the question div to the page
        document.getElementById("questions_container").innerHTML += question_div;

        // set the display of the question div to none if it is not the first question
        if(i != 0){
            document.getElementById("question_" + i).style.display = "none";
        }
    }

    // display the main div
    document.getElementById("quiz").style.display = "block";
    // set the info of the test in the #main_header
    document.getElementById("main_header").innerHTML = "Quiz - " + count + " questions";
}

// to end the current test
function endtest() {
    document.getElementById("Ftimer").style.filter = "blur(25px)";
    testend = true;
}

// function to update the time
function time_update(k) {
    testend = false;
    console.log("k : "+ k)

    var time = 0; // once called starts at 0
    var max_time = Difficulty[k] * 20; // the original time is 10 seconds but if the difficulty is 2, the time will be 20 seconds ..etc

    // set the max_time span
    // check the max_time is not NAN
    if(!isNaN(max_time)){
        document.getElementById("max_time").innerHTML = max_time;
    }else{console.log("max_time is NAN"+ "iteration: "+ k);}
    if(!isNaN(time)){
        document.getElementById("timer").innerHTML = time;
    }

    document.getElementById("Ftimer").style.filter = "none";

    // waiting for a second = 1000ms
    var x = setInterval(function() {
        // incrementing the time
        time++; 
        
        // displaying the time
        document.getElementById("timer").innerHTML = time;

        // check the time
        if(time >= max_time || testend) {
            // stop the timer
            clearInterval(x);

            // hide the current question
            let prev_question = document.getElementById(`question_${k}`)
            prev_question.style.filter = "blur(5px)";
            prev_question.style.pointerEvents = "none";
            prev_question.style.cursor = "not-allowed" 

            //turn on the next test if it exists
            if(k<count-1){    
                document.getElementById(`question_${k+1}`).style.display = "block";
                document.getElementById(`question_${k+1}`).scrollIntoView({behavior: "smooth"});
                time_update(k+1);
            } else {
                // if it's the last question, show the results
                show_results();
            }
        }
    },1000)
}

function show_results(){
    // hide the timer
    document.getElementById("Ftimer").style.display = "none";

    // reshow all the questions of class ="question"
    let questions = document.getElementsByClassName("question")
    for(let i = 0; i < questions.length; i++){
        questions[i].style.filter = "none";
    }


    // set the color of the main to grey and prevent any changes to the page
    document.getElementById("quiz").style.color = "grey";
    document.getElementById("quiz").style.pointerEvents = "none";

    // display the score
    result();

    // scroll after showing the result_container div
    document.getElementById("result_container").style.display = "block";
    document.getElementById("result_container").scrollIntoView({behavior: "smooth"}); // with a smooth behaviour

    // show the retry button
    document.getElementById("retry").style.display = "flex";
}

function result() {
    let score = 0;
    let total_score = 0;
    let total_possible_score = 0;

    // Loop through the questions
    for (let i = 0; i < count; i++) {
        let answers = document.getElementsByName("answer_" + i);
        let correct = true;

        // get the value of the name of the radio button
        let query_answer = document.querySelector(`input[name="answer_${i}"]:checked`);
        
        if (!query_answer || (query_answer && query_answer.value != Answers[i])) {
            correct = false;
        }

        total_possible_score += Difficulty[i];
        // Highlight the question based on correctness
        if (correct) {
            console.log("Correct answer: " + Answers[i]);
            document.getElementById("question_" + i).style.backgroundColor = "lightgreen";
            // upgrade the score
            total_score++;
            score += Difficulty[i];
        } else {
            document.getElementById("question_" + i).style.backgroundColor = "red";
        }
    }

    
    // Display the results
    document.getElementById("result_container").innerHTML = `
        <h2>Quiz Results</h2>
        <p>Total Correct Answers: ${total_score} out of ${count}</p>
        <p>Total Score (based on difficulty): ${score} out of ${total_possible_score}</p>
    `;

    let percentage = score / total_possible_score * 100;
    // set the color of the result container depending on the score depending on the percentage
    if (percentage >= 75) {
        document.getElementById("result_container").style.background = `linear-gradient(90deg,rgba(0, 255, 0, 0.2) ${percentage}%,rgba(255, 255, 255, 0) ${percentage}%)`;
    } else if (percentage >= 50) {
        document.getElementById("result_container").style.background = `linear-gradient(90deg,rgba(255, 255, 0, 0.2) ${percentage}%,rgba(255, 255, 255, 0) ${percentage}%)`;
    } else {
        document.getElementById("result_container").style.background = `linear-gradient(90deg,rgba(255, 0, 0, 0.2) ${percentage}%,rgba(255, 255, 255, 0) ${percentage}%)`;
    }
}