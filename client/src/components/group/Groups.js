import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroups } from "../../actions/group";
import GroupItem from "./GroupItem";
import Spinner from "../layout/Spinner";
const Groups = ({ getGroups, group: { groups, loading } }) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <h1>Groups</h1>
            <p className="lead">Join Groups to help you reach further </p>
            <div className="groups">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <GroupItem key={group._id} group={group} />
                ))
              ) : (
                <h4>No Groups in our Database</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});
export default connect(mapStateToProps, { getGroups })(Groups);
