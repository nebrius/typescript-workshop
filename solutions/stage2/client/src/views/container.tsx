import { IMeme } from 'common';
import * as React from 'react';
import { MemeView } from './meme';
import { NewMemeView } from './new';

export interface IContainerProps {
  memes: IMeme[];
}

export interface IContainerState {
  isShowingNewDialog: boolean;
}

export class ContainerView extends React.Component<IContainerProps, IContainerState> {

  constructor(props: IContainerProps) {
    super(props);
    this.state = {
      isShowingNewDialog: false
    };

    // Performance optimization to prevent accidental re-renderings
    this.onNewClick = this.onNewClick.bind(this);
    this.onNewClose = this.onNewClose.bind(this);
  }

  public render() {
    let overlay: JSX.Element | undefined;
    if (this.state.isShowingNewDialog) {
      overlay = (<NewMemeView onClose={this.onNewClose}/>);
    }
    return (
      <div className="container">
        {overlay}
        <header className="container-header"><h1>My Giphy Gallery</h1></header>
        <button className="container-new" onClick={this.onNewClick}>Add New</button>
        <div className="container-content">
          {this.props.memes.map((meme) => (<MemeView meme={meme}></MemeView>))}
        </div>
      </div>
    );
  }

  private onNewClick() {
    this.setState({
      isShowingNewDialog: true
    });
  }

  private onNewClose() {
    this.setState({
      isShowingNewDialog: false
    });
  }
}
