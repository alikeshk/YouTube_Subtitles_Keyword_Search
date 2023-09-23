(() => {
    let currentSearch = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, searchId } = obj;
    
        if (type === "NEW") {
          currentSearch = searchId;
          console.log(currentSearch);
          newSearchLoaded();
        }
    });
    
    const newSearchLoaded = async () => {
      if (typeof document !== undefined) {
        document.addEventListener("mouseover", function(event) {
          if (event.target.tagName !== "A" || !event.target.href.startsWith("https://www.youtube.com/watch?v=")) {return;}
          console.log(event.target.href);
          fetchYoutubeSubtitleData(event.target.href)
            .then(result => {
                // Use JSON.stringify() to convert the object to a JSON-formatted string
                const captions = JSON.stringify(result);
                //console.log(typeof captions);
                searchKeywords(captions, currentSearch);
                //console.log("Result as string:", captions);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
      }
    };
    
    const searchKeywords = async (captions, currentSearch) => {
        
    };
    
    async function getYouTubeSubtitles(url) {
      url = `https://youtube-subtitles-captions-downloader.p.rapidapi.com/ytmp3/ytmp3/subtitles/?url=${url}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': CONFIG.api_key,
          'X-RapidAPI-Host': 'youtube-subtitles-captions-downloader.p.rapidapi.com'
        }
      };
    
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    
      return result;
    }
})();