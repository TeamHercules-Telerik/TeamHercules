function PacMan(x,y,direction, speed) {
    this.positionX = x;
    this.positionY = y;
    this.speed = speed;
    this.direction = direction;
    this.wantedDirection = direction;
    this.pause = false;
    this.r = 20;

    this.draw = function () {
        //remove old pac man
        var oldPacMan = document.getElementById('pacMan');
        if (oldPacMan !== null) {
            oldPacMan.remove();
        }

        var svgNS = 'http://www.w3.org/2000/svg';
        var pacCicle = document.createElementNS(svgNS, 'circle');

        //pacCicle.setAttribute('id', 'pacMan');
        pacCicle.setAttribute('id', 'pacMan');
        pacCicle.setAttribute('r', this.r);
        pacCicle.setAttribute('cy', this.positionY);
        pacCicle.setAttribute('cx', this.positionX);

        document.getElementById('game').appendChild(pacCicle);

    };

    this.move = function () {
        for (var i = 0; i < this.speed; i++) {

            //user want to change direction
            if (this.wantedDirection !== this.direction) {
                if(!this.detectCollisions(this.wantedDirection)){
                    this.direction = this.wantedDirection;
                }
            }

            //move if it is possible
            if (!this.detectCollisions(this.direction)) {
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
	

    this.detectCollisions = function (direction) {
        var collisionDetected = false;

        if (detectCollisionsWithWalls(direction, this.positionX, this.positionY)) {
            collisionDetected = true;
        }
		if (detectCollisionsWithFood()) {		//TODO
			updateScore();
		}
		if (detectCollisionsWithTrap()) {		//TODO
		//pause game
			setTrap();
		//resume game
		}

        return collisionDetected;

    };
}
function detectCollisionsWithFood() {		//TODO
	return false;
}
function detectCollisionsWithTrap() {		//TODO
	return false;
}