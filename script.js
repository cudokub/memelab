document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.meme-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            console.log(`Selected option: ${value}`);
            // Add your logic here to handle the selected option
        });
    });
});
