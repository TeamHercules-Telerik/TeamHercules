define(function () {
    'use strict'
    var CanvasDrawer = (function () {
        var CanvasDrawer = function CanvasDrawer() {
        };

        var canvas = document.getElementById("canvas");
        CanvasDrawer.ctx = canvas.getContext("2d");
        CanvasDrawer.imagePacman = new Image();
        CanvasDrawer.imagePacman.src = 'pacman sprite.png';

        CanvasDrawer.prototype = {
            DrawPacman: function DrawPacman(positionX, positionY, r, direction, frame) {

                // draw cropped image
                var spriteX = [0, 40, 80, 118, 80, 40];
                var spriteY = [0, 40, 82, 122, 82, 40];
                if (direction == 'right') {
                    var sourceX = spriteX[frame];
                    var sourceY = 2;
                }
                else if (direction == 'left') {
                    var sourceX = spriteX[frame];
                    var sourceY = 44;
                }
                else if (direction == 'up') {
                    var sourceX = 2;
                    var sourceY = 86 + spriteY[frame];
                }
                else if (direction == 'down') {
                    var sourceX = 42;
                    var sourceY = 86 + spriteY[frame];
                }

                CanvasDrawer.ctx.drawImage(CanvasDrawer.imagePacman, sourceX, sourceY, 39, 43, positionX - r, positionY - r, 40, 44);
            },

            DrawLife: function DrawLife(x, y) {

                var ctx = CanvasDrawer.ctx;
                ctx.beginPath();
                ctx.arc(x, y, 10, 30 * Math.PI / 180, 330 * Math.PI / 180);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.fillStyle = 'yellow';
                ctx.fill();
            },

            DrawScores: function DrawScores(scores) {

                var ctx = CanvasDrawer.ctx;
                ctx.font = "20px Calibri";
                ctx.textAlign = 'left';
                ctx.fillStyle = "yellowgreen";
                ctx.fillText("Brain expansion: " + scores, 10, 435);
            },


            ShowLevelLabel: function ShowLevelLabel(level) {

                var ctx = CanvasDrawer.ctx;
                ctx.font = "100px Calibri";
                ctx.textAlign = 'left';
                ctx.fillStyle = "yellowgreen";
                ctx.fillText("Level " + level, 330, 220);
                ctx.restore();
            },

            DrawLetters: function DrawLetters(allLettersWithPositions) {

                var ctx = CanvasDrawer.ctx;

                for (var i = 0; i < allLettersWithPositions.length; i++) {
                    var letter = allLettersWithPositions[i];
                    ctx.save();
                    if (letter.orientation === 'v') {
                        ctx.translate(letter.x, letter.y);
                        ctx.rotate(Math.PI / 2);
                        ctx.translate(-letter.x, -letter.y);
                        ctx.textAlign = "center";
                    }
                    //ctx.shadowColor = "rgba(232,144,220,0.5)";
                    ctx.fillStyle = "rgba(230,230,230,1)";
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 0;
                    ctx.font = "bold 12px Calibri";
                    ctx.fillText(letter.letter, letter.x, letter.y);
                    ctx.restore();
                }
            },

            Clear: function Clear() {

                var ctx = CanvasDrawer.ctx;

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        };

        return CanvasDrawer;
    })();

    return new CanvasDrawer();
});