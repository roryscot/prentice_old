import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { dateTimeOptions } from '../../utils/dateTime';


import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class AssignmentDisplay extends Component {
    static propTypes = {
        assignment: PropTypes.object,
        id: PropTypes.number,
    }

    state = {
        complete: this.props.assignment.complete,
        unSubmitted: true,
        editing: false,
        updateAssignmentId: null,
        description: this.props.assignment.description,
        editedDescription: null,
        editModal: false,
        edited: false,
    }

    switchAssignmentCompleteness = () => {
        this.setState({complete: !this.state.complete});
    }

    selectForEdit = (id) => {
        console.warn(id);
        this.setState({
            editedDescription: this.state.description,
            updateAssignmentId: id,
            editing: true,
            unSubmitted:true,
        });
    }

    acceptEdit = () => {
        //local validate
        console.warn("Local change validation");

        this.setState({
            unSubmitted: true,
            editing: false,
            edited: true,
            updateAssignmentId: null,
            description: this.state.editedDescription,
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmitEdit = () => {
        console.warn("Implement Submit");
        this.setState({
            unSubmitted: false
        });
        new Promise ((resolve, reject) => {
            setTimeout(resolve, 2000, this.handleValidateData());
        }).then(() => {
            this.setState({
                unSubmitted: true,
                editing: false,
                edited: false,
            });
            this.resetState();
        });
    }

    handleValidateData = () => {
            console.warn("Implement ValidateData");
    }

    resetState = () => {
        this.setState({
            updateAssignmentId: null,
            editing: false,
            editedDescription: null
        });
    }

    submitNote = (e) => {
        e.preventDefault();
        this.handleValidateData();
        this.props.updateAssignment(this.state.description, this.state.updateAssignmentId)
            .then(this.resetState);
    }

    render() {
        const { assignment, id } = this.props;
        const { assignment_title, due_date } = assignment;
        const className = this.state.complete ?
            "correct-answer" :
            "incorrect-answer";

        const formattedDate = new Date(due_date).toLocaleDateString("en-US", dateTimeOptions);
        console.log(this.state);
        return (
            <Card className="homework-card">
                <CardHeader>Due Date: <strong>{formattedDate}</strong></CardHeader>
                    <CardBody>
                    <CardTitle>{assignment_title}</CardTitle>
                    <CardText>
                        {
                           this.state.editing ?
                                null :
                                this.state.description
                        }
                    </CardText>

                        {
                              this.state.editing ? (
                                <div>
                                <Modal isOpen={this.state.editing}  className="test">
                                  <ModalHeader >{assignment_title}</ModalHeader>
                                  <ModalBody>
                                        <textarea
                                            name="editedDescription"
                                            id=""
                                            value={this.state.editedDescription}

                                            onChange={this.onChange}
                                            required

                                        />
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button color="primary" onClick={this.acceptEdit}>Accept</Button>
                                    <Button color="secondary" onClick={this.resetState}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                              </div>
                              )
                             : null
                        }
                    {/* TODO: Link card description to assignment */}
                    </CardBody>
                <CardFooter className={className}
                >
                    <input
                        type="checkbox"
                        id={assignment.assignment_title+id}
                        name={assignment.assignment_title}
                        onChange={this.switchAssignmentCompleteness}
                        checked={this.state.complete}
                    />
                    <label htmlFor={assignment.assignment_title+id}>Complete</label>
                    {
                        !this.state.complete ?
                            this.state.edited ?
                            (
                                this.state.unSubmitted ?
                                    <Button color="warning" className="homework-card-button-right" onClick={this.handleSubmitEdit}>Submit</Button> :
                                    <Button color="info" className="homework-card-button-right" disabled>submitting...</Button>
                            ) :
                            <Button className="homework-card-button-right" onClick={() => this.selectForEdit(id)}>Edit</Button>
                        : null
                    }
                </CardFooter>
            </Card>
        );
    }
}

export default AssignmentDisplay;