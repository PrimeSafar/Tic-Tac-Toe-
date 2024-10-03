const TicTacToeGame = (function(){
    let round = 1;
    let ScoreForPlayer1 = 0;
    let ScoreForPlayer2 = 0;
    let IsNext = true;
    let board = ["", "", "", "", "", "", "", "", ""];

    const Container = document.querySelector(".Container");
    const ClickToStart = document.querySelector(".ClickToStart");
    const dialog = document.querySelector("#dialog");
    const startButton = document.querySelector("#startButton");
    const cancelButton = document.querySelector("#cancelButton");
    const ShowWin = document.querySelector(".ShowWin");
    const showWinTitle = document.querySelector("#showWinTitle");
    const showWinText = document.querySelector("#showWinText");
    const playAgainButton = document.querySelector("#playAgainButton");

    const ShowDraw = document.querySelector(".ShowDraw");
    const showDrawTitle = document.querySelector("#showDrawTitle");
    const showDrawText = document.querySelector("#showDrawText");
    const playAgainDrawButton = document.querySelector("#playAgainDrawButton");

    const cells = document.querySelectorAll(".cell");

    function startGame() {
        document.querySelector(".Board").style.display = "flex";
        ClickToStart.remove();
        
        const InputPlayer1 = document.querySelector("#InputPlayer1");
        const InputPlayer2 = document.querySelector("#InputPlayer2");

        const Player1Name = document.createElement("div");
        Player1Name.classList.add("Player1Name");
        Player1Name.textContent = `Player1: ${InputPlayer1.value}`;

        const Player2Name = document.createElement("div");
        Player2Name.classList.add("Player2Name");
        Player2Name.textContent = `Player2: ${InputPlayer2.value}`;

        const Round = document.createElement("div");
        Round.classList.add("Round");
        Round.textContent = `Round ${round}`;

        const DivList = document.createElement("div");
        DivList.classList.add("DivList");
        Container.appendChild(DivList);
        DivList.appendChild(Player1Name);
        DivList.appendChild(Player2Name);
        DivList.appendChild(Round);

        const reset = document.createElement("button");
        reset.classList.add("reset");
        reset.textContent = "Reset";
        reset.addEventListener("click", resetGame);

        const DivREs = document.createElement("div");
        DivREs.classList.add("DivREs");
        Container.appendChild(DivREs);

        const ScoreForHuman1 = document.createElement("div");
        ScoreForHuman1.classList.add("ScoreForPlayer11");
        ScoreForHuman1.textContent = `${InputPlayer1.value} Score: ${ScoreForPlayer1}`;

        const ScoreForHuman2 = document.createElement("div");
        ScoreForHuman2.classList.add("ScoreForPlayer22");
        ScoreForHuman2.textContent = `${InputPlayer2.value} Score: ${ScoreForPlayer2}`;

        DivREs.appendChild(ScoreForHuman1);
        DivREs.appendChild(ScoreForHuman2);
        DivREs.appendChild(reset);


        cells.forEach((cell, index) => {
            cell.addEventListener("click", function() {
                handleCellClick(cell, index, InputPlayer1.value, InputPlayer2.value, ScoreForHuman1, ScoreForHuman2);
            });
        });
    }

    function handleCellClick(cell, index, Player1Name, Player2Name, ScoreForHuman1, ScoreForHuman2) {
        if (board[index] === "") {
            let CurrentPlayer = IsNext ? "X" : "O";
            board[index] = CurrentPlayer;
            cell.textContent = CurrentPlayer;
            IsNext = !IsNext;
            checkWin(Player1Name, Player2Name, ScoreForHuman1, ScoreForHuman2);
        }
    }

    function checkWin(Player1Name, Player2Name, ScoreForHuman1, ScoreForHuman2) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                let winner = board[a] === "X" ? Player1Name : Player2Name;
                showWinDialog(winner);
                
                if (winner === Player1Name) {
                    ScoreForPlayer1++;
                    ScoreForHuman1.textContent = `${Player1Name} Score: ${ScoreForPlayer1}`;
                } else {
                    ScoreForPlayer2++;
                    ScoreForHuman2.textContent = `${Player2Name} Score: ${ScoreForPlayer2}`;
                }

                round++;
                document.querySelector(".Round").textContent = `Round ${round}`;
                return;
            }
        }

        // Check for draw
        if (!board.includes("")) {
            showDrawDialog();
            round++;
            document.querySelector(".Round").textContent = `Round ${round}`;
        }
    }

    function showWinDialog(winner) {
        showWinTitle.textContent = "Game Over!";
        showWinText.textContent = `${winner} wins!`;
        ShowWin.showModal();
    }

    function showDrawDialog() {
        showDrawTitle.textContent = "Game Over!";
        showDrawText.textContent = "It's a draw!";
        ShowDraw.showModal();
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        round = 1;
        document.querySelector(".Round").textContent = `Round ${round}`;
        ScoreForPlayer1 = 0;
        ScoreForPlayer2 = 0;
        document.querySelector(".ScoreForPlayer11").textContent = `${InputPlayer1.value} Score: ${ScoreForPlayer1}`;
        document.querySelector(".ScoreForPlayer22").textContent = `${InputPlayer2.value} Score: ${ScoreForPlayer2}`;
        IsNext = true;
    }

    ClickToStart.addEventListener("click", function() {
        dialog.showModal();
    });

    cancelButton.addEventListener("click", function() {
        dialog.close();
    });

    startButton.addEventListener("click", function() {
        dialog.close();
        startGame();
    });

    playAgainButton.addEventListener("click", function() {
        ShowWin.close();
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        
    });

    playAgainDrawButton.addEventListener("click", function() {
        ShowDraw.close();
        resetGame();
    });
})();
