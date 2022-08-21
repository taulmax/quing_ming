let startTime = 0;
let clickTime = 0;

const setReactionInit = () => {
    startTime = 0;
    clickTime = 0;
    const startState = document.getElementById("start_state");
    const readyState = document.getElementById("ready_state");
    const clickState = document.getElementById("click_state");
    const failureState = document.getElementById("failure_state");
    const successState = document.getElementById("success_state");
    startState.style.display = "flex";
    readyState.style.display = "none";
    clickState.style.display = "none";
    failureState.style.display = "none";
    successState.style.display = "none";
}

// 클릭하면 시작
const startStateTest = () => {
    const startState = document.getElementById("start_state");
    const readyState = document.getElementById("ready_state");
    const clickState = document.getElementById("click_state");
    const failureState = document.getElementById("failure_state");
    const successState = document.getElementById("success_state");
    startState.style.display = "none";
    readyState.style.display = "flex";
    clickState.style.display = "none";
    failureState.style.display = "none";
    successState.style.display = "none";
    const randomSec = getRandSec();
    console.log(randomSec);
    setTimeout(() => {
        const failureState = document.getElementById("failure_state");
        if (!failureState.style.display || failureState.style.display === "none") {
            const startState = document.getElementById("start_state");
            const readyState = document.getElementById("ready_state");
            const clickState = document.getElementById("click_state");
            const failureState = document.getElementById("failure_state");
            const successState = document.getElementById("success_state");
            startState.style.display = "none";
            readyState.style.display = "none";
            clickState.style.display = "flex";
            failureState.style.display = "none";
            successState.style.display = "none";
            startTime = new Date();
        }
    }, randomSec * 1000);
}

// 랜덤 시간
function getRandSec(){
    const random = Math.floor(Math.random() * 10);
    if (random < 2) {
        return random + 2;
    }
    return random;
}

const readyStateTest = () => {
    const startState = document.getElementById("start_state");
    const readyState = document.getElementById("ready_state");
    const clickState = document.getElementById("click_state");
    const failureState = document.getElementById("failure_state");
    const successState = document.getElementById("success_state");
    startState.style.display = "none";
    readyState.style.display = "none";
    clickState.style.display = "none";
    failureState.style.display = "flex";
    successState.style.display = "none";
}

const clickStateTest = () => {
    const startState = document.getElementById("start_state");
    const readyState = document.getElementById("ready_state");
    const clickState = document.getElementById("click_state");
    const failureState = document.getElementById("failure_state");
    const successState = document.getElementById("success_state");
    startState.style.display = "none";
    readyState.style.display = "none";
    clickState.style.display = "none";
    failureState.style.display = "none";
    successState.style.display = "flex";
    clickTime = new Date();

    const reactionMs = document.getElementById("reaction_ms");
    const myTime = clickTime - startTime;
    reactionMs.innerHTML = `${myTime}ms`;
    const normDist = new NormalDistribution(284, 85);
    const cdf = normDist.cdf(myTime);
    
    const reactionRank = document.getElementById("reaction_rank");
    const reactionPer = document.getElementById("reaction_percentage");
    reactionPer.innerHTML = `상위 ${Math.floor(cdf * 100)}%`;
}

const failureStateTest = () => {
    const startState = document.getElementById("start_state");
    const readyState = document.getElementById("ready_state");
    const clickState = document.getElementById("click_state");
    const failureState = document.getElementById("failure_state");
    const successState = document.getElementById("success_state");
    startState.style.display = "flex";
    readyState.style.display = "none";
    clickState.style.display = "none";
    failureState.style.display = "none";
    successState.style.display = "none";
}

const successStateTest = () => {
    const startState = document.getElementById("start_state");
    const readyState = document.getElementById("ready_state");
    const clickState = document.getElementById("click_state");
    const failureState = document.getElementById("failure_state");
    const successState = document.getElementById("success_state");
    startState.style.display = "flex";
    readyState.style.display = "none";
    clickState.style.display = "none";
    failureState.style.display = "none";
    successState.style.display = "none";
}