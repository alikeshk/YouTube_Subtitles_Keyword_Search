// Added 'getCurrentTab'
import { getCurrentTab } from "./utilities.js";

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
  
    // const currentVideo = urlParameters.get("v");
  
    if (activeTab.url.includes("youtube.com/results")) {
      
    } else {
      const container = document.getElementsByClassName("container")[0];
  
      container.innerHTML = '<div class="title">This is not a youtube search page.</div>';
    }

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      if (message.keywordList !== undefined) {
        const keywordResultsDiv = document.getElementById("keywordResults");
        keywordResultsDiv.innerHTML = "<h2>Keyword Occurrences</h2>";

        for (let i = 0; i < message.keywordList.length; ++i) {
          keywordResultsDiv.innerHTML += `<p>${message.keywordList[i]} occurs ${message.keywordOcurranceList[i]} times</p>`;
        }
      }
    });
});
