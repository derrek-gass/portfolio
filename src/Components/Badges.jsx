import React, { Component } from 'react';

class Badges extends Component {
    render() {

        if (this.props.data) {
            var badges = this.props.data.badges.map(
                function (badges) {
                    var skillImage = 'images/badges/' + badges.image;
                    return <div key={badges.title} className="columns badges-item">
                        <div className="item-wrap">
                            <img alt={badges.title} src={skillImage} />
                        </div>
                    </div>
                })
        }

        return (
            <section id="badges">
                <div className="row toolkit">
                    <div className="three columns header-col">
                        <h1><span>Toolkit</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        <div id="badges-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                            <div className="row item">
                                {badges}
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

export default Badges;
