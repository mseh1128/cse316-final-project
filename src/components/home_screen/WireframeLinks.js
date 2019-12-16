import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';

class WireframeLinks extends React.Component {
  render() {
    // console.log('In wireframe LINKS');
    const { wireframes } = this.props;
    if (!wireframes) {
      return <div>Has not finished loading yet!</div>;
    }

    return (
      <div className="todo-lists section">
        {wireframes &&
          wireframes.map(wireframe => (
            <Link to={'/wireframe/' + wireframe.key} key={wireframe.key}>
              <WireframeCard wireframe={wireframe} />
            </Link>
          ))}
      </div>
    );
  }
}

const dueDateSortComparator = (a, b) => {
  if (a.lastModified > b.lastModified) {
    return -1;
  }
  if (b.lastModified > a.lastModified) {
    return 1;
  }
  return 0;
};

const mapStateToProps = (state, ownProps) => {
  // console.log('wireframe screen state is: ');
  // console.log('MAP STATE TO PROPS FOR WIREFRAME LINKS');
  // console.log(state);

  let wireframes = null;
  if (!state.firestore.data || !state.firebase.auth) {
  } else {
    const userID = state.firebase.auth.uid;
    if (
      state.firestore.data.users != null &&
      userID &&
      state.firestore.data.users[userID]
    ) {
      wireframes = state.firestore.data.users[userID].wireframes;
      wireframes.sort(dueDateSortComparator);
    }
  }

  return {
    wireframes,
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(WireframeLinks);
