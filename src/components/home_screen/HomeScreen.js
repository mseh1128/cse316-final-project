import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks';

import { createWireframeHandler } from '../../store/database/asynchHandler';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  getLargestKey = arr => {
    if (arr && arr.length !== 0) {
      return Math.max.apply(
        Math,
        arr.map(function(o) {
          return o.key;
        })
      );
    }
    return -1;
  };

  handleNewWireframe = uid => {
    const largestKey = this.getLargestKey(this.props.wireframes);
    const keyIdx = largestKey + 1;
    // console.log('LARGEST KEY IS: ', largestKey);
    console.log('IN HANDLE NEW WIREFRAME');
    const { wireframes } = this.props;
    if (!wireframes) {
      const newWireframe = [
        {
          key: keyIdx,
          name: '',
          width: 500,
          height: 500,
          realWidth: 500,
          realHeight: 500,
          zoomFactor: '2',
          controls: [],
          updateDimensionsEnabled: false,
          selectedControlID: null
        }
      ];
      this.props.createNewWireframe(
        this.goToWireframeScreen,
        uid,
        newWireframe,
        keyIdx
      );
    } else {
      this.props.wireframes.push({
        key: keyIdx,
        name: '',
        width: 500,
        height: 500,
        realWidth: 500,
        realHeight: 500,
        zoomFactor: '2',
        controls: [],
        updateDimensionsEnabled: false,
        selectedControlID: null
      });
      this.props.createNewWireframe(
        this.goToWireframeScreen,
        uid,
        this.props.wireframes,
        keyIdx
      );
    }
  };

  goToWireframeScreen = wireframeKey => {
    console.log('In HERE');
    console.log('KEY WAS: ', wireframeKey);
    // updateStoreContents;
    this.props.history.push('/wireframe/' + wireframeKey);
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/login" />;
    }

    const { uid } = this.props.auth;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m4">
            <WireframeLinks />
          </div>

          <div className="col s8">
            <div className="banner">
              <br />
              Wireframer
            </div>

            <div className="home_new_list_container">
              <button
                className="home_new_list_button"
                onClick={() => this.handleNewWireframe(uid)}
              >
                Create a New Wireframe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('Home screen state is: ');
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
      console.log('in map state to props for home screen');
      console.log(userID);
      console.log(state.firestore.data.users[userID]);
      wireframes = state.firestore.data.users[userID].wireframes;
    }
  }
  return {
    wireframes,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => ({
  createNewWireframe: (cb, uid, newWireframeArr, key) =>
    dispatch(createWireframeHandler(cb, uid, newWireframeArr, key))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => [
    {
      collection: 'users'
    }
  ])
)(HomeScreen);
