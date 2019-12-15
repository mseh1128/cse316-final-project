import React, { Component } from 'react';
import WireframeScreen from './WireframeScreen';
import WireframeControls from './WireframeControls';
import WireframeProperties from './WireframeProperties';
import { connect } from 'react-redux';
import { deleteControl } from '../../store/actions/wireframeActions';

class WireframeContainer extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
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

  render() {
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

const mapStateToProps = state => ({
  wireframe: state.wireframe
});

const mapDispatchToProps = dispatch => {
  return {
    onDeleteControl: controlIdx => {
      dispatch(deleteControl(controlIdx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WireframeContainer);
