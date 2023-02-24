let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning pattern array
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//Player 'X' plays first
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
        
    
};

//enable all buttons
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.disabled = false;
        element.innerText = "";
    });
    //disable popup
    popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if(letter === "X") {
        msgRef.innerHTML = "&#x1F389; <br> Player X wins!";
        
    }
    else{
        msgRef.innerHTML = "&#x1F389; <br> Player O wins!";
    }
};

//function for draw
const drawFuction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a draw!";
};
//new game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    
})




//win logic
const winChecker = () => {
    //loop through all win patterns
    for(let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //check if all elements are filled
        //if 3 empty elements are similar and would give a win
        if(element1 != "" && element2 != "" && element3 != ""){
            if(element1 == element2 && element2 == element3){
                //if all 3 buttons have same value then pass the value to win function
                winFunction(element1);
            }
        }
    }
}

//Display X/O onclick
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            element.innerHTML = "X";
            
            element.disabled = true;
        } else {
            xTurn = true;
            element.innerHTML = "O";
            
            element.disabled = true;
        }
        //Increment count on each click
        count+=1;
        if(count==9){
            //assume it's a draw
            drawFuction();
        }
        //check for win on each click
        winChecker();
    });
});
//enable buttons and disable popup on page load
window.onload = enableButtons();
