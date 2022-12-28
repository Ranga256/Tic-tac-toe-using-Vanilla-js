const selectBox = document.querySelector(".select-box"),
selectXbtn = selectBox.querySelector(".playerX"),
selectObtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button")

window.onload = ()=>{
    for(let i=0;i<allBox.length;i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    selectXbtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectObtn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players active player");
    }
}

let playerXicon = "fa fa-times";
let playerOicon = "fa fa-circle-thin";
let playerSign = "X";
let runBot = true;

function clickedBox(element){
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOicon}"></i>`;
        players.classList.add("active");
        playerSign="O";
        element.setAttribute("id",playerSign);
    }else{
        element.innerHTML = `<i class="${playerXicon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    let randomDelay = ((Math.random()*1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomDelay);
}


function bot(runBot){
    if(runBot){
    playerSign = "O";
    let array=[];
    for(let i=0;i<allBox.length;i++){
        if(allBox[i].childElementCount == 0){
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length>0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class="${playerXicon}"></i>`;
            players.classList.remove("active");
            playerSign = "X";
            allBox[randomBox].setAttribute("id",playerSign);
        }else{
            allBox[randomBox].innerHTML = `<i class="${playerOicon}"></i>`;
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",playerSign);
        }
        selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playerSign = "X";
}
}

function getClass(idName){
    return document.querySelector(".box" + idName).id;
}

function checkId(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3)== sign){
        return true;
    }
}

function selectWinner(){
    if(checkId(1,2,3, playerSign) || checkId(4,5,6, playerSign) || checkId(7,8,9, playerSign) ||
    checkId(1,4,7, playerSign) || checkId(2,5,8, playerSign) || checkId(3,6,9, playerSign) || checkId(1,5,9, playerSign) || checkId(3,5,7, playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700)
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game`;
    }else{
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700)
        wonText.innerHTML = `Match Tied`;
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}