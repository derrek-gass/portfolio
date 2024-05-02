import React, { Component } from "react";

class Bio extends Component {
    render() {
        if (this.props.bio) {
            var bioElements = this.props.bio.map((bioElement) => {
                return (
                    <span key={bioElement.key} className="description">
                        <b>{bioElement.focus} &nbsp;</b>
                        {bioElement.text} <br />
                    </span>
                );
            })
        }

        return (
            <p>
                {bioElements}
            </p>
        );
    }
}

export default Bio;