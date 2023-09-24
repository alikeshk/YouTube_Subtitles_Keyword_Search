(() => {
    let currentSearch = "";
    var dict = new Object();
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
          if (dict[event.target.href.split("?")[1]] !== undefined) {
            console.log("grab from dict")
            searchKeywords(dict[event.target.href.split("?")[1]], currentSearch)
          } else {
            console.log("add to dict")
            getYouTubeSubtitles(event.target.href)
            .then(result => {
                // Use JSON.stringify() to convert the object to a JSON-formatted string
                const captions = JSON.stringify(result);
                searchKeywords(captions, currentSearch);
                dict[event.target.href.split("?")[1]] = captions;
            })
            .catch(error => {
                console.error("Error:", error);
            });
          }
        });
      }
    };
    
    const searchKeywords = async (captions, currentSearch) => {
        const keyword_array = currentSearch.split(" ");
        const caption_array = captions.split(/[ \\ \n]+/);
        const keyword_occurance_array = Array(keyword_array.length).fill(0);

        for (let i = 0; i < keyword_array.length; ++i) {
                let word_count = 0;
            for (let j = 0; j < caption_array.length; ++j) {
                if (keyword_array[i].toLowerCase().localeCompare(caption_array[j].toLowerCase()) === 0) {
                    word_count += 1;
                }
            }
            keyword_occurance_array[i] = word_count;
            console.log(`${keyword_array[i]} occurs ${word_count} times`);
        }
        chrome.runtime.sendMessage({keywordList: keyword_array, keywordOcurranceList: keyword_occurance_array});
    };
    
    async function getYouTubeSubtitles(url) {
        let result;
        url = `https://youtube-subtitles-captions-downloader.p.rapidapi.com/ytmp3/ytmp3/subtitles/?url=${url}`;
        const options = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': 'ef221161c5mshbf460fdf06f66bep1e6fecjsn059962a3d202',
            'X-RapidAPI-Host': 'youtube-subtitles-captions-downloader.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            result = await response.text();
        } catch (error) {
            console.error(error);
        }
        
        return result;
    }
})();