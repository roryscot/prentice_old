import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { dateTimeOptions } from '../../utils/dateTime';


import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';


class CardDisplay extends Component {
    static propTypes = {
        card: PropTypes.object,
        id: PropTypes.number,
    }

    state = {
        complete: this.props.card.complete,
        unSubmitted: true
    }

    switch = () => {
        this.setState({complete: !this.state.complete});
    }

    // setCompletenessValue() {
    //     // TODO: IMPLEMENT
    //     let headers = {"Content-Type": "application/json"};
    //     // let {token} = getState().auth;
    //     let {token} = this.props.auth;
    //     let body = JSON.stringify({
    //         complete: this.state.complete
    //     });

    //     if (token) {
    //         headers["Authorization"] = `Token ${token}`;
    //     }
    //     fetch("todo/:grouplist/:cardgroup/:cardID", {headers, body, method: "POST"})
    //     .then(res=>{
    //         if (res.status < 500) {
    //             return res.json().then(data => {
    //                 return this._fetchGroupList();
    //             });
    //         } else {
    //             console.log("Server Error!");
    //             throw res;
    //         }
    //     });
    // }

    render() {
        const { card, id } = this.props;
        const { card_title, description, due_date } = card;
        const className = this.state.complete ?
            "correct-answer" :
            "incorrect-answer";

        const formattedDate = new Date(due_date).toLocaleDateString("en-US", dateTimeOptions);

        return (
            <Card className="homework-card">
                <CardHeader>Due Date: <strong>{formattedDate}</strong></CardHeader>
                    <CardBody>
                    <CardTitle>{card_title}</CardTitle>
                    <CardText>{description}</CardText>
                    {/* TODO: Make edit button work */}
                    {/* TODO: Link assigments directly in cards */}

                    </CardBody>
                <CardFooter className={className}
                >
                    <input
                        type="checkbox"
                        id={card.card_title+id}
                        name={card.card_title}
                        onChange={this.switch}
                        checked={this.state.complete}
                    />
                    <label htmlFor={card.card_title+id}>Complete</label>
                    {
                        this.state.complete ?
                            (
                                this.state.unSubmitted ?
                                    <Button className="homework-card-button" onClick="">Submit</Button> :
                                    <Button className="homework-card-button">submitting...</Button>
                            ) :
                            <Button className="homework-card-button">Edit</Button>
                    }
                </CardFooter>
            </Card>
        );
    }
}

export default CardDisplay;