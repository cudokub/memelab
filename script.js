document.addEventListener('DOMContentLoaded', () => {
    const host = 'https://overlays-ui.vercel.app'
    const buttons = document.querySelectorAll('.meme-button');
    const characterImage = document.querySelector('.character img');
    const searchTokenInput = document.getElementById('search-token');
    const toggleSwitch = document.getElementById('background-toggle');

    // Default image URL
    const defaultImageUrl = 'https://imgur.com/owidurD.gif';

    // Loading spinner image URL
    const loadingSpinnerUrl = 'waiting-wheel.gif';

    // Variable to store the last button pressed
    let lastMemeType = 'default';

    // Timeout variable for debouncing
    let debounceTimeout;

    // Function to validate if the input is a number
    function isValidNumber(value) {
        return !isNaN(value) && value.trim() !== '';
    }

    // Function to fetch and update the character image
    function fetchAndUpdateImage(memeType, id, background) {
        if (isValidNumber(id)) {
            const imageUrl = `${host}/api?nft=madscientists&meme=${memeType}&id=${id}&background=${background}`;
            characterImage.src = loadingSpinnerUrl; // Use the spinning wheel while image loads
            fetch(imageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    characterImage.src = imageUrl; // Set to the new image URL once loaded
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                    characterImage.src = defaultImageUrl; // Set to default image in case of an error
                });
        } else {
            characterImage.src = defaultImageUrl;
        }
    }

    // Update character image when typing in the search-token input with debounce
    searchTokenInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const id = searchTokenInput.value.trim();
            const background = toggleSwitch.checked;
            fetchAndUpdateImage('default', id, background);
        }, 1500);
    });

    // Update character image when a button is clicked
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const id = searchTokenInput.value.trim();
            const background = toggleSwitch.checked;
            if (isValidNumber(id)) {
                lastMemeType = value; // Update lastMemeType with the button's value
                fetchAndUpdateImage(value, id, background);
            }
        });
    });

    // Toggle switch functionality
    toggleSwitch.addEventListener('change', (event) => {
        const memeType = lastMemeType || 'default';
        const id = searchTokenInput.value.trim();
        const background = event.target.checked;
        fetchAndUpdateImage(memeType, id, background);
    });
});
