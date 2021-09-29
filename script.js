const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
//Passing Joke to VoiceRSS API
function tellJoke(joke) {
  VoiceRSS.speech({
    //Public key
    key: '353a6ceebb314155837a9e75285f8d14',
    src: joke,
    hl: 'en-us',
    r: 0, 
    c: 'AAC',
    f: '44khz_16bit_stereo',
    ssml: false
  })
}
// Get Jokes from JokeAPI 
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //Getting two part jokes
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    };
    //Text-to-Speach Function
    tellJoke(joke);
    //Disable button
    toggleButton();
  } catch (error){
    //catch errors
    console.log("whoops", error)
  }
  
};

// Event Listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);