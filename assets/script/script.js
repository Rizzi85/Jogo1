const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#tempo"),
        score: document.querySelector("#pontos"),
    },
    values:{
        Enemyvelocity:500,
        hitPosition:0,
        result: 0,
        tempo: 60,
        
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
    state.values.tempo--;
    state.view.time.textContent = state.values.tempo;
    if(state.values.tempo<=0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }

}
function playSound() {
    let audio = new Audio('../audio/src_audios_hit.m4a');
    audio.volume = 0.8;
    audio.play();
  }

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.Enemyvelocity);
}
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",()=>{
         if(square.id===state.values.hitPosition){
            state.values.result++
            state.view.score.textContent=state.values.result;
            state.values.hitPosition = null;
            playSound();
         }
        })
    });
    
} 

function init(){
moveEnemy();
addListenerHitBox();
countDown()
}
init()