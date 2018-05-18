import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

export default class EntryInputContainer extends Component {
    static propTypes = {
        label: PropTypes.string,
        actionAddEntryToState: PropTypes.func.isRequired,
        actionRemoveEntryFromState: PropTypes.func.isRequired,
        entries: PropTypes.array.isRequired,
        placeholder: PropTypes.string,
        buttonIcon: PropTypes.string,
        disabled: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };

        this.handleAdd = this.handleAdd.bind(this);

    }

    handleAdd(event) {
        event.preventDefault();

        if (this.state.value.trim() === '') {
            return;
        }

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
        const {entries, label, buttonIcon, placeholder, disabled} = this.props;

        return (
            <div>
                <Form.Input
                    label={label}
                    onChange={(event) => this.handleOnChange(event.target.value)}
                    value={this.state.value}
                    action={{icon: buttonIcon, onClick: this.handleAdd}}
                    placeholder={placeholder}
                    disabled={disabled}
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
                <i onClick={() => onCloseClick(entry)} className="icon close"/>
            </span>
        )}
    </div>;

Labels.propTypes = {
    entries: PropTypes.array,
    onCloseClick: PropTypes.func.isRequired,
};
