function rgbGenerator() {
    const randomNumbers = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
    ];
    const rgbValue = `(${randomNumbers[0]}, ${randomNumbers[1]}, ${randomNumbers[2]})`;
    return rgbValue;
}
const container = document.getElementById("container");

const squares = container.children;
console.log(squares);

let mode = "hard";

let attemps = 3;
const attempsLeft = document.getElementById("message");
let colorToGuess;

function cleanUpListeners() {
    for (let square of squares) {
        square.removeEventListener("click", squareClick);
    }
}

function displaySquareColors() {
    for (let square of squares) {
        square.textContent = square.style.backgroundColor;
        square.style.textAlign = "center";
    }
}

function DoNotDisplaySquareColors() {
    for (let square of squares) {
        square.textContent = "";
    }
}

function squareClick(event) {
    attemps--;
    // Überprüft, ob background Color des angeklickten Quadrats gleich colorToGuess ist
    if (event.target.style.backgroundColor === colorToGuess) {
        console.log("You won!", event.target.style.backgroundColor);
        attempsLeft.innerHTML = "You won!";
        cleanUpListeners();
        // Entfernt Event-Listener von den Quadraten, um das Spiel zu beenden
        displaySquareColors();
    } else {
        console.log(
            `You have ${attemps} attemps left, colorToGuess: ${colorToGuess}, this ist ${event.target.style.backgroundColor}`
        );
        attempsLeft.innerHTML = `${"💛".repeat(attemps)}`;
    }
    if (attemps === 0 && event.target.style.backgroundColor !== colorToGuess) {
        console.log("Game over");
        attempsLeft.innerHTML = "Game over 💔";
        cleanUpListeners();
        displaySquareColors(); // Zeigt die Farben der Quadrate an
    }
}

function startGame() {
    DoNotDisplaySquareColors();
    const squareToGuess = squares[Math.floor(Math.random() * 6)];

    attemps = 3;
    attempsLeft.innerHTML = `${"💛".repeat(attemps)}`;

    for (let square of squares) {
        square.style.backgroundColor = `rgb${rgbGenerator()}`;
        square.addEventListener("click", squareClick);
    }

    colorToGuess = squareToGuess.style.backgroundColor;
    const h1Element = document.querySelector("#color-display");
    h1Element.innerText = `${colorToGuess}`;
}

const newColorsButton = document.querySelector("#reset");
newColorsButton.addEventListener("click", startGame);

document.addEventListener("DOMContentLoaded", () => {
    console.log("111");
    startGame();
});

// changing mode part

const modeButtons = document.querySelectorAll(".mode");
console.log(modeButtons);

modeButtons.forEach((button) => button.addEventListener("click", modeHandler));

function modeHandler() {
    modeButtons.forEach((button) => {
        button.classList.toggle("selected");
    });
    if (modeButtons[0].classList.contains("selected")) {
        mode = "easy";
        console.log(mode);
        const squaresAll = document.querySelectorAll(".square");
        squaresAll.forEach((child, index) => {
            if (index > 2) {
                container.removeChild(child);
            }
        });
    } else {
        mode = "hard";
        console.log(mode);
        const newSquares = [
            document.createElement("div"),
            document.createElement("div"),
            document.createElement("div"),
        ];
        newSquares.forEach((child) => {
            container.appendChild(document.createElement("div"));
        });
        const squaresAll = document.querySelectorAll("#container div");
        squaresAll.forEach((child) => {
            console.log(child);
            if (!child.classList.contains("square")) {
                child.classList.add("square");
            }

            child.style.backgroundColor = `rgb${rgbGenerator()}`;
        });
    }
}

// zur startGame Funktion
if (mode === "hard") {
    squareToGuess = squares[Math.floor(Math.random() * 6)];
} else {
    squareToGuess = squares[Math.floor(Math.random() * 3)];
}
