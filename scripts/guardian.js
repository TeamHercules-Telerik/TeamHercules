define(function() {
    'use strict'
    var Guardian = (function () {

        var gardNumber = 0;

        var fieldWalls;
        var cellHeight = 50,
            wallHeight = 6;

        function Guardian(x, y, radius, speed, direction, fillColor, strokeColor) {
    
            this.name = "Guard" + gardNumber;
            gardNumber++;
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.direction = direction;
            this.radius = radius;
            this.fillColor = fillColor;
            this.strokeColor = strokeColor;
        }

        var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");       

        Guardian.prototype.draw = function () {
            ctx.beginPath();
            ctx.quadraticCurveTo(this.x - this.radius * 0.60, this.y + this.radius * 0.670, this.x, this.y);
            ctx.lineTo(this.x + this.radius * 0.60, this.y + this.radius * 0.60);
            ctx.arc(this.x, this.y, this.radius, Math.PI, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = 6;
            ctx.stroke();
            ctx.fill();
            //eyes
            ctx.beginPath();
            ctx.arc(this.x + this.radius / 4, this.y - this.radius / 2, this.radius / 5, 0, 2 * Math.PI);
            ctx.arc(this.x - this.radius / 4, this.y - this.radius / 2, this.radius / 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fill();
            //pupils
            ctx.beginPath();
            ctx.arc(this.x + this.radius / 4, this.y - this.radius / 2, 1, 0, 2 * Math.PI);
            ctx.arc(this.x - this.radius / 4, this.y - this.radius / 2, 1, 0, 2 * Math.PI);
            ctx.fillStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fill();
        };

        Guardian.prototype.move = function () {

            for (var i = 0; i < this.speed; i++) {

                if (OnCrossroad(this)) {
                    ChooseDirectionToContinue(this);
                }

                switch (this.direction) {
                    case 'up':
                        this.y--;
                        break;
                    case 'down':
                        this.y++;
                        break;
                    case 'left':
                        this.x--;
                        break;
                    case 'right':
                        this.x++;
                        break;
                }
            }
        };

        function ChooseDirectionToContinue(ghost) {
            //console.log(ghost.name);  TODO remove
            var possibleDirections = [];
            var directions = ['up', 'down', 'left', 'right']
            var reverseDirections = [];
            reverseDirections['up'] = 'down';
            reverseDirections['down'] = 'up';
            reverseDirections['left'] = 'right';
            reverseDirections['right'] = 'left';

            for (var i = 0; i < directions.length; i++) {

                if (directions[i] !== reverseDirections[ghost.direction] && !detectWallCollision(ghost, directions[i])) {
                    possibleDirections.push(directions[i]);
                }
            }

            var possibleDirectionsCount = possibleDirections.length;

            if (possibleDirectionsCount > 0) {
                var rndDirectionIndex = Math.floor(Math.random() * (possibleDirectionsCount));
                ghost.direction = possibleDirections[rndDirectionIndex];
            }
            else {
                ghost.direction = reverseDirections[ghost.direction];
            }
        };

        function OnCrossroad(ghost) {

            var posY = ghost.y;
            var posX = ghost.x;
            var verticalCellCenter = (posY % cellHeight === (cellHeight + wallHeight) / 2);
            var horizontalCellCenter = (posX % cellHeight === (cellHeight + wallHeight) / 2);

            if (verticalCellCenter && horizontalCellCenter) {
                return true;
            }
            else {
                return false;
            }
        };

        function detectWallCollision(ghost, direction) {

            var posX = ghost.x;
            var posY = ghost.y;
            var currRow = ~~(posY / cellHeight);
            var currCol = ~~(posX / cellHeight);

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
                //if moves up and hit wall
            else if (direction === 'up') {
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
        };

        Guardian.prototype.detectCollisionWithPacman = function (pacMan) {

            if (!(pacMan.positionX > this.x + this.radius || pacMan.positionX + pacMan.r < this.x ||
                        pacMan.positionY > this.y + this.radius || pacMan.positionY + pacMan.r < this.y)) {
                return true;
            }
            else {
                return false;
            }
        };

        Guardian.createGuardians = function createGuardians(guardiansPositions, cellHeight, wallHeight, labirynth) {

            var guardians = [];
            fieldWalls = labirynth;

            for (var i = 0; i < guardiansPositions.length; i++) {
                var x = guardiansPositions[i].col * 50 + (cellHeight + wallHeight) / 2,
                    y = guardiansPositions[i].row * 50 + (cellHeight + wallHeight) / 2,
                    radius = 15,
                    guardianSpeed = 3;
    				
                var guardian = new Guardian(x, y, radius, guardianSpeed, 'right', 'black', 'yellowgreen');
    
                guardians.push(guardian);
            }

            return guardians;
        }

        Guardian.resetGuardians = function resetGuardians(guardians, positions) {

            for (var i = 0; i < guardians.length; i++) {
                guardians[i].x = positions[i].col * 50 + (cellHeight + wallHeight) / 2;
                guardians[i].y = positions[i].row * 50 + (cellHeight + wallHeight) / 2;
            }
        }

        return Guardian;
    })();

    return Guardian;
});
