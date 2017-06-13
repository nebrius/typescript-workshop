import { IGetMemesPayload, IMeme } from 'common';
import { render } from './app';

const API_ENDPOINT = 'http://api.giphy.com/v1/gifs/';
const PUBLIC_BETA_KEY = 'dc6zaTOxFJmzC';

export function getMemes() {
  fetch('/api/memes')
    .then((res) => res.json())
    .then((data: IGetMemesPayload) => render(data.memes));
}

export function createMeme(name: string, search: string) {
  fetch(`${API_ENDPOINT}search?q=${encodeURIComponent(search)}&api_key=${PUBLIC_BETA_KEY}`)
    .then((giphyRes) => giphyRes.json())
    .then((data) => {
      const meme: IMeme = {
        name,
        url: data.data[0].embed_url
      };
      fetch('/api/memes', {
        body: JSON.stringify(meme),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => getMemes());
    });
}
