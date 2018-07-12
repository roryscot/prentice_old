import React from "react";

const TextArea = (props) => {
    return (
        <textarea
            style={{textAlign: "center"}}
                name={"editedDescription"}
                value={this.state.editedDescription}
                onChange={this.onChange}
                required />
    );
};