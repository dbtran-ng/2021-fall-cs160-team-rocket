import React from 'react';
import { Link } from 'react-router-dom';
import studentimg from '../../img/students.jpg';
export const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner container">
          <div className="row">
            <div className="col-5 landing-left">
              <h1>Together Everyone Achieves More</h1>
              <h4>Let's spartan up</h4>
              <p className="lead">Create a user profile</p>
              <div className="buttons">
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-7 landing-right">
              <img src={studentimg}></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;