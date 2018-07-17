import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Table,
    Collapse, Card
} from 'reactstrap';

import TestSectionRow from './TestSectionRow';
import IconTag from '../../custom/common/IconTag';
import { DisplaySectionToggler } from './DisplaySectionsToggle';

const TestSectionTable = (props) => {
    const {owner, allTestSectionsDisplayed, questions, studentAnswers, correctAnswers, themes, marks, tutornotes} = props;
    return (
        allTestSectionsDisplayed ?
            (
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{owner}{"'s Answer"}</th>
                                <th>Correct Answer</th>
                                <th>Theme</th>
                                <th>{owner}{"'s Mark"}</th>
                                <th>Tutor Note</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            questions.map(q => {
                                const verisimilitude = studentAnswers[q] === correctAnswers[q] ?
                                    "correct-answer" : "incorrect-answer";

                                return (
                                    <TestSectionRow
                                        key={`question${q}`}
                                        uniqueKey={`question${q}`}
                                        verisimilitude={verisimilitude}
                                        questionNumber={q}
                                        studentAnswer={studentAnswers[q]}
                                        correctAnswer={correctAnswers[q]}
                                        theme={themes[q]}
                                        mark={marks[q]}
                                        tutornote={tutornotes[q]}
                                    />
                                );

                            })
                        }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Number</th>
                                <th>{owner}{"'s Answer"}</th>
                                <th>Correct Answer</th>
                                <th>Theme</th>
                                <th>{owner}{"'s Mark"}</th>
                                <th>Tutor Note</th>
                            </tr>
                        </tfoot>
                    </Table>
                ) :
                    null
    );
};


class TestSectionDisplay extends Component {
    static propTypes = {
        allTestSectionsDisplayed: PropTypes.bool.isRequired,
        section: PropTypes.string.isRequired,
        convertedScore: PropTypes.number.isRequired,
        numQuestions: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    state = {
        collapse: false
    };

    render() {
        //if this.props.auth.user.type === student {
            const owner = this.props.username;
            // } else { owner = student }

            return (
                <div className="section-display border border-white rounded">

                     <Table>
                        <thead>
                            <tr>
                                <th><IconTag icon={this.props.icon} /></th>
                                <th>{this.props.section}</th>
                                <th className="section-header-display">Score: {this.props.convertedScore} -</th>
                                <th >({this.props.score} / {this.props.numQuestions})</th>
                                <th>
                                    <DisplaySectionToggler toggle={this.toggle} collapse={this.state.collapse}/>
                                </th>
                            </tr>
                        </thead>
                    </Table>
                    <Collapse isOpen={this.state.collapse}>
                        <Card className="collapse-card">
                    < TestSectionTable {...this.props} owner={owner}/>
                    <Table>
                        <tfoot>
                            <tr>
                                <th>{this.props.section}</th>
                                <th className="section-header-display">Score: {this.props.convertedScore} -</th>
                                <th >({this.props.score} / {this.props.numQuestions})</th>
                            </tr>
                        </tfoot>
                    </Table>
                    </Card>
                    </Collapse>
                </div>
            );
    }
}

export default TestSectionDisplay;