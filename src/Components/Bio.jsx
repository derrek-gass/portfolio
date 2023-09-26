import React, { Component } from "react";

class Bio extends Component {
    render() {
        if (this.props.bio) {
            var bioElements = this.props.bio.map((bioElement) => {
                if (bioElement.key === "headline") {
                    return (
                        <span key={bioElement.key} className="subheader">
                            {bioElement.text}
                            <br />
                        </span>
                    );
                }
                return (
                    <span key={bioElement.key} className="description">
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