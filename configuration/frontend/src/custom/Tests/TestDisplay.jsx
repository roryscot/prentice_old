
import React from 'react';
import ReactCollapsingTable from 'react-collapsing-table';

import TestSectionDisplay from './TestSectionDisplay';

import { questionListMaker } from '../../utils/helperFunctions';

import {DisplaySectionToggler} from './DisplaySectionsToggle';

const TestDisplay = (props) => {
    const { allTestSectionsDisplayed } = props;
    const { testNumber, completed, convertedScore, sections} = props.test;
    const username = props.username;
    return (
        <div className="test-display border border-white rounded">
            <table>
                <thead >
                    <tr>
                        <th className="test-header-display">{testNumber}</th>
                        <th className="test-header-display">Score: {convertedScore}</th>
                        <th className="test-header-display">({completed})</th>
                        <th className="test-header-display">
                            <DisplaySectionToggler className="close" toggle={props.toggle} allTestSectionsDisplayed={allTestSectionsDisplayed}/>
                        </th>
                    </tr>

                </thead>

            </table>
            {
                sections.map(section => {
                    const {title, score, convertedScore, studentAnswers, correctAnswers, marks, themes, tutornotes} = section;
                    const questions = questionListMaker(section.numQuestions);
                    return (
                        <TestSectionDisplay
                            key={`${testNumber}: ${title}`}
                            section={title}
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

                            toggle={this.toggle} shown={props.shown} hidden={props.hidden}
                            allTestSectionsDisplayed={allTestSectionsDisplayed}

                        />
                    );
                })
            }
           <table>
                <tfoot >
                    <tr>
                        <th className="test-header-display">{testNumber}</th>
                        <th className="test-header-display">Score: {convertedScore}</th>
                        <th className="test-header-display">({completed})</th>

                    </tr>

                </tfoot>

            </table>
        </div>
    );
};

export default TestDisplay;