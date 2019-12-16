import React, { Component } from 'react';
import { Modal, Button } from 'react-materialize';
import WireframeScreen from './WireframeScreen';
import WireframeControls from './WireframeControls';
import WireframeProperties from './WireframeProperties';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  deleteControl,
  initiateLocalWireframe,
  removeLocalWireframe
} from '../../store/actions/wireframeActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateWireframeHandler } from '../../store/database/asynchHandler';

class WireframeContainer extends Component {
  componentWillUnmount() {
    this.props.onRemoveLocalWireframe();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('In comp will receive props!');
  //   console.log(nextProps);
  //   if (this.props.auth.token !== nextProps.auth.token) {
  //     //make a api call here
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log('CWRP: In comp will receive props!');
    // console.log(nextProps);
    console.log('CWRP: this.props.wireframe');
    console.log(this.props.wireframe);
    console.log('CWRP: nextProps.globalWireframe');
    console.log(nextProps.globalWireframe);
    const wireframeEmpty =
      Object.entries(this.props.wireframe).length === 0 &&
      this.props.wireframe.constructor === Object;

    if (wireframeEmpty && nextProps.globalWireframe != null) {
      console.log('CWRP: GLOBAL WIREFRAME WAS NOT NULL!');
      const { wireframeIndex, allWireframes } = this.props;
      const { uid } = this.props.auth;
      if (allWireframes != null) {
        nextProps.globalWireframe.lastModified = new Date();
        allWireframes[wireframeIndex] = nextProps.globalWireframe;
        this.props.onUpdateWireframeHandler(allWireframes, uid);
      }
      this.props.onInitiateLocalWireframe(nextProps.globalWireframe);
      return;
    }
    if (!this.props.wireframe && nextProps.wireframe) {
      document.addEventListener('keydown', event => {
        const { controls, selectedControlID } = this.props.wireframe;
        if (
          event.key === 'Delete' &&
          this.props.wireframe.selectedControlID !== null
        ) {
          // ie if delete was pressed & wireframe element is selected
          // we want to find its index & send a delete command!
          const controlIdx = controls.findIndex(
            control => control.key === parseInt(selectedControlID)
          );
          console.log('delete control index is: ' + controlIdx);
          this.props.onDeleteControl(controlIdx);
        }
      });
    }
  }

  saveWireframeToDB = () => {
    console.log('Trying to save to database');
    const { wireframe, wireframeIndex, allWireframes } = this.props;
    const { uid } = this.props.auth;
    // console.log('uid is: ');
    // console.log(uid);
    allWireframes[wireframeIndex] = wireframe;
    this.props.onUpdateWireframeHandler(allWireframes, uid);
  };

  closeWireframe = () => {
    this.props.history.push('/');
  };

  checkWireframeChange = () => {
    const { wireframe, wireframeIndex, allWireframes } = this.props;
    if (allWireframes == null || wireframe == null) {
      return false;
    }
    delete allWireframes[wireframeIndex].lastModified;
    delete wireframe.lastModified;
    if (
      JSON.stringify(allWireframes[wireframeIndex]) !==
      JSON.stringify(wireframe)
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    // console.log('IN WIREFRAME CONTAINER RENDER');
    // console.log('props are: ');
    // console.log(this.props.wireframe);
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }

    if (!this.props.wireframe) {
      return <div>Still rendering!</div>;
    }

    return (
      <div className="wf-container">
        <div className="first-container">
          <WireframeControls
            saveWireframe={this.saveWireframeToDB}
            closeWireframe={this.closeWireframe}
            checkWireframeChange={this.checkWireframeChange.bind(this)}
          />
        </div>
        <div className="second-container">
          <WireframeScreen />
        </div>
        <div className="third-container">
          <WireframeProperties />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('IN MAP STATE TO PROPS IN WIREFRAME CONTAINER');
  // console.log('State is: ');
  // console.log(state);
  // console.log('Key is: ');
  let { key } = ownProps.match.params;
  key = parseInt(key);
  // console.log(key);
  let firestoreWireframe = null;
  let allWireframes;
  let wireframeIndex = null;
  if (!state.firestore.data || !state.firebase.auth) {
  } else {
    const userID = state.firebase.auth.uid;
    if (state.firestore.data.users != null && userID) {
      // console.log(state.firestore.data.users[userID]);
      // console.log(state.firestore.data.users[userID].wireframes);
      allWireframes = state.firestore.data.users[userID].wireframes;
      firestoreWireframe = state.firestore.data.users[userID].wireframes.find(
        indWireframe => indWireframe.key === key
      );
      wireframeIndex = state.firestore.data.users[userID].wireframes.findIndex(
        indWireframe => indWireframe.key === key
      );
    }
  }
  return {
    globalWireframe: firestoreWireframe,
    wireframe: state.wireframe,
    auth: state.firebase.auth,
    allWireframes,
    wireframeIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteControl: controlIdx => {
      dispatch(deleteControl(controlIdx));
    },
    onInitiateLocalWireframe: localWireframe => {
      dispatch(initiateLocalWireframe(localWireframe));
    },
    onUpdateWireframeHandler: (wireframes, uid) => {
      dispatch(updateWireframeHandler(wireframes, uid));
    },
    onRemoveLocalWireframe: () => {
      dispatch(removeLocalWireframe());
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: 'users'
    }
  ])
)(WireframeContainer);

// export default connect(mapStateToProps, mapDispatchToProps)(WireframeContainer);
