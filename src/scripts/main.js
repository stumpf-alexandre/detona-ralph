//gerenciamento de variaveis globais
const state = {
    //as views altera alguma coisa visual
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    //as values altera um valor com calculos por baixo dos panos
    values: {
        //timerId: null,
        //gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 6,
        curretLife: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),//move o inimigo do quadrado a cada x segundos
        countDownTimeId: setInterval(countDown, 1000),//chama a função countDown a cada 1 segundo
    }
};

function countDown() {
    state.values.curretTime--;//decrementando o #time-left
    state.view.timeLeft.textContent = state.values.curretTime;//mostra o tempo sendo decrementado
    if (state.values.curretTime === 0) {//quando o tempo chegar a zero
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        location.reload();
    }
}

function playSound(audioName) {
    let audio = new Audio(`../audios/{audioName}.m4a`);
    audio.volume = 0.5;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");//remove a classe enemy de qualquer quadrado
    });

    let randomNumber = Math.floor(Math.random() * 9);//cria um numero aleatório de 1 a 9
    let randomSquare = state.view.squares[randomNumber];//pegar um quadrado aleatório pelo numero aleatório criado
    randomSquare.classList.add("enemy");//acrescenta a imagem do inimigo ao quadrado aleatóriamente
    state.values.hitPosition = randomSquare.id;//quarda o id do quadrado aleatório
}

//function moveEnemy() {
//    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);//move o inimigo do quadrado a cada x segundos
//}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {//fica ouvindo quando eu precionar o mouse
            if (square.id === state.values.hitPosition) {//compara o id do quadrado onde o inimigo está com o quadrado que eu cliquei
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
            else {
                state.values.curretLife--;//decrementando o #life
                state.view.life.textContent = state.values.curretLife;
                if (state.values.curretLife === 0) {
                    clearInterval(state.actions.countDownTimeId);
                    clearInterval(state.actions.timerId);
                    alert("Game Over! O seu resultado foi: " + state.values.result);
                    location.reload();
                }
            }
        });
    });
}

function init() {
    //moveEnemy();
    addListenerHitBox();
}

init()