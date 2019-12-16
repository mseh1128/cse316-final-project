import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { updateWireframeHandler } from '../../store/database/asynchHandler';

class WireframeLinks extends React.Component {
  deleteWireframe = wireframeKey => {
    console.log('DELETE WIREFRAME CALLED');
    console.log(wireframeKey);
    const { wireframes } = this.props;
    const wireframeIdx = wireframes.findIndex(
      wireframe => wireframe.key === wireframeKey
    );
    wireframes.splice(wireframeIdx, 1);
    const { uid } = this.props.auth;
    this.props.onUpdateWireframeHandler(wireframes, uid);
  };

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
            <WireframeCard
              wireframe={wireframe}
              deleteWireframe={this.deleteWireframe.bind(this)}
            />
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWireframeHandler: (wireframes, uid) => {
      dispatch(updateWireframeHandler(wireframes, uid));
    }
  };
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  WireframeLinks
);
