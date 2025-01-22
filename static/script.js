document.getElementById('fileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const loadingContainer = document.getElementById('loadingContainer');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    const downloadButton = document.getElementById('downloadButton');
    const statusMessage = document.getElementById('statusMessage');

    // Show loading progress
    loadingContainer.style.display = 'block';
    loadingBar.style.width = '0%';
    loadingText.textContent = '0%';

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    // API keys for remove.bg
    const apiKeys = [
        'zX5nahASccKKceAiM7s85Le7',
        'CzwtgLTCsGkqAJysY3c1E1H4',
        'PCSpfzzZcGYT1CzohrjZgACt',
        'riQ8P6g5SEiSVA1zT1RXypJS',
        'zrZxZwX8b82mupS1wnumDrd4',
        'hPgtR7PJC3in3x16kRaurL5J',
        'CPU1Fz57RcSXsPk129kUoJPs',
        'K8Vttb1x4Xmncz6ADs7nCwLg',
        'CCyMK1hyuDHjn8Pjq9643bzg',
        'am6y5oPocLqmu1xYujy8m2yM',
        '1L2Dpxi4Ui4pLmK8yZUv7mxc',
        '5PkZ5HESK9aR7FHkQv5xqfDq'
    ];

    let success = false;
    let apiKeyIndex = 0;

    while (!success && apiKeyIndex < apiKeys.length) {
        const apiKey = apiKeys[apiKeyIndex];
        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': apiKey
                },
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                downloadButton.style.display = 'inline-block';
                downloadButton.href = imageUrl;
                downloadButton.download = 'RemoveBG_image_H56.png';
                statusMessage.textContent = 'Background removed successfully!';
                success = true;
            } else {
                throw new Error(`API error: ${response.statusText}`);
            }
        } catch (error) {
            statusMessage.textContent = 'Error removing background, trying another API key...';
            apiKeyIndex++;
        }
    }

    if (!success) {
        statusMessage.textContent = 'Error: Unable to remove background. Please try again later.';
    }

    // Hide the loading container
    loadingContainer.style.display = 'none';
});