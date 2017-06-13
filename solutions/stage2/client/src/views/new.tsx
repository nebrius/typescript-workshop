import * as React from 'react';
import { createMeme } from '../api';

export interface INewProps {
  onClose: () => void;
}

export interface INewState {
  name: string;
  search: string;
}

export class NewMemeView extends React.Component<INewProps, INewState> {

  constructor(props: INewProps) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
    this.onCreateClicked = this.onCreateClicked.bind(this);
    this.state = {
      name: '',
      search: ''
    };
  }

  public render() {
    return (
      <div className="new">
        <div className="new-inner">
          <h1>Add a New Meme</h1>
          <div>
            <label>Meme Name: <input type="text" value={this.state.name} onChange={this.onNameChange} /></label>
          </div>
          <div>
            <label>Giphy Search: <input type="text" value={this.state.search} onChange={this.onSearchChange} /></label>
          </div>
          <div>
            <button onClick={this.onCreateClicked}>Add</button>
            <button onClick={this.onCancelClicked}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  private onCreateClicked() {
    createMeme(this.state.name, this.state.search);
    this.props.onClose();
  }

  private onCancelClicked() {
    this.props.onClose();
  }

  private onNameChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      name: event.currentTarget.value
    });
  }

  private onSearchChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      search: event.currentTarget.value
    });
  }
}
