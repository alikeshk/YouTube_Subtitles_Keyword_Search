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
          getYouTubeSubtitles(event.target.href)
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
        //console.log(typeof captions);
        const keyword_array = currentSearch.split(" ");
        const caption_array = captions.split(/[ \\ \n]+/);
        // console.log(keyword_array);
        // console.log(caption_array);
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
            'X-RapidAPI-Key': "df0b79cf34msh2d0491b41ffa7b5p1d2ce7jsnae46c0d35325",
            'X-RapidAPI-Host': 'youtube-subtitles-captions-downloader.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            result = await response.text();
            //console.log(result);
        } catch (error) {
            console.error(error);
        }
        
        return result;
    }
})();