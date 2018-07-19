import React, {Component} from 'react';
import {Tooltip} from 'reactstrap';
import IconTag from '../../custom/common/IconTag';
import { NOTES_ICON, STAR_ICON, TARGET_ICON, ALERT_ICON, QUESTION_ICON, TIME_ICON  } from 'assets/icons';

const MARKS = {
    "*": STAR_ICON,
    "time": TIME_ICON,
    "!": ALERT_ICON,
    "target": TARGET_ICON,
    "?": QUESTION_ICON
};

class TestSectionRow extends Component {
    state = {
        tooltipOpen: false
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
      }

    render() {
        {
            const { verisimilitude, questionNumber, studentAnswer, correctAnswer, theme, mark, tutornote} = this.props;
            return (
                <tr className={verisimilitude}>
                    <td>{questionNumber}</td>
                    <td>{studentAnswer}</td>
                    <td>{correctAnswer}</td>
                    <td>{theme}</td>
                    <td>
                        {
                            mark ?
                                <IconTag icon={MARKS[mark]}/> :
                                null
                        }
                    </td>
                    <td>
                        {
                            tutornote ?
                            <span id={this.props.uniqueKey}>
                                <IconTag icon={NOTES_ICON} />
                                <Tooltip isOpen={this.state.tooltipOpen} toggle={this.toggle} target={this.props.uniqueKey}>
                                    {tutornote}
                                </Tooltip>
                            </span>
                             :
                                null
                        }
                    </td>

                </tr>
            );
        };
    }
}

export default TestSectionRow;