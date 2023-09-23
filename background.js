chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/results?search_query")) {
        console.log("test1");
        const queryResults = tab.url.split("?")[1];
        const searchWords = new URLSearchParams(queryResults);
        console.log(searchWords);
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            searchId: searchWords.get("search_query"),
        });
    }
});