import { IMeme } from 'common';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContainerView } from './views/container';

export function render(memes: IMeme[]) {
  ReactDOM.render(
    <ContainerView memes={memes}></ContainerView>,
    document.getElementById('root')
  );
}
