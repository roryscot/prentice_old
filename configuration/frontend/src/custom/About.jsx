import React from 'react';
import {mockStudent, mockTutor, mockInstitution} from 'demos/devMock/devMock';

import { mockStudentTest3} from 'demos/devMock/mockTestResults';
import Page from 'components/Page';

import book from 'assets/img/book-1528240.jpg';
import mc from 'assets/img/mc.jpg';

import img1 from 'assets/img/bg/background_640-2.jpg';
import img2 from 'assets/img/bg/background_1920-17.jpg';
import {Notes, TestsContainer} from './';



import {
    Card,
    CardTitle,
    CardBody,
    CardImg,
    CardImgOverlay,
    CardText,
    CardLink,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Button,
  } from 'reactstrap';



const sampleTests = [mockStudentTest3];


class AboutPage extends React.Component {
    componentDidMount() {
        this.initialSuggestion;

    }
    initialSuggestion (container) {
        container.success(`Get immediate results!`, {
          closeButton: true,
        });
    }

    render() {
        let container;
        const userName = mockStudent.name.firstName;
        return (
            <Page id="about" className="article">
                <div className="content">
                    <div className="inner">
                        <h2 className="major">About</h2>
                        <hr/>
                        <Row>
                        <Col className="mb-3">
                            <Card>
                                <CardImg top src={book} />
                            </Card>
                        </Col>
                        </Row>
                        <p>
                                This app was inspired by a local tutoring company in the Bay Area.
                                Its purpose is to facilitate communication and organization in the education process.
                            </p>
                        <Row>
                            
                            <Col className="mb-3">
                                <Card>
                                <Card>
                                    <CardImg top src={img1} />
                                </Card>
                                <CardText>
                                Without this app, a tutoring company needs to keep track of student progress manually.
                                A tutor needs to write down and keep track of which tests were taken,
                                all of the missed questions, the commonly missed themes, the dates (in order to track progress over time),
                                and the incedental notes about tutoring sessions.
                                </CardText>
                                </Card>
                            </Col>
                              <Col className="mb-3">
                              <CardText>
                                With this app, the student can enter the answers directly into the database, and get results instantly about
                                which questions she missed, which themes she struggles with, and how her current results compare to her past results.
                                Tutors can chart the progress of all of their students.
                                And, business owners can easily track all of the activities of their tutors and students.
                                </CardText>
                                <Card>
                                    <CardImg top src={img2} />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
                <hr />
                <h4 className="Display-2">Examples</h4>

                <div id="examples">
                    <Row>
                        <Col>
                        <TestsContainer
                            tests={sampleTests}
                            username={userName}
                        />
                        </Col>
                        <Col className="mb-3">
                            <Card>
                                <CardImg top src={mc} />
                                <CardText>
                                    <h4 className="Display-3 center text-secondary">Multiple Choice Test</h4>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Page>
        );
    }
}

export default AboutPage;