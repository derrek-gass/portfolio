import React, { Component } from "react";

class Bio extends Component {
    render() {
        if (this.props.bio) {
            var bioElements = this.props.bio.map((bioElement) => {
                if (bioElement.key === "headline"){
                    return <h3>{bioElement.text}</h3>
                }
                return (
                    <div>{bioElement.text}</div>
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