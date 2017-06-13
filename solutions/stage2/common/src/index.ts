export interface IMeme {
  name: string;
  url: string;
}

export interface IGetMemesPayload {
  memes: IMeme[];
}
