let outerCursor = document.querySelector('.outer-cursor');
let innerCursor = document.querySelector('.inner-cursor');

document.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;

    outerCursor.style.transform = `translate(${x - 48 }px, ${y - 48 }px)`;
});

document.addEventListener('mousemove', (e) => {
    innerCursor.style.left = `${e.clientX}px`
    innerCursor.style.top = `${e.clientY}px`
})
