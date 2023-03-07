let cells = document.querySelectorAll(".cell");
let score = document.getElementById("Score");
const sign = "X";
const computerSign = "O";
let status = true;
let win = false;
let resultText = document.getElementById("result");
let oldStyle = cells[0].style.backgroundColor;
let scoreX = 0;
let scoreO = 0;
let counter = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

checkCellStatus();

function checkCellStatus(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
}

function checkGameStatus(){
    for (let i = 0; i < winConditions.length; i++){
        if(cells[winConditions[i][0]].textContent == "X" || cells[winConditions[i][0]].textContent == "O"){
            if(cells[winConditions[i][0]].textContent == cells[winConditions[i][1]].textContent && cells[winConditions[i][1]].textContent == cells[winConditions[i][2]].textContent){ 
                cells[winConditions[i][0]].style.backgroundColor = "red";
                cells[winConditions[i][1]].style.backgroundColor = "red";
                cells[winConditions[i][2]].style.backgroundColor = "red";
                if(cells[winConditions[i][0]].textContent == "O"){
                    scoreO += 1;
                    resultText.textContent = "LOSE";
                } else{
                    scoreX += 1;
                    resultText.textContent = "WIN";
                }
                score.textContent = "X: " + scoreX + " O: " + scoreO;
                win = true;
                showInfo();
                return true;
            } 
        }
    }
    return false;
}

function result(){
    if(checkGameStatus()){
        return;
    }
    sleep(400).then(() => {
            if(counter<9){
                highLevel();
                counter++;
            }
            if(counter == 9){
                scoreO += 1;
                scoreX += 1;
                score.textContent = "X: " + scoreX + " O: " + scoreO;
                resultText.textContent = "DRAW";
                showInfo();
            }
            checkGameStatus();
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function lowLevel(){
    let position;
    do{
        position = Math.floor(Math.random() * 8);
    }while(cells[position].textContent != "")

    cells[position].textContent = computerSign;
    cells[position].style.backgroundColor = "transparent";
}

function highLevel(){
    let priorityMove = [1,3,5,7];
    let priorityMove2 = [0,2,6,8];
    priorityMove = priorityMove.sort((a, b) => 0.5 - Math.random());
    priorityMove2 = priorityMove2.sort((a, b) => 0.5 - Math.random());

    for(let i = 0; i < winConditions.length; i++){
        let temp = 0;
        for(let j = 0; j < 3; j++){
            if(cells[winConditions[i][j]].textContent == computerSign){
                temp++;
            }
        } 
        if(temp == 2){
            for(let j = 0; j < 3; j++){
                if(cells[winConditions[i][j]].textContent == ""){
                    cells[winConditions[i][j]].textContent = computerSign;
                    cells[winConditions[i][j]].style.backgroundColor = "transparent";
                    return;
                }
            }
        }
    }

    for(let i = 0; i < winConditions.length; i++){
        let temp = 0;
        for(let j = 0; j < 3; j++){
            if(cells[winConditions[i][j]].textContent == sign){
                temp++;
            }
        } 
        if(temp == 2){
            for(let j = 0; j < 3; j++){
                if(cells[winConditions[i][j]].textContent == ""){
                    cells[winConditions[i][j]].textContent = computerSign;
                    cells[winConditions[i][j]].style.backgroundColor = "transparent";
                    return;
                }
            }
        }
    }

    if(cells[4].textContent == ""){
        cells[4].textContent = computerSign;
        cells[4].style.backgroundColor = "transparent";
        return;
    }

    for(let i = 0; i < winConditions.length; i++){
        let temp = 0;
        let temp2 = 0;
        for(let j = 0; j < 3; j++){
            if(cells[winConditions[i][j]].textContent == computerSign){
                temp++;
            }
            if(cells[winConditions[i][j]].textContent == sign){
                temp2++;
            }
        } 
        if(temp == 1 && temp2 == 0){
            for(let j = 0; j < 3; j++){
                if(cells[winConditions[i][j]].textContent == ""){
                    cells[winConditions[i][j]].textContent = computerSign;
                    cells[winConditions[i][j]].style.backgroundColor = "transparent";
                    return;
                }
            }
        }
    }

    if(cells[4].textContent == sign){
        for (let z = 0; z < 4; z++){
            if(cells[priorityMove2[z]].textContent == ""){
                cells[priorityMove2[z]].textContent = computerSign;
                cells[priorityMove2[z]].style.backgroundColor = "transparent"
                return;
            }
        }
    }

    
    for (let z = 0; z < 4; z++){
        if(cells[priorityMove[z]].textContent == ""){
            cells[priorityMove[z]].textContent = computerSign;
            cells[priorityMove[z]].style.backgroundColor = "transparent"
            return;
        }
    }
    lowLevel();
    
}

function cellClicked(){
    if(!win){
        if(status){
            status = false;
            if(!this.textContent){
                this.textContent = sign;
                this.style.backgroundColor = "transparent";
                counter++;
                result();
            }
            status = true;
        }
    }
}

function showInfo(){
    resultText.style.display = "block";
    sleep(1200).then(() => {
        resultText.style.display = "none";
});


}

function btnReset(){
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.style = oldStyle);
    counter = 0;
    status = true;
    win = false;
}