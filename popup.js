document.getElementById('submit').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFile');
    if (fileInput.files.length === 0) {
        alert('Please upload a CSV file');
        console.log('No CSV file uploaded.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const csv = e.target.result;
        console.log('CSV file successfully read.');
        const data = parseCSV(csv);
        console.log('Parsed data:', data);
        sendToContentScript(data);
    };

    reader.onerror = function(e) {
        console.error('Error reading CSV file:', e);
    };

    reader.readAsText(file);
});

function parseCSV(csv) {
    const rows = csv.split('\n');
    const data = [];
    const isSingleColumn = rows.every(row => row.split(',').length === 1); // Check if all rows have only one column

    rows.forEach((row, index) => {
        const columns = row.split(',');
        if (isSingleColumn) {
            // Single column: Treat as comments only
            const comment = columns[0].trim();
            if (comment) {
                console.log(`Row ${index}: Parsed comment="${comment}"`);
                data.push({ comment });
            } else {
                console.warn(`Row ${index}: Invalid or empty comment, skipping row.`);
            }
        } else if (columns.length >= 2) {
            // Two columns: Treat as artist and comment
            const artist = columns[0].trim();
            const comment = columns[1].trim();
            console.log(`Row ${index}: Parsed artist="${artist}", comment="${comment}"`);
            data.push({ artist, comment });
        } else {
            console.warn(`Row ${index}: Invalid or missing columns, skipping row.`);
        }
    });

    return { data, isSingleColumn };
}

function sendToContentScript(parsedData) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'insertComments', parsedData }, (response) => {
            if (chrome.runtime.lastError) {
                console.error('Error sending message to content script:', chrome.runtime.lastError);
            } else {
                console.log('Message sent to content script:', response);
            }
        });
    });
}
