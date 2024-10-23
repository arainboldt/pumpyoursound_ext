chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'insertComments') {
        const { data, isSingleColumn } = message.parsedData;
        console.log('Received data for insertion:', data);
        if (isSingleColumn) {
            insertRandomComments(data.map(item => item.comment));
        } else {
            insertComments(data);
        }
        sendResponse({ status: 'Comments processed' });
    }
});

function insertComments(data) {
    data.forEach(entry => {
        const { artist, comment } = entry;
        console.log(`Processing artist: "${artist}" with comment: "${comment}"`);

        const artistEntries = document.querySelectorAll('.scScheduler-soloComments-user');
        let targetUserId = null;

        artistEntries.forEach(entry => {
            const label = entry.querySelector('.scScheduler-soloComments-label');
            if (label && label.textContent.trim().toLowerCase().includes(artist.toLowerCase())) {
                const labelFor = label.getAttribute('for');
                targetUserId = labelFor;
                console.log(`Found matching label for artist "${artist}" with user ID: ${targetUserId}`);
            }
        });

        if (targetUserId) {
            const commentField = document.getElementById(targetUserId);
            if (commentField) {
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

function insertRandomComments(comments) {
    const commentFields = Array.from(document.querySelectorAll('.scScheduler-soloComments-input'));
    
    if (comments.length === 0 || commentFields.length === 0) {
        console.warn('No comments or comment fields available.');
        return;
    }

    // Randomly shuffle comments and assign them to comment fields
    shuffleArray(comments);

    commentFields.forEach((commentField, index) => {
        const randomComment = comments[index % comments.length];
        commentField.value = randomComment;
        console.log(`Randomly inserted comment: "${randomComment}"`);
    });
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
