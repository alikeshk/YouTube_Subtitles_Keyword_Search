chrome.tabs.onUpdated.addListener((tabId, tab) => {
    let isValidUrl = tab.url;
    if (isValidUrl && tab.url.includes("youtube.com/results?search_query")) {
        const queryResults = tab.url.split("?")[1];
        const searchWords = new URLSearchParams(queryResults);

        chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: searchWords.get("search_query"),
        });
    }
});