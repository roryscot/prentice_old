import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {notes} from "../redux/actions";


class Notes extends Component {
    static propTypes = {
        notes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                text: PropTypes.string
            })
        ),
        fetchNotes: PropTypes.func.isRequired,
        deleteNote: PropTypes.func.isRequired,
        updateNote: PropTypes.func.isRequired,
        addNote: PropTypes.func.isRequired,
    }

    state = {
        text: "",
        updateNoteId: null,
    }

    componentDidMount() {
        this.props.fetchNotes();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateNote = note => {
        return alert("Validate data not implemented!");
    }

    resetState = () => {
        this.setState({text: "", updateNoteId: null});
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({text: note.text, updateNoteId: id});
    }

    confirmDelete = (id) => {
        if (window.confirm("are you sure you want to delete this note?")) {
            this.props.deleteNote(id);
        }
        return;
    }

    submitNote = (e) => {
        e.preventDefault();
        this.validateNote();
        let operation = this.state.updateNoteId || this.state.updateNoteId === 0 ? this.props.updateNote : this.props.addNote;
        operation(this.state.text, this.state.updateNoteId)
            .then(this.resetState);
    }


  render() {
    return (
      <div>
        <h2>Notes</h2>
            <h3>Add new note</h3>
                <form onSubmit={this.submitNote}>
                    <input
                        name={"text"}
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={this.onChange}
                        required />
                    <input type="submit" value="Save Note" />
                    <button onClick={this.resetState}>Reset</button>
                </form>
        <table>
          <tbody>
            {
                this.props.notes.map((note,id) => (
                    <tr key={`note_${id}`}>
                        <td><button onClick={() => this.confirmDelete(id)} >delete</button></td>
                        <td>{note.text}</td>
                        <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>

                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
      notes: state.notes,
    };
  };

// Make actions available in props:
const mapDispatchToProps = dispatch => {
    return {
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
          return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
          dispatch(notes.deleteNote(id));
        },
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Notes);