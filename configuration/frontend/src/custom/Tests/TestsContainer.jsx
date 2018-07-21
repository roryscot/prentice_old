import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TestDisplay from './CollapsingTestDisplay';

import {
    Row,
    Col,
} from 'reactstrap';

class TestsContainer extends Component {
    static propTypes = {
        tests: PropTypes.arrayOf(PropTypes.shape({
            testNumber: PropTypes.string.isRequired,
            convertedScore: PropTypes.number.isRequired,
            completed: PropTypes.string.isRequired,
            sections: PropTypes.array.isRequired
        }))
    }

    state = {
        allTestsShown: true,
        testContainersShown: true,
        allTestSectionsDisplayed: this.props.allTestSectionsDisplayed || true,
    }

    toggle = () => {
		this.setState({
			allTestSectionsDisplayed: !this.state.allTestSectionsDisplayed
		});
    }

    columnMaker(tests) {
        let rows = [];
        let count=0;
        let col = [];
        for (let i in tests) {
            col.push(tests[i]);
            count++;
            if (count > 1) {
                rows.push(col);
                count = 0;
                col = [];
            } else if (i == tests.length-1) {
                rows.push(col);
            }

        }
        return rows;
    }

    render() {
        const allTests = this.columnMaker(this.props.tests);

        return (
            <div>
                {
                    allTests.map((row,i) => {

                        return (
                            <Row>
                                <Col>
                                    <TestDisplay
                                        toggle={this.toggle}
                                        test={row[0]}
                                        key={row[0].testNumber}
                                        username={this.props.username}
                                        allTestSectionsDisplayed={this.state.allTestSectionsDisplayed}
                                    />
                                </Col>
                                {
                                    row[1] ?
                                    <Col>
                                        <TestDisplay
                                            toggle={this.toggle}
                                            test={row[1]}
                                            key={row[1].testNumber}
                                            username={this.props.username}
                                            allTestSectionsDisplayed={this.state.allTestSectionsDisplayed}
                                        />
                                    </Col> : null
                                }
                            </Row>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        user: state.auth.user
    });
  };


export default connect(mapStateToProps)(TestsContainer);