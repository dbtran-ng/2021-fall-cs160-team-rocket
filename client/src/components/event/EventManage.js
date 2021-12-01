import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyEvents } from '../../actions/event';
import EventItemMe from './EventItemMe';
import Spinner from '../layout/Spinner';

const Events = ({ getMyEvents, event: { events, loading } }) => {
  useEffect(() => {
    getMyEvents();
  }, [getMyEvents]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <h1>YOUR Events</h1>
            <p className="lead">Find Your Events</p>
            <div className="profiles">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventItemMe key={event._id} event={event} />
                ))
              ) : (
                <h4>No Events in our Database</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Events.propTypes = {
  getMyEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, { getMyEvents })(Events);
