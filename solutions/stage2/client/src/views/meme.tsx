import { IMeme } from 'common';
import * as React from 'react';

export interface IMemeProps {
  meme: IMeme;
}

export const MemeView = (props: IMemeProps) => (
  <div className="meme">
    <iframe className="meme-iframe" src={props.meme.url}></iframe>
    <span>{props.meme.name}</span>
  </div>
);
