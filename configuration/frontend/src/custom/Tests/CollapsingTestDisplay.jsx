import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TestSectionDisplay from './CollapsingTestSectionDisplay';
import { Collapse, Button, Table, Card } from 'reactstrap';

import { questionListMaker } from '../../utils/helperFunctions';

import { DisplayTestToggler } from './DisplaySectionsToggle';
import IconTag from '../../custom/common/IconTag';
import { TEST_ICON } from 'assets/icons';
import { TEST_STYLES, CARD_STYLES } from 'styles/cssConstants';

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
                        <thead className={TEST_STYLES.TEST_HEADER}>
                            <tr>
                                <th><IconTag icon={TEST_ICON}/></th>
                                <th >{testType}</th>
                                <th >{testNumber}</th>
                                <th >Score: {convertedScore}</th>
                                <th >({completed})</th>
                                <th>
                                    <DisplayTestToggler toggle={this.toggle} collapse={this.state.collapse}/>
                                </th>
                            </tr>

                        </thead>
                    </Table>
                <Collapse isOpen={this.state.collapse}>
                    <Card className={CARD_STYLES.CARD_DESIGN}>
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
                        <tfoot className={TEST_STYLES.SECTION_HEADER}>
                            <tr>
                                <th>{testNumber}</th>
                                <th>Score: {convertedScore}</th>
                                <th>({completed})</th>
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
                                            <th >{title}</th>
                                            <th >Score: {convertedScore}</th>
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
