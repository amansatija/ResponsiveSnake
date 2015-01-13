
define( ['Models/Snake', 'Models/Rules', 'Models/Playground', 'Views/PlaygroundView'], function( Snake, Rules, Playground, PlaygroundView ) {

    function startGame() {

        var playgroundView = new PlaygroundView();
        var playground = new Playground(playgroundView.ctx, playgroundView.BOXSIZE);

        var snake = new Snake(playground.playground);
        var rules = new Rules(true);





        //generate food, for game start
        playground.generateFood(playground.playground, snake.snake);


        var timerId = setInterval(function() {

            if (rules.isSnakeAlive(snake.snake, playground.playground)) {
                document.onkeydown = function(e) {
                    switch (e.keyCode) {
                        case 37:
                            snake.validateDirection('left');
                            break;
                        case 38:
                            snake.validateDirection('up');
                            break;
                        case 39:
                            snake.validateDirection('right');
                            break;
                        case 40:
                            snake.validateDirection('bottom');
                            break;
                    }
                };

                snake.controlSnake(snake.lastDirection);

                playgroundView.clearPlayground();
                playgroundView.drawSnake(snake.snake);


                if (playground.didSnakeAteFood(snake.snake)) {
                    // refresh view
                    playgroundView.snakeAteFood(snake.snake, playground.food);

                    snake.inkrementSnake();


                    playground.generateFood(playground.playground, snake.snake);
                    playgroundView.displayFood(playground.food);
                } else {
                    playgroundView.displayFood(playground.food);
                }

            } else {

                if (playgroundView.displayGameOver()) {
                    snake = new Snake(playground.playground);
                    rules = new Rules(true);
                } else {
                    clearInterval(timerId);
                }
            }

        }, 50);
    }

    return {
        startGame:startGame
    };
});
