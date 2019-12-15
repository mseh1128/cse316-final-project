import React, { Component } from 'react';
import WireframeScreen from './WireframeScreen';
import WireframeControls from './WireframeControls';
import WireframeProperties from './WireframeProperties';
import { connect } from 'react-redux';
import {
  deleteControl,
  initiateLocalWireframe
} from '../../store/actions/wireframeActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class WireframeContainer extends Component {
  constructor() {
    super();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('In comp will receive props!');
  //   console.log(nextProps);
  //   if (this.props.auth.token !== nextProps.auth.token) {
  //     //make a api call here
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    console.log('In comp will receive props!');
    console.log(nextProps);
    if (!this.props.localWireframe && nextProps.globalWireframe != null) {
      console.log('GLOBAL WIREFRAME WAS NOT NULL!');
      this.props.onInitiateLocalWireframe(nextProps.globalWireframe);
    }
    // need to update state
    // document.addEventListener('keydown', event => {
    //   const { controls, selectedControlID } = this.props.wireframe;
    //   if (
    //     event.key === 'Delete' &&
    //     this.props.wireframe.selectedControlID !== null
    //   ) {
    //     // ie if delete was pressed & wireframe element is selected
    //     // we want to find its index & send a delete command!
    //     const controlIdx = controls.findIndex(
    //       control => control.key === parseInt(selectedControlID)
    //     );
    //     console.log('delete control index is: ' + controlIdx);
    //     this.props.onDeleteControl(controlIdx);
    //   }
    // });
  }

  render() {
    // console.log('IN WIREFRAME CONTAINER RENDER');
    // console.log('props are: ');
    // console.log(this.props.wireframe);
    if (!this.props.wireframe) {
      return <div>Still rendering!</div>;
    } else {
      // mapDispatchToProps()
      return <div>Finised rendering now!</div>;
    }
    return (
      <div className="wf-container">
        <div className="first-container">
          <WireframeControls />
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
  console.log('IN MAP STATE TO PROPS IN WIREFRAME CONTAINER');
  console.log('State is: ');
  console.log(state);
  console.log('Key is: ');
  let { key } = ownProps.match.params;
  key = parseInt(key);
  console.log(key);
  let firestoreWireframe = null;
  if (!state.firestore.data || !state.firebase.auth) {
  } else {
    const userID = state.firebase.auth.uid;
    if (state.firestore.data.users != null && userID) {
      // console.log(state.firestore.data.users[userID]);
      console.log(state.firestore.data.users[userID].wireframes);
      firestoreWireframe = state.firestore.data.users[userID].wireframes.find(
        indWireframe => indWireframe.key === key
      );
    }
  }
  return {
    globalWireframe: firestoreWireframe,
    wireframe: state.wireframe,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteControl: controlIdx => {
      dispatch(deleteControl(controlIdx));
    },
    onInitiateLocalWireframe: localWireframe => {
      dispatch(initiateLocalWireframe(localWireframe));
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
