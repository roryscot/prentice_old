import React from 'react';

import {mockStudent, mockTutor, mockInstitution} from '../assets/devMock/devMock';

import { mockStudentTest3} from '../assets/devMock/mockTestResults';

import {Notes, TestsContainer} from './';

const sampleTests = [mockStudentTest3];


class AboutPage extends React.Component {
    render() {

        const userName = mockStudent.name.firstName;
        return (
            <div id="about">
                <div className="content">
                    <div className="inner">
                        <h2 className="major">About</h2>

                        <p>
                            This app was inspired by a local tutoring company in the Bay Area.
                            Its purpose is to facilitate communication and organization in the education process.
                        </p>
                        <p>
                            Without this app, a tutoring company needs to keep track of student progress manually.
                            A tutor needs to write down and keep track of which tests were taken,
                            all of the missed questions, the commonly missed themes, the dates (in order to track progress over time),
                            and the incedental notes about tutoring sessions.
                        </p>
                        <p>
                            With this app, the student can enter the answers directly into the database, and get results instantly about
                            which questions she missed, which themes she struggles with, and how her current results compare to her past results.
                            Tutors can chart the progress of all of their students.
                            And, business owners can easily track all of the activities of their tutors and students.
                        </p>
                    </div>

                </div>
                <hr />
                <div>
                    <h3>Examples:</h3>
                    <h4>Get immedtiate results!</h4>
                        <p>
                            Click the green {"'Expansion'"} symbol in the upper right corner of the visual tool to see the test results.
                        </p>

                        <TestsContainer
                            tests={sampleTests}
                            username={userName}
                        />
                        <Notes />
                </div>
            </div>
        );
    }
}

export default AboutPage;