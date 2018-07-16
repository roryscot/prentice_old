import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TestDisplay from './CollapsingTestDisplay';

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

    render() {
        const allTests = this.props.tests;

        return (
            <div>
                <h2 className="minor">Test Results</h2>
                {
                    allTests.map(test => (
                        <TestDisplay
                            toggle={this.toggle}
                            test={test}
                            key={test.testNumber}
                            username={this.props.username}
                            allTestSectionsDisplayed={this.state.allTestSectionsDisplayed}
                            />
                    ))
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