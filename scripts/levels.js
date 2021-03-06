define(function () {
    'use strict'
    var Levels = (function () {    
        function Levels() {

            this.Designs = [];

            var level1 = {
                labyrinth: [
                "------------------- ",
                "|    |        |    |",
                "-- --  - -- - --  - ",
                "| |   ||||   |   | |",
                " - ---   ---  ----  ",
                "|| |   |    |||    |",
                "- - --  ---   - --  ",
                "|      ||  ||| || ||",
                "--  ---       -  -  ",
                "| || || |  | |  |  |",
                " - -    ---   -- -- ",
                "|   ||||    |||    |",
                " --    -  -- ---- - ",
                "||  | | ||       |||",
                " - -  -  -- --- -   ",
                "|    |     |       |",
                "------------------- "
                ],
                food: [
                //x,y, orientation(vertical/horizontal), text
                [260, 33, 'h', 'function Pesho() {return "Gosho"}'],
                [460, 335, 'h', 'for(var i = 0; i < length; i++)'],
                [676, 15, 'v', 'var b = new BottleBear'],
                [8, 33, 'h', 'while(!caught){eat}'],
                [128, 43, 'v', 'getDay()'],
                [150, 83, 'h', 'console.log'],
                [60, 133, 'h', 'this'],
                [153, 133, 'h', 'querySelector'],
                [8, 183, 'h', 'document.getElementById(id)'],
                [128, 185, 'v', 'level= 1'],
                [7, 233, 'h', 'x = 10'],
                [158, 233, 'h', 'y += x'],
                [23, 240, 'v', 'var hi = bye'],
                [53, 283, 'h', 'new'],
                [145, 283, 'h', '125'],
                [59, 333, 'h', 'ctx.fill()'],
                [225, 243, 'v', 'else if ()'],
                [30, 385, 'h', 'parentDiv.tagName'],
                [327, 45, 'v', 'mouseover'],
                [277, 210, 'v', 'for (g in game)'],
                [327, 213, 'v', 'var pacman'],
                [337, 335, 'h', 'a>=b'],
                [290, 385, 'h', 'if (cherries == pie)'],
                [560, 385, 'h', 'var guardian = new Ninja(green)'],
                [377, 60, 'v', 'function makeCoffee'],
                [427, 50, 'v', 'that'],
                [427, 300, 'v', 'self'],
                [458, 83, 'h', 'addEventListene'],
                [630, 85, 'v', '//this is a comment'],
                [385, 133, 'h', 'var pac = {ellow'],
                [385, 283, 'h', 'setInterval(f,8)'],
                [577, 137, 'v', 'prompt(oh)'],
                [708, 133, 'h', 'if(!beer) {thirsty}'],
                [708, 33, 'h', 'direction = \'right\''],
                [690, 83, 'h', 'var treasure'],
                [858, 83, 'h', '= food'],
                [698, 183, 'h', 'x++'],
                [808, 183, 'h', 'random'],
                [698, 233, 'h', 'Math.PI'],
                [808, 233, 'h', 'beginPath('],
                [777, 143, 'v', '!== 0'],
                [927, 143, 'v', '7 % 3'],
                [708, 283, 'h', 'var arr = [1, 2, 3]'],
                [877, 300, 'v', 'push'],
                [927, 307, 'v', 'pop()']
                ],

                guardiansPositions: [
                    { row: 0, col: 0 },
                    { row: 7, col: 0 },
                    { row: 0, col: 18 },
                    { row: 7, col: 18 }
                ]
            };

            var level2 = {
                labyrinth: [
                    "------------------- ",
                    "|    | |   |   |   |",
                    "-- -- --  - --  - - ",
                    "| | ||  ||   |   | |",
                    "     -   --   ----  ",
                    "|| |   |   |||| |  |",
                    "- - --  ---   -  -  ",
                    "|      ||  ||| |  ||",
                    " - ----       -  -  ",
                    "| |  || |  | |  |  |",
                    "-- -    ---   -- -- ",
                    "|   || |    |||    |",
                    " --   - - --  --- - ",
                    "|| ||  | |   |   |||",
                    " - - - - -- --  -   ",
                    "|    |  |  |   |   |",
                    "------------------- "
                ],
                food: [
                    //x,y, orientation(vertical/horizontal), text
                    [280, 33, 'h', 'NaN'],
                    [275, 87, 'h', 'mou'],
                    [468, 335, 'h', 'while(code>0)'],
                    [665, 335, 'h', '{guardCode();}'],
                    [676, 65, 'v', 'beer.cloneNode(true)'],
                    [8, 33, 'h', 'while(!caught){eat}'],
                    [128, 43, 'v', 'getDay()'],
                    [175, 60, 'v', 'j--;'],
                    [225, 60, 'v', 'i++;'],
                    [25, 83, 'h', '[J,S]'],
                    [60, 133, 'h', 'this'],
                    [155, 133, 'h', 'querySelector'],
                    [8, 183, 'h', 'document.getElementById(id)'],
                    [128, 185, 'v', 'level= 2'],
                    [9, 233, 'h', 'x = 10'],
                    [158, 233, 'h', 'y += x'],
                    [23, 63, 'v', '=food;'],
                    [23, 265, 'v', '(you!=me)'],
                    [53, 283, 'h', 'new'],
                    [145, 283, 'h', '125'],
                    [59, 333, 'h', 'var p;'],
                    [175, 315, 'v', '@'],
                    [225, 243, 'v', 'else if ()'],
                    [30, 385, 'h', 'parentDiv.tagName'],
                    [327, 75, 'v', 'seover'],
                    [277, 210, 'v', 'new game()'],
                    [327, 218, 'v', 'error'],
                    [360, 335, 'h', 'a >= b'],
                    [360, 33, 'h', 'if(drinkBeer&&'],
                    [558, 33, 'h', 'codeJavaScript)'],
                    [755, 33, 'h', '{bored = false}'],
                    [270, 385, 'h', 'continue;'],
                    [420, 385, 'h', 'a ? b : c'],
                    [570, 385, 'h', 'pacMan.run()'],
                    [377, 60, 'v', 'booster() {speed++}'],
                    [427, 50, 'v', 'that'],
                    [458, 83, 'h', 'addEventListene'],
                    [630, 85, 'v', 'guardians.length++;'],
                    [425, 133, 'h', 'start();'],
                    [385, 283, 'h', 'setInterval(f,8)'],
                    [708, 133, 'h', '21 % 5'],
                    [690, 83, 'h', 'var treasure'],
                    [858, 83, 'h', '= food'],
                    [698, 183, 'h', 'x++'],
                    [785, 183, 'h', 'random()'],
                    [698, 233, 'h', 'Math.PI'],
                    [770, 385, 'h', 'promp(\':D\')'],
                    [818, 233, 'h', 'eat()'],
                    [777, 143, 'v', '!== 0'],
                    [810, 133, 'h', 'document.'],
                    [927, 115, 'v', 'firstChild'],
                    [708, 283, 'h', 'var arr = [a, b, c]'],
                    [877, 300, 'v', 'push'],
                    [927, 320, 'v', 'pop()']
                ],

                guardiansPositions: [
                    { row: 0, col: 0 },
                    { row: 7, col: 0 },
                    { row: 0, col: 18 },
                    { row: 7, col: 18 }
                ]
            };

            this.Designs.push(level1);
            this.Designs.push(level2);

        }

        Levels.prototype.initializeFood = function initializeFood(level) {

            var food = this.Designs[level].food;
            var allLettersWithPositions = [];

            //for every food sequence
            for (var i = 0; i < food.length; i++) {
                var currFood = food[i];
                var x = currFood[0];
                var y = currFood[1];
                var orientation = currFood[2];
                var text = currFood[3];
                var lettersDistance = 12;

                for (var j = 0; j < text.length; j++) {

                    if (orientation == 'v') {
                        y += lettersDistance;
                    }
                    else if (orientation == 'h') {
                        x += lettersDistance;
                    }

                    allLettersWithPositions.push(new Letter(x, y, text[j]));
                }
            }

            function Letter(x, y, letter) {
                this.x = x;
                this.y = y;
                this.letter = letter;
                this.orientation = orientation;
            }

            return allLettersWithPositions;
        };

        Levels.prototype.drawLetters = function drawLetters(allLettersWithPositions, ctx) {

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
        };

        Levels.prototype.count = function count() {

            return this.Designs.length;
        };

        return Levels;
    })();

    return new Levels();
});
