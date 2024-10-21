function insertComments(data) {
    data.forEach(entry => {
        const { artist, comment } = entry;
        
        // Identify the artist's field on the page (this will be specific to PumpYourSound's HTML structure)
        const artistElement = document.querySelector(`input[data-artist="${artist}"]`);

        if (artistElement) {
            const commentField = artistElement.closest('.comment-field'); // Update selector as needed
            if (commentField) {
                commentField.value = comment;
            }
        }
    });
}


