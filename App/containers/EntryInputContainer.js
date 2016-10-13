import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class EntryInputContainer extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    actionAddEntryToState: React.PropTypes.func.isRequired,
    actionRemoveEntryFromState: React.PropTypes.func.isRequired,
    entries: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string,
    buttonIcon: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    }

    this.handleAdd = this.handleAdd.bind(this);

  }

  handleAdd(event) {
    event.preventDefault();
    this.props.actionAddEntryToState(this.state.value);
    this.setState({
      value: '',
    })
  }

  handleRemove(entry) {
    this.props.actionRemoveEntryFromState(entry)
  }

  handleOnChange(value) {
    this.setState({
      value: value,
    })
  }

  render() {
    const {entries, label, buttonIcon, placeholder} = this.props;

    return (
      <div>
        <Form.Input
          label={label}
          onChange={(event) => this.handleOnChange(event.target.value) }
          value={this.state.value}
          action={{ icon: buttonIcon, onClick:this.handleAdd}}
          placeholder={placeholder}
         />
        <Labels entries={entries} onCloseClick={::this.handleRemove}/>
      </div>
    );

  }

}


const Labels = ({entries, onCloseClick}) =>
  <div className="ui labels">
    {entries.map(entry =>
        <span className="ui label" key={entry}>
          {entry}
          <i onClick={() => onCloseClick(entry)} className="icon close"></i>
        </span>
    )}
  </div>

Labels.propTypes = {
  entries: React.PropTypes.array,
  onCloseClick: React.PropTypes.func.isRequired,
}
