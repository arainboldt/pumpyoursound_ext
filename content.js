// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'insertComments') {
        console.log('Received data for insertion:', message.data);
        insertComments(message.data);
        sendResponse({ status: 'Comments processed' });
    }
});

// Enhanced insertComments function with debugging logs
function insertComments(data) {
    data.forEach(entry => {
        const { artist, comment } = entry;
        console.log(`Processing artist: "${artist}" with comment: "${comment}"`);

        // Find all artist entries within the scScheduler-soloComments-user divs
        const artistEntries = document.querySelectorAll('.scScheduler-soloComments-user');

        let targetUserId = null;

        // Loop through all artist entries to find the correct label
        artistEntries.forEach(entry => {
            const label = entry.querySelector('.scScheduler-soloComments-label');

            // Check if the label text matches the artist name from the CSV
            if (label && label.textContent.trim().toLowerCase().includes(artist.toLowerCase())) {
                // Extract the user ID from the 'for' attribute
                const labelFor = label.getAttribute('for');
                targetUserId = labelFor;
                console.log(`Found matching label for artist "${artist}" with user ID: ${targetUserId}`);
            }
        });

        if (targetUserId) {
            // Find the input field using the extracted user ID
            const commentField = document.getElementById(targetUserId);

            if (commentField) {
                // Insert the comment into the input field
                commentField.value = comment;
                console.log(`Inserted comment for artist: "${artist}"`);
            } else {
                console.warn(`Comment field not found for artist: "${artist}"`);
            }
        } else {
            console.warn(`User ID not found for artist: "${artist}"`);
        }
    });
}
