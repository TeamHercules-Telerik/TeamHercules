(function () {
    'use strict';
    require(['pacman', 'guardian', 'SVG_Drawer', 'levels', 'CanvasDrawer'],
        function (Pacman, Guardian, SVG_Drawer, levels, CanvasDrawer) {
        var soundIntro = new Audio("./sounds/pacman_song.wav"),
            soundDie = new Audio("./sounds/pacman_death.wav");
            soundIntro.volume = 0.2;

        var level = 0,
            newGame = false;

        var fieldWalls = levels.Designs[level].labyrinth,
            allLetters = levels.initializeFood(level),
            cellHeight = 50,
            wallHeight = 6;

        var guardians = Guardian.createGuardians(levels.Designs[level].guardiansPositions, cellHeight, wallHeight, fieldWalls);
        var pacManSpeed = 4;
        var pacMan =  new Pacman(408, 128, 'left', pacManSpeed);

        var game = new Game();

        var startBtn = document.getElementById('start-game');
        startBtn.addEventListener('click', function () {
            if (newGame == false) {
                game.startGame();
            }
        });

        function Game() {

            this.startGame = function startGame() {

                level = 0;
                this.initLevel();
                pacMan.lives = 3;
                pacMan.score = 0;
                pacMan.reset();
                Guardian.resetGuardians(guardians, levels.Designs[level].guardiansPositions);

                setTimeout(function(){
                    soundIntro.play();
                    newGame = true;
                    pacMan.pause = false;
                }, 1000);
            };

            this.nextGameFrame = function nextGameFrame() {

                if (pacMan.pause === false) {

                    CanvasDrawer.Clear();

                    if (allLetters.length == 0)
                    {
                        if (level == levels.count() - 1)
                        {
                            endGame();
                        }
                        else {
                            level++;
                            pacMan.reset();
                            pacMan.pause = true;
                            this.initLevel();
                            setTimeout(function () {
                                pacMan.pause = false;
                            }, 1000);
                        }
                    }
                    
                    CanvasDrawer.DrawLetters(allLetters);
                    pacMan.draw();
                    pacMan.move(allLetters, fieldWalls);

                    for (var i = 0; i < guardians.length; i++) {
                        guardians[i].draw();
                        guardians[i].move();
                        if (guardians[i].detectCollisionWithPacman(pacMan)) {
                            soundDie.play();
                            if (pacMan.lives > 1) {
                                loseLife();
                            } else {
                                pacMan.lives --;
                                CanvasDrawer.DrawScores(pacMan.score);
                                endGame();
                                break;
                            }
                        }
                    }

                    CanvasDrawer.DrawScores(pacMan.score);
                    displayLives(pacMan.lives);
                }
            };

            this.initLevel = function initLevel() {

                fieldWalls = levels.Designs[level].labyrinth;
                SVG_Drawer.DrawField(fieldWalls, cellHeight, wallHeight);
                allLetters = levels.initializeFood(level);
                guardians = Guardian.createGuardians(levels.Designs[level].guardiansPositions, cellHeight, wallHeight, fieldWalls);

                CanvasDrawer.ShowLevelLabel(level + 1);
            };

            (function initGame() {

                SVG_Drawer.DrawField(fieldWalls, cellHeight, wallHeight);
                CanvasDrawer.DrawLetters(allLetters);

                for (var i = 0; i < guardians.length; i++) {
                    guardians[i].draw();
                }

                CanvasDrawer.DrawScores(pacMan.score);
                displayLives(pacMan.lives);
                updateHighScores();
                pacMan.draw();
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

        function endGame() {
            pacMan.pause = true;
            var message = (pacMan.lives == 0) ? 'GAME OVER!' : 'IT LOOKS LIKE YOU GET ALL JavaScript KNOWLEDGE FROM OUR MUSEUM!';
            var EvilPacmanName = prompt(message + ' \n Your brain expanded with: ' + pacMan.score + '. Enter your name:') || 'Guest';
            localStorage.setItem(pacMan.score, EvilPacmanName);
            updateHighScores();
            newGame = false;
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

                var life = CanvasDrawer.DrawLife(x, y);
            }
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