define(function () {
    'use strict'
    var Trap = (function () {
        function Trap() {
        };

        Trap.prototype.ActivateTrap = function (pacMan) {

var bubbleHeadingText = 'Uh oh! You fell into a trap!';
            var bubbleTipText = 'Seems like the JavaScript Guardians won\'t let you steal the museum\'s treasures so easily. Solve the riddle below to become faster for a while. But be careful! If your answer is wrong, you\'ll become slower.';
            var canvas = document.getElementById("canvas"),
                ctx = canvas.getContext("2d");

            var traps = [{
                'question': 'What is the type of NaN?',
                'a': 'NaN has a type?!',
                'b': 'number',
                'c': 'undefined',
                'correct': 'b'
            }, {
                'question': 'How do you create a variable zap that is equal to the string "Whazaaaaap?"?',
                'a': 'string zap = "Whazaaaaap?";',
                'b': 'var zap = "Whazaaaaap?"',
                'c': 'I shout at my screen "Whazaaaaap?"',
                'correct': 'b'
            }, {
                'question': 'How do you create a <div> element using JavaScript?',
                'a': 'document .createElement("div")',
                'b': 'document .getElementByTagName("div")',
                'c': 'I had no idea I could do that.',
                'correct': 'a'
            }, {
                'question': 'Who should have a statue raised in the JavaScript Museum?',
                'a': 'Gosho',
                'b': 'Pesho',
                'c': 'Both',
                'correct': 'c'
            }, {
                'question': 'How do you add a comment in JavaScript?',
                'a': 'I just share my opinion.',
                'b': '<!--This is a comment.-->',
                'c': '//This is a comment.',
                'correct': 'c'
            }, {
                'question': 'How do you write "Hello World" in an alert box?',
                'a': 'alert("Hello World");',
                'b': 'msgBox("Hello World");',
                'c': 'alertBox("Hello World");";',
                'correct': 'a'
            }];

            var trapsLength = traps.length;
            var trapIndex = Math.floor(Math.random() * trapsLength);
            var playerAnswer = '';
            var x = 0;
            var y = 0;
            var text = '';
            var textWidth = 0;

            //draw
            var stage = new Kinetic.Stage({
                container: 'kinetic',
                width: ctx.canvas.width,
                height: ctx.canvas.height
            });

            var layer = new Kinetic.Layer();

            function drawTrapBubble() {

                var trapBubble = new Kinetic.Rect({
                    x: stage.width() / 2 - (stage.width() * 0.75) / 2,		//center
                    y: stage.height() / 2 - (stage.height() * 0.75) / 2,	//center
                    width: stage.width() * 0.75,
                    height: stage.height() * 0.75,
                    fill: 'black',
                    stroke: 'aqua',
                    strokeWidth: 4,
                    cornerRadius: 10,
                    dash: [103, 1]
                });

                var animation = new Kinetic.Tween({
                    node: trapBubble,
                    duration: 1,
                    x: 50,
                    y: 50,
                    strokeWidth: 7,
                    scaleX: 1.2
                }, layer);

                layer.add(trapBubble);
                stage.add(layer);
                animation.play();

                return trapBubble;
            }

            function drawText(text, layer, x, y, fillColor, fontSize, padding, width, letter) {
                var newText = new Kinetic.Text({
                    x: x,
                    y: y,
                    text: text,
                    fontSize: fontSize,
                    fontFamily: 'Calibri',
                    fontStyle: "900",
                    fill: fillColor,
                    width: width,
                    padding: padding,
                    align: 'center',
                    id: letter,
                    shadowColor: 'white',
                    shadowBlur: 18,
                    shadowOffset: { x: 1, y: 1 },
                    shadowOpacity: 0.7
                });

                newText.offsetX(newText.width() / 2); //center
                layer.add(newText);
                stage.add(layer);

                var animateText = new Kinetic.Tween({
                    node: newText,
                    duration: 1,
                    strokeWidth: 14,
                    scaleX: 1.1
                }, layer);

                animateText.play();
                return newText;
            }

            var trapBubble = drawTrapBubble();


            x = trapBubble.x() + trapBubble.width() / 2;
            y = trapBubble.y();
            textWidth = trapBubble.width();

            drawText(bubbleHeadingText, layer, x, y, 'yellow', 30, 20, textWidth);

            y = trapBubble.y() + 40;

            drawText(bubbleTipText, layer, x, y, '#888', 15, 20, textWidth);

            //question
            text = traps[trapIndex]['question'];
            y = trapBubble.y() + 100;

            drawText(text, layer, x, y, 'yellowgreen', 30, 20, textWidth);

            //answers
            //a
            x = trapBubble.x() + trapBubble.width() / 2 - trapBubble.width() / 3;
            y = trapBubble.y() + trapBubble.height() - 30 - 50;
            text = 'a) ' + traps[trapIndex]['a'];
            textWidth = trapBubble.width() / 3;

            var trapAnswerA = drawText(text, layer, x - 20, y, 'yellowgreen', 22, 2, textWidth, 'a');
            //b
            x = trapBubble.x() + trapBubble.width() / 2;
            text = 'b) ' + traps[trapIndex]['b'];

            var trapAnswerB = drawText(text, layer, x, y, 'yellowgreen', 22, 2, textWidth, 'b');
            //c
            x = trapBubble.x() + trapBubble.width() / 2 + trapBubble.width() / 3;
            text = 'c) ' + traps[trapIndex]['c'];

            var trapAnswerC = drawText(text, layer, x + 20, y, 'yellowgreen', 22, 2, textWidth, 'c');
            //add layer to stage
            stage.add(layer);

            //pick answer by key(a || b || c || A || B || C)
            function onPickTrapAnswerKeydown() {
                document.addEventListener('keydown', khandle);

                function khandle(key) {
                    if (key.keyCode === 65) {
                        checkIfTrueAnswer('a');
                        layer.remove();
                        document.removeEventListener('keydown', khandle);
                    }
                    else if (key.keyCode === 66) {
                        checkIfTrueAnswer('b');
                        layer.remove();
                        document.removeEventListener('keydown', khandle);
                    }
                    else if (key.keyCode === 67) {
                        checkIfTrueAnswer('c');
                        layer.remove();
                        document.removeEventListener('keydown', khandle);
                    }
                }
            }

            //pick answer by click
            function onPickTrapAnswerClick(trapAnswer) {
                trapAnswer.on('click', function () {
                    checkIfTrueAnswer(this.id());
                    layer.remove();
                });
            }

            onPickTrapAnswerKeydown();
            onPickTrapAnswerClick(trapAnswerA);
            onPickTrapAnswerClick(trapAnswerB);
            onPickTrapAnswerClick(trapAnswerC);

            function checkIfTrueAnswer(answer) {
                if (answer == traps[trapIndex]['correct']) {
                    pacMan.score += 100;
                    pacMan.speed = pacMan.speed + 2;
                    pacMan.pause = false;
                    //reset speed after 10 seconds
                    setTimeout(function () {
                        pacMan.speed = 4;
                    }, 10000);

                } else {
                    pacMan.speed = pacMan.speed - 2;
                    pacMan.pause = false;
                    //reset speed after 10 seconds
                    setTimeout(function () {
                        pacMan.speed = 4;
                    }, 10000);
                }


            }
        }

        return Trap;
    })();

    return new Trap();
});