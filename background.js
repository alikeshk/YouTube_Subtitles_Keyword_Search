chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/results?search_query")) {
        console.log("test1");
        const queryResults = tab.url.split("?")[1];
        const searchWords = new URLSearchParams(queryResults);
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            searchId: searchWords.get("search_query"),
        });
    }
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "createTab") {
        chrome.tabs.create({ url: message.url });
    }
});
