document.getElementById('submit').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFile');
    if (fileInput.files.length === 0) {
        alert('Please upload a CSV file');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const csv = e.target.result;
        const data = parseCSV(csv);
        sendToContentScript(data);
    };

    reader.readAsText(file);
});

function parseCSV(csv) {
    const rows = csv.split('\n');
    const data = [];
    for (let row of rows) {
        const columns = row.split(',');
        if (columns.length >= 2) {
            data.push({ artist: columns[0].trim(), comment: columns[1].trim() });
        }
    }
    return data;
}

function sendToContentScript(data) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: insertComments,
            args: [data]
        });
    });
}
