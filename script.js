document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.meme-button');
    const characterImage = document.querySelector('.character img');
    const searchTokenInput = document.getElementById('search-token');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const id = searchTokenInput.value.trim();
            if (id) {
                const imageUrl = `https://overlays-ui.vercel.app/api?nft=madscientists&meme=${value}&id=${id}`;
                characterImage.src = imageUrl;
            } else {
                alert('Please enter a token ID in the search input.');
            }
        });
    });
});
