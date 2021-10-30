import React from "react";

const About = () => {
  return (
    <section className="about">
      <div class="about-section">
        <h1>WELCOME</h1>
        <h2>SpartantMeetup creates possibilities</h2>
        <p>
          SpartantMeetup is a platform for finding and building local
          communities. People use SpartantMeetup to meet new people, learn new
          things, find support, get out of their comfort zones, and pursue their
          passions, together.{" "}
        </p>
      </div>

      <div class="about-container">
        <div class="left">
          <h3> Leadership</h3>
          <p>
            Getting to know about organizing and leading groups and events to
            master leadership skills{" "}
          </p>
        </div>
        <div class="middle">
          <h3>Career </h3>
          <p>
            Creating chances to meet with other talented students to improves
            academic skills{" "}
          </p>
        </div>
        <div class="right">
          <h3> Connection </h3>
          <p>
            Providing the best place for SJSU students to gather and grow
            together{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
