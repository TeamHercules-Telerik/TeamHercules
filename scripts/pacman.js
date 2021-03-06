define(["CanvasDrawer", "trap", "game"],function (CanvasDrawer, Trap) {
    var PacMan = (function () {
        function PacMan(x, y, direction, speed) {

            var soundEat = new Audio("./sounds/pacman_coinin.wav");
            soundEat.volume = 0.3;
            var cellHeight = 50, 
                wallHeight = 6;
            this.positionX = x;
            this.positionY = y;
            this.score = 0;
            this.lives = 3;
            this.speed = speed;
            this.direction = direction;
            this.wantedDirection = direction;
            this.pause = true;
            this.r = 20;
            this.frame = 0;

            this.draw = function () {
                CanvasDrawer.DrawPacman(this.positionX, this.positionY, this.r, this.direction, this.frame);
                
                this.frame++;
                if (this.frame > 5) {
                    this.frame = 0;
                }
            };

            this.move = function (allLetters, fieldWalls) {
                for (var i = 0; i < this.speed; i++) {

                    //user want to change direction
                    if (this.wantedDirection !== this.direction) {
                        if (!this.detectCollisions(this.wantedDirection, allLetters, fieldWalls)) {
                            this.direction = this.wantedDirection;
                        }
                    }

                    //move if it is possible
                    if (!this.detectCollisions(this.direction, allLetters, fieldWalls)) {
                        switch (this.direction) {
                            case 'up':
                                this.positionY--;
                                break;
                            case 'down':
                                this.positionY++;
                                break;
                            case 'left':
                                this.positionX--;
                                break;
                            case 'right':
                                this.positionX++;
                                break;
                        }
                    }
                }
            };


            this.detectCollisions = function (direction, allLetters, fieldWalls) {
                var collisionDetected = false;

                if (detectCollisionsWithWalls(direction, this.positionX, this.positionY, fieldWalls)) {
                    collisionDetected = true;
                }

                //detectCollisionsWithFood
                for (var i = 0; i < allLetters.length; i++) {
                    var letter = allLetters[i];
                    var dX = this.positionX - letter.x;

                    if (dX < 0) {
                        dX *= -1;
                    }

                    var dY = this.positionY - letter.y;

                    if (dY < 0) {
                        dY *= -1;
                    }

                    if (dX + dY < this.r * 2 / 3) {
                        
                        this.score += 10;

                        if (letter.letter == '{') {
                            Trap.ActivateTrap(this, speed);
                            this.pause = true;
                        }

                        soundEat.play();
                        allLetters.splice(i, 1);
                    }
                }

                return collisionDetected;
            };

            function detectCollisionsWithWalls(direction, posX, posY, fieldWalls) {

                var currRow = ~~(posY / cellHeight);
                var currCol = ~~(posX / cellHeight);

                if (direction === 'left' || direction === 'right') {

                    if (posY % cellHeight !== (cellHeight + wallHeight) / 2) {
                        return true;
                    }

                    //if move to left and hit wall
                    if (direction === 'left') {
                        if (fieldWalls[currRow * 2 + 1][currCol] === '|' &&
                            (posX % cellHeight <= (cellHeight + wallHeight) / 2)) {
                            return true;
                        }
                    }
                        //if move to right and hit wall
                    else if (direction === 'right') {
                        if (fieldWalls[currRow * 2 + 1][currCol + 1] === '|' &&
                            (posX % cellHeight >= (cellHeight + wallHeight) / 2)) {
                            return true;
                        }
                    }

                    return false;
                }

                if (direction === 'up' || direction === 'down') {

                    if (posX % cellHeight !== (cellHeight + wallHeight) / 2) {
                        return true;
                    }

                    //if moves up and hit wall
                    if (direction === 'up') {
                        if (fieldWalls[currRow * 2][currCol] === '-' &&
                            (posY % cellHeight <= (cellHeight + wallHeight) / 2)) {
                            return true;
                        }
                    }
                        //if moves down and hit wall
                    else if (direction === 'down') {
                        if (fieldWalls[currRow * 2 + 2][currCol] === '-' &&
                            (posY % cellHeight >= (cellHeight + wallHeight) / 2)) {
                            return true;
                        }
                    }

                    return false;
                }
            }

            (function StartDirectionChengeListener(object) {
                document.onkeydown = khandle;

                function khandle(key) {
                    if (key.keyCode === 37) {
                        //key.preventDefault();
                         object.wantedDirection = "left";
                    }
                    if (key.keyCode === 39) {
                        //key.preventDefault();
                        object.wantedDirection = "right";
                    }
                    if (key.keyCode === 38) {
                        //key.preventDefault();
                        object.wantedDirection = "up";
                    }
                    if (key.keyCode === 40) {
                        //key.preventDefault();
                        object.wantedDirection = "down";
                    }
                }
            } )(this);
        }

        PacMan.prototype.reset = function () {
            this.positionX = 408;
            this.positionY = 128;
            this.direction = 'left';
            this.wantedDirection = 'left';
            this.speed = 4;
        };

        return PacMan;
    }());

    return PacMan;
});