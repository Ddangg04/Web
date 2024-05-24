document.querySelectorAll('.game-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    });
});