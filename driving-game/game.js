const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

// Game State
let score = 0;
let isGameOver = false;
let animationId;

// Game Config
const CAR_WIDTH = 40;
const CAR_HEIGHT = 60;
const OBSTACLE_SIZE = 40;
const REWARD_SIZE = 30;
const BASE_SPEED = 2;
const BOOST_SPEED = 5;

// Load images (simulated with drawing for now as per constraints)
// In a real scenario, we would load `new Image()` here.

class Car {
    constructor() {
        this.width = CAR_WIDTH;
        this.height = CAR_HEIGHT;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height / 2 - this.height / 2;
        this.dx = 0;
        this.dy = -BASE_SPEED; // Default moving up
        this.speed = BASE_SPEED;
        this.direction = 'UP'; // UP, DOWN, LEFT, RIGHT
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Rotate based on direction
        let angle = 0;
        if (this.direction === 'UP') angle = 0;
        if (this.direction === 'RIGHT') angle = Math.PI / 2;
        if (this.direction === 'DOWN') angle = Math.PI;
        if (this.direction === 'LEFT') angle = -Math.PI / 2;

        ctx.rotate(angle);

        // Draw Car Body (Blue Rectangle)
        ctx.fillStyle = '#007bff';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Draw Windows (Light Blue)
        ctx.fillStyle = '#add8e6';
        ctx.fillRect(-this.width / 2 + 5, -this.height / 2 + 10, this.width - 10, 15); // Front window
        ctx.fillRect(-this.width / 2 + 5, -this.height / 2 + 35, this.width - 10, 10); // Rear window

        // Draw Headlights (Yellow)
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(-this.width / 2 + 5, -this.height / 2, 5, 0, Math.PI * 2);
        ctx.arc(this.width / 2 - 5, -this.height / 2, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    update(isBoosting) {
        this.speed = isBoosting ? BOOST_SPEED : BASE_SPEED;

        // Update velocity based on direction
        if (this.direction === 'UP') {
            this.dx = 0;
            this.dy = -this.speed;
        } else if (this.direction === 'DOWN') {
            this.dx = 0;
            this.dy = this.speed;
        } else if (this.direction === 'LEFT') {
            this.dx = -this.speed;
            this.dy = 0;
        } else if (this.direction === 'RIGHT') {
            this.dx = this.speed;
            this.dy = 0;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Check for wall collision
        if (this.x < 0 ||
            this.x + this.width > canvas.width ||
            this.y < 0 ||
            this.y + this.height > canvas.height) {
            gameOver();
        }
    }

    setDirection(dir) {
        this.direction = dir;
        // Swap width/height logic for hitbox if we were doing precise rotation,
        // but since we draw rotated, the hitbox logic needs to align.
        // For simplicity, we keep the hitbox square-ish or just check overlaps based on current x,y.
        // But visually, if car rotates 90deg, width becomes height.
        // To keep it simple, let's keep hitbox static but maybe adjust if needed.
        // Actually, with simple rect collision, it's better if the car is roughly square or we handle AABB properly.
        // Let's just keep the logical x,y,w,h consistent.
    }
}

class Obstacle {
    constructor() {
        this.width = OBSTACLE_SIZE;
        this.height = OBSTACLE_SIZE;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.color = 'red';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Add an 'X' or something
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.moveTo(this.x + this.width, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.stroke();
    }
}

class Reward {
    constructor() {
        this.width = REWARD_SIZE;
        this.height = REWARD_SIZE;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.color = 'gold';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('$', this.x + 8, this.y + 22);
    }
}

// Global objects
let car;
let obstacles = [];
let rewards = [];
let isCtrlPressed = false;

function init() {
    score = 0;
    scoreElement.innerText = score;
    isGameOver = false;
    restartBtn.style.display = 'none';

    car = new Car();
    obstacles = [];
    rewards = [];

    // Create initial obstacles and rewards
    for (let i = 0; i < 5; i++) {
        spawnObstacle();
        spawnReward();
    }

    // Periodically spawn new ones? Or keep fixed amount?
    // "Hiển thị nhiều chướng ngại vật và phần thưởng ngẫu nhiên."
    // Let's spawn them as you eat them, or keep a set on screen.
    // If the car moves indefinitely, maybe we should scroll the map?
    // "Di chuyển xe: Cho xe di chuyển chậm lên phía trên bản đồ."
    // If it's a static canvas size and car moves, eventually it hits the wall.
    // Usually these games scroll. But the prompt says "Check boundary" is standard.
    // "Hiển thị trên bản đồ" -> The map might be the canvas.
    // Let's keep it contained in canvas for this exercise.

    animate();
}

function spawnObstacle() {
    // Avoid spawning on top of car
    let obs = new Obstacle();
    // Simple check to ensure not on car (not perfect but helpful)
    if (Math.abs(obs.x - car.x) < 100 && Math.abs(obs.y - car.y) < 100) {
        obs.x += 200;
        if (obs.x > canvas.width) obs.x -= 400;
    }
    obstacles.push(obs);
}

function spawnReward() {
    let rew = new Reward();
    rewards.push(rew);
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function animate() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update Car
    car.update(isCtrlPressed);
    car.draw();

    // Handle Obstacles
    obstacles.forEach(obs => {
        obs.draw();
        if (checkCollision(car, obs)) {
            gameOver();
        }
    });

    // Handle Rewards
    for (let i = rewards.length - 1; i >= 0; i--) {
        rewards[i].draw();
        if (checkCollision(car, rewards[i])) {
            score += 10; // Increase score
            scoreElement.innerText = score;
            rewards.splice(i, 1); // Remove reward
            spawnReward(); // Spawn a new one to keep game going
            // Maybe add obstacle to make it harder?
            if (score % 50 === 0) spawnObstacle();
        }
    }

    animationId = requestAnimationFrame(animate);
}

function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(animationId);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Điểm số: ' + score, canvas.width / 2, canvas.height / 2 + 40);

    restartBtn.style.display = 'inline-block';
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;

    switch(e.key) {
        case 'ArrowUp':
            car.setDirection('UP');
            break;
        case 'ArrowDown':
            car.setDirection('DOWN');
            break;
        case 'ArrowLeft':
            car.setDirection('LEFT');
            break;
        case 'ArrowRight':
            car.setDirection('RIGHT');
            break;
        case 'Control':
            isCtrlPressed = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
        isCtrlPressed = false;
    }
});

restartBtn.addEventListener('click', init);

// Start Game
init();
