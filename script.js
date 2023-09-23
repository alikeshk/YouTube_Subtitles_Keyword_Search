var CONFIG = require('./config.json');

async function getYouTubeSubtitles() {
  const url = 'https://youtube-subtitles-captions-downloader.p.rapidapi.com/ytmp3/ytmp3/subtitles/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D-PiaN8nxark';
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
}