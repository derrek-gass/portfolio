import { React, Component } from 'react';

import Bio from './Bio';

class About extends Component {
  render() {
    if (this.props.props) {
      var name = this.props.props.name;
      var profilepic = 'images/' + this.props.props.image;
      var bio = this.props.props.bio;
      var email = this.props.props.email;
      var resumeDownload = this.props.props.resumedownload;
    }

    return (
      <section id='about'>
        <div className='row'>
          <div
            className='three columns'
            style={{
              display: 'flex',
              justifyContent: 'right',
            }}>
            <img
              className='profile-pic'
              src={profilepic}
              alt='Derrek Gass Profile Pic'
            />
          </div>
          <div className='nine columns main-col'>
            <div className='row'>
              <div className='columns description'>
                <h2>About Me</h2>
                <Bio bio={bio} />
              </div>
            </div>

            <div className='row'>
              <div className='columns contact-details'>
                <h2>Contact Details</h2>
                <p className='address'>
                  <span>{name}</span>
                  <br />
                  <span>{email}</span>
                </p>
              </div>
              <div className='columns download'>
                <p>
                  <a
                    href={resumeDownload}
                    className='button'>
                    <i className='fa fa-download'></i>
                    Download Resume
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
