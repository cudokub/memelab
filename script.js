document.addEventListener('DOMContentLoaded', () => {
    const host = 'https://overlays-ui.vercel.app'
    const buttons = document.querySelectorAll('.meme-button');
    const characterImage = document.querySelector('.character img');
    const searchTokenInput = document.getElementById('search-token');

    // Default image URL
    const defaultImageUrl = 'https://i.imgur.com/GtFIJNO.gif';

    // Loading spinner image URL
    const loadingSpinnerUrl = 'waiting-wheel.gif'; 

    // Function to validate if the input is a number
    function isValidNumber(value) {
        return !isNaN(value) && value.trim() !== '';
    }

    // Function to fetch and update the character image
    function fetchAndUpdateImage(memeType, id) {
        if (isValidNumber(id)) {
            const imageUrl = `${host}/api?nft=madscientists&meme=${memeType}&id=${id}`;
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

    // Update character image when typing in the search-token input
    searchTokenInput.addEventListener('input', () => {
        const id = searchTokenInput.value.trim();
        fetchAndUpdateImage('default', id);
    });

    // Update character image when a button is clicked
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            const id = searchTokenInput.value.trim();
            if (isValidNumber(id)) {
                fetchAndUpdateImage(value, id);
            }
        });
    });

    // Toggle switch functionality
    const toggleSwitch = document.getElementById('background-toggle');

    toggleSwitch.addEventListener('change', (event) => {
        if (event.target.checked) {
            // Handle Background enabled
            console.log('Background enabled');
            // Add your backend interaction code here
        } else {
            // Handle NoBackground enabled
            console.log('NoBackground enabled');
            // Add your backend interaction code here
        }
    });
});
