const questions=[
    {
       question: "what is the colour of apple?",
       answers:[
        {text:"Green",correct:"false"},
        {text:"Orange",correct:"false"},
        {text:"Red",correct:"true"},
        {text:"Yellow",correct:"false"}
       ]
    },
    {
        question: "when is the independence day?",
        answers:[
         {text:"13th August",correct:"false"},
         {text:"14th August",correct:"false"},
         {text:"15th August",correct:"true"},
         {text:"16th August",correct:"false"}
        ]
    },
    {
        question: "which is the largest animal in the world?",
        answers:[
         {text:"Bluewhale",correct:"true"},
         {text:"Shark",correct:"false"},
         {text:"Elephant",correct:"false"},
         {text:"Giraffe",correct:"false"}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextBtn=document.getElementById("next-btn");

let currIndex=0;
let score=0;
function startQuiz(){
    currIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currQuestion=questions[currIndex];
    let questionNo=currIndex+1;
    questionElement.innerHTML=questionNo+". "+currQuestion.question;

    currQuestion.answers.forEach(answer =>{
       const button=document.createElement("button");
       button.innerHTML=answer.text;
       button.classList.add("button");
       answerButton.appendChild(button);  
       if(answer.correct){
        button.dataset.correct=answer.correct;
       } 
       button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextBtn.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextBtn.style.display="block";
}
function showScore(){
     resetState();
     questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
     nextBtn.innerHTML="Play Again";
     nextBtn.style.display="block";
}
function handleNextBtn(){
    currIndex++;
    if(currIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click",()=>{
    if(currIndex<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})
startQuiz();
