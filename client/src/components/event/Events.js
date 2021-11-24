import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';
import EventItem from './EventItem';
import Spinner from '../layout/Spinner';

const Events = ({
  getEvents,
  event: { events, loading },
}) => {
  useEffect(() => {
    getEvents()
  }, [getEvents]);

  return (
<Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <h1>Events</h1>
            <p className="lead">Join our Events Today</p>
            <div className="profiles">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventItem key={event._id} event={event} />
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
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  event: state.event
});
export default connect(mapStateToProps, { getEvents })(Events);