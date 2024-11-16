document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const game = document.querySelector('.game');

    let birdLeft = 590;
    let birdBottom = 350;
    const gravity = 2;
    let isGameOver = false;

    // Start the game by applying gravity to the bird
    function startGame() {
        birdBottom -= gravity;
        bird.style.left = birdLeft + 'px';
        bird.style.bottom = birdBottom + 'px';

        // End the game if the bird touches the ground
        if (birdBottom <= 0) {
            gameOver();
        }
    }
    const gameLoop = setInterval(startGame, 20);

    // Make the bird jump when the spacebar is pressed
    function jump() {
        if (!isGameOver && birdBottom < 410) {
            birdBottom += 70;
            bird.style.bottom = birdBottom + 'px';
        }
    }
    document.addEventListener('keyup', jump);

    // Function to generate random blocks
    function createBlock() {
        let blockLeft = 1245;
        const blockBottom = Math.random() *100;
        const block = document.createElement('div');
        if (!isGameOver) {
            block.classList.add('block');
        }
        game.appendChild(block);
        block.style.left = blockLeft + 'px';
        block.style.bottom = blockBottom + 'px';

        // Move the block across the screen
        function moveBlock() {
            blockLeft -= 2;
            block.style.left = blockLeft + 'px';

            // Remove the block when it leaves the screen
            if (blockLeft <= 0) {
                clearInterval(blockInterval);
                game.removeChild(block);
            }

            // Check for collision with the bird
            if (
                blockLeft > 570 &&
                blockLeft < 630 &&
                birdLeft === 590 &&
                birdBottom < blockBottom + 270
            ) {
                gameOver();
                clearInterval(blockInterval);
            }
        }
        const blockInterval = setInterval(moveBlock, 5);
    }

    // Generate blocks periodically
    if (!isGameOver) {
        setInterval(createBlock, 1000);
    }

    // End the game
    function gameOver() {
        isGameOver = true;
        alert('Game Over! You died.');
        clearInterval(gameLoop);
        document.removeEventListener('keyup', jump);
    }
});