import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TestSectionDisplay from './CollapsingTestSectionDisplay';
import { Collapse, Button, Table, Card } from 'reactstrap';

import { questionListMaker } from '../../utils/helperFunctions';

import { DisplayTestToggler } from './DisplaySectionsToggle';
import IconTag from '../../custom/common/IconTag';
import { TEST_ICON } from 'assets/icons';

class TestDisplay extends Component {
    static propTypes = {
        allTestSectionsDisplayed: PropTypes.bool.isRequired,
        test: PropTypes.shape({
            testNumber: PropTypes.string.isRequired,
            completed: PropTypes.string.isRequired,
            convertedScore: PropTypes.number.isRequired,
            sections: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired,
                score: PropTypes.number.isRequired,
                convertedScore: PropTypes.number.isRequired,
                numQuestions: PropTypes.number.isRequired,
                studentAnswers: PropTypes.shape({}).isRequired,
                correctAnswers: PropTypes.shape({}).isRequired,
                themes: PropTypes.shape({}).isRequired,
                marks: PropTypes.shape({}).isRequired,
                tutornotes: PropTypes.shape({}).isRequired,
            })).isRequired,
        }).isRequired,

        username: PropTypes.string.isRequired,
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    state = {
        collapse: false
    };

    render() {
        const { allTestSectionsDisplayed, test, username } = this.props;
        const { testType, testNumber, completed, convertedScore, sections} = test;

        return (
            <div className="test-display border border-white rounded">
                <Table>
                        <thead >
                            <tr>
                                <th><IconTag icon={TEST_ICON}/></th>
                                <th className="test-header-display">{testType}</th>
                                <th className="test-header-display">{testNumber}</th>
                                <th className="test-header-display">Score: {convertedScore}</th>
                                <th className="test-header-display">({completed})</th>
                                <th>
                                    <DisplayTestToggler toggle={this.toggle} collapse={this.state.collapse}/>
                                </th>
                            </tr>

                        </thead>
                    </Table>
                <Collapse isOpen={this.state.collapse}>
                    <Card className="collapse-card">
                    {
                        sections.map(section => {
                            const {title, icon, score, convertedScore, studentAnswers, correctAnswers, marks, themes, tutornotes} = section;
                            const questions = questionListMaker(section.numQuestions);
                            return (
                                <TestSectionDisplay
                                    key={`${testNumber}: ${title}`}
                                    section={title}
                                    icon={icon}
                                    numQuestions={questions.length}
                                    score={score}
                                    convertedScore={convertedScore}
                                    questions={questions}
                                    studentAnswers={studentAnswers}
                                    correctAnswers={correctAnswers}
                                    themes={themes}
                                    marks={marks}
                                    tutornotes={tutornotes}
                                    username={username}

                                    allTestSectionsDisplayed={allTestSectionsDisplayed}


                                />
                            );
                        })
                    }
                    <Table>
                        <tfoot >
                            <tr>
                                <th className="test-header-display">{testNumber}</th>
                                <th className="test-header-display">Score: {convertedScore}</th>
                                <th className="test-header-display">({completed})</th>
                            </tr>
                        </tfoot>
                    </Table>
                    </Card>
                </Collapse>
                {
                    this.state.collapse ? null :
                        sections.map(section => {
                            const {title, icon, convertedScore} = section;

                            return (
                                <Table key={title}>
                                    <tfoot >
                                        <tr onClick={this.toggle}>
                                            <th><IconTag icon={icon}/></th>
                                            <th className="test-header-display">{title}</th>
                                            <th className="test-header-display">Score: {convertedScore}</th>
                                        </tr>
                                    </tfoot>
                                </Table>
                            );
                        }
                    )
                }
            </div>
        );
    }

}

export default TestDisplay;
