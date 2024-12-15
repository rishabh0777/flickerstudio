let cursor = document.querySelector('.cursor');
let circles = []; // Array to store the circles for the snake effect
let speedThreshold = 5; // Threshold for fast movement (pixels)
let circleSize = 20; // Size of each circle in the snake trail
let lastX = 0;
let lastY = 0;

// Create a new circle and add it to the cursor
function createCircle(x, y) {
    let circle = document.createElement('div');
    circle.classList.add('circle', 'bg-orange-500'); // Tailwind classes for the circle
    circle.style.left = `${x - circleSize / 2}px`;
    circle.style.top = `${y - circleSize / 2}px`;
    cursor.appendChild(circle);
    circles.push(circle);

    // Remove the circle after it fades out
    setTimeout(() => {
        circle.style.opacity = 0;
        setTimeout(() => {
            circle.remove();
        }, 400); // Time for the circle to disappear
    }, 300);
}

// Track mouse movement and create circles
document.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;

    // Create the main cursor circle
    if (circles.length === 0) {
        createCircle(x, y);
    }

    // Calculate the movement speed of the cursor
    let speed = Math.abs(e.movementX) + Math.abs(e.movementY);
    
    // When moving quickly, generate multiple circles (snake effect)
    if (speed > speedThreshold) {
        let numCircles = Math.min(speed / 5, 5); // Adjust the number of circles based on speed
        for (let i = 0; i < numCircles; i++) {
            // Calculate the circle's position slightly behind the cursor for the snake effect
            let offsetX = (i + 1) * (e.movementX / numCircles);
            let offsetY = (i + 1) * (e.movementY / numCircles);
            createCircle(x - offsetX, y - offsetY);
        }
    }

    // Move the main cursor with the mouse
    cursor.style.left = e.pageX
    cursor.style.top = e.pageY;

    lastX = x;
    lastY = y;
});

// Optional: Make the cursor stay as a circle when not moving
let timeout;
document.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (circles.length === 0) {
            createCircle(cursor.offsetLeft, cursor.offsetTop);
        }
    }, 300); // Wait for 200ms before adding a circle when the cursor is stationary
});
