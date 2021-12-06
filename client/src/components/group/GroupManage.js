import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyGroups } from '../../actions/group';
import GroupItemMe from './GroupItemMe';
import Spinner from '../layout/Spinner';

const GroupManage = ({ getMyGroups, group: { groups, loading } }) => {
  useEffect(() => {
    getMyGroups();
  }, [getMyGroups]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <h1>YOUR Groups</h1>
            <p className="lead">Find Your Groups</p>
            <div className="profiles">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <GroupItemMe key={group._id} group={group} />
                ))
              ) : (
                <h4>You don't have any Groups yet</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

GroupManage.propTypes = {
  getMyGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  group: state.group,
});
export default connect(mapStateToProps, { getMyGroups })(GroupManage);
