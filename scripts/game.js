(function () {
    'use strict';
    require(['pacman', 'guardians', 'SVG_Drawer', 'levels'], function (Pacman, Guardian, SVG_Drawer, levels) {
        var soundIntro = new Audio("./sounds/pacman_song.wav"),
            soundDie = new Audio("./sounds/pacman_death.wav");
            soundIntro.volume = 0.2;

        var canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d"),
            maxX = ctx.canvas.width,
            maxY = ctx.canvas.height;

        var level = 0,
            newGame = false;

        var fieldWalls = levels.Designs[level].labyrinth,
            allLetters = levels.initializeFood(level),
            cellHeight = 50,
            wallHeight = 6;

        var guardians = Guardian.createGuardians(levels.Designs[level].guardiansPositions, cellHeight, wallHeight, fieldWalls);
        var pacManSpeed = 4;
        var pacMan = new Pacman(408, 128, 'left', pacManSpeed, fieldWalls, allLetters);

        var game = new Game();

        var startBtn = document.getElementById('start-game');
        startBtn.addEventListener('click', function () {
            if (newGame == false) {
                game.startGame();
            }
        });

        function Game() {

            this.pause = true;
            this.level = 1;
            

            this.startGame = function startGame() {

                soundIntro.play();
                updateHighScores();
                level = 0;
                allLetters = null;
                allLetters = levels.initializeFood(level);
                pacMan = null;
                pacMan = new Pacman(408, 128, 'left', pacManSpeed, fieldWalls, allLetters);
                Guardian.resetGuardians(guardians, levels.Designs[level].guardiansPositions);
                newGame = true;
                pacMan.pause = false;
            };

            this.nextGameFrame = function nextGameFrame() {
                if (pacMan.pause === false) {

                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);//clear
                    levels.drawLetters(allLetters, ctx);
                    pacMan.draw();
                    pacMan.move(allLetters);

                    for (var i = 0; i < guardians.length; i++) {
                        guardians[i].draw();
                        guardians[i].move();
                        if (guardians[i].detectCollisionWithPacman(pacMan)) {
                            soundDie.play();
                            if (pacMan.lives > 1) {
                                loseLife();
                            } else {
                                endGame();
                            }
                        }
                    }

                    displayScore();
                    displayLives(pacMan.lives);
                }
            };

            (function initGame() {
                SVG_Drawer.DrawField(fieldWalls, cellHeight, wallHeight);
                levels.drawLetters(allLetters, ctx);

                pacMan.draw(ctx);

                for (var i = 0; i < guardians.length; i++) {
                    guardians[i].draw();
                }

                displayScore();
                displayLives(pacMan.lives);
                updateHighScores();
            }());

            //start-pause-unpause on space key down
            (function AddPauseListener() {
                window.addEventListener('keydown', function (e) {
                    if (e.keyCode == 32 && newGame == false) {
                        e.preventDefault();
                        game.startGame();
                    } else if (e.keyCode == 32 && newGame && pacMan.pause == false) {
                        e.preventDefault();
                        pacMan.pause = true;
                    } else if (e.keyCode == 32 && newGame && pacMan.pause) {
                        e.preventDefault();
                        pacMan.pause = false;
                    }
                }, false);
            })();
        }

        setInterval(function () {
            game.nextGameFrame();
        }, 40);

        function endGame() {								//TODO
            game.pause = true;
            var EvilPacmanName = prompt('GAME OVER! \n Your brain expanded with: ' + pacMan.score + '. Enter your name:') || 'Guest'; //better way?
            localStorage.setItem(pacMan.score, EvilPacmanName);
            updateHighScores();
            newGame = false;

            document.onkeydown = function (e) { return true; }
        }

        function loseLife() {
            pacMan.pause = true;
            pacMan.lives--;
            setTimeout(function () {
                pacMan.reset();
                Guardian.resetGuardians(guardians, levels.Designs[level].guardiansPositions);
                pacMan.pause = false;
            }, 2000);
        }

        function displayLives(lives) {
            var x;
            var y;

            for (var i = 0; i < lives; i++) {
                x = 440 + i * 30;
                y = 430;

                var life = drawLife(ctx, x, y);
            }
        }

        function drawLife(ctx, x, y) {
            ctx.beginPath();
            ctx.arc(x, y, 10, 30 * Math.PI / 180, 330 * Math.PI / 180);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
        //score
        function displayScore() {
            ctx.font = "20px Calibri";
            ctx.textAlign = 'left';
            ctx.fillStyle = "yellowgreen";
            ctx.fillText("Brain expansion: " + pacMan.score, 10, 435);
        }

        //update high-score board
        function updateHighScores() {
            var highScoreBoard = document.getElementById('high-score-board');
            var highScoresCount = 10;
            //remove a child node to keep high-score board length lower than highScoresCount
            while (highScoreBoard.firstChild) {
                highScoreBoard.removeChild(highScoreBoard.firstChild);
            }
            //sort localStorage
            var sortedScores = [];

            for (var prop in localStorage) {
                if (localStorage.hasOwnProperty(prop) && !isNaN(prop)) {
                    sortedScores.push(prop);
                }
            }

            sortedScores.sort(function (a, b) {
                return b - a;
            });
            //add first highScoresCount number of
            for (var i = 0; i < highScoresCount; i++) {
                var highScore = sortedScores[i];
                if (highScore && highScore !== undefined) {
                    var scoreListItem = document.createElement('li');
                    scoreListItem.innerText = localStorage[highScore] + ' : ' + highScore;	//localStorage[highScore] = name
                    highScoreBoard.appendChild(scoreListItem);
                }
            }
        };

    });
    
})();