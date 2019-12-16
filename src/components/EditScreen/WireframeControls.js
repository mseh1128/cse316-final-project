import React, { Component, Fragment } from 'react';
import { Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import {
  updateWidth,
  updateHeight,
  updateDimensions,
  addControl,
  updateName
} from '../../store/actions/wireframeActions';

class WireframeControls extends Component {
  componentDidMount() {
    console.log('Component mounted props are');
    console.log(this.props);
  }

  onChange = event => {
    console.log('Reached here atleast');
    const re = /^[0-9\b]+$/;

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const targetName = target.name;

    if (targetName === 'width' || targetName === 'height') {
      if (value === '' || re.test(value)) {
        // console.log('TYPED A NUM');
        if (targetName === 'width') {
          // this.setState({ width: value, updateDimensionsEnabled: true });
          console.log('Sending width dispatcer');
          this.props.onUpdateWidth(parseInt(value));
        } else {
          // this.setState({ height: value, updateDimensionsEnabled: true });
          this.props.onUpdateHeight(parseInt(value));
        }
      } else {
        console.log('DIDNT TYPE A NUM');
      }
    } else {
      // update name of wireframe
      this.props.onUpdateName(value);
      // update other stuff here, if there is other stuff!
    }
  };

  submitDimensions = () => {
    const { width, height } = this.props.wireframe;
    if (width < 1 || width > 5000 || height < 1 || height > 5000) {
      console.log('Invalid values were given');
    } else {
      console.log('submit dimensions was successful!');
      this.props.onUpdateDimensions();
    }
  };

  createDefaultLabel = () => {
    return {
      type: 'label',
      xPosition: 0,
      yPosition: 0,
      width: 80,
      height: 30,
      fontSize: 14,
      textColor: '#000000',
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      borderThickness: 0,
      borderRadius: 0,
      text: 'I am a label'
    };
  };

  createDefaultContainer = () => {
    return {
      type: 'container',
      xPosition: 0,
      yPosition: 0,
      width: 150,
      height: 100,
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
      borderThickness: 2,
      borderRadius: 0
    };
  };

  createDefaultTextButton = () => {
    return {
      type: 'textButton',
      xPosition: 0,
      yPosition: 0,
      width: 120,
      height: 40,
      fontSize: 22,
      textColor: '#000000',
      backgroundColor: '#E6E6E6',
      borderColor: '#000000',
      borderThickness: 1,
      borderRadius: 0,
      text: 'Submit'
    };
  };

  createDefaultTextField = () => {
    return {
      type: 'textField',
      xPosition: 0,
      yPosition: 0,
      width: 100,
      height: 30,
      fontSize: 18,
      textColor: '#000000',
      backgroundColor: '#FFFFFF',
      borderColor: 'black',
      borderThickness: 1,
      borderRadius: 1,
      text: 'Input'
    };
  };

  getLargestKey = () => {
    const { controls } = this.props.wireframe;
    console.log(controls);
    if (controls && controls.length !== 0) {
      return Math.max.apply(
        Math,
        controls.map(function(o) {
          return o.key;
        })
      );
    }
    return -1;
  };

  addNewControl = controlType => {
    let controlToAdd = null;
    if (controlType === 'label') {
      controlToAdd = this.createDefaultLabel();
    } else if (controlType === 'container') {
      controlToAdd = this.createDefaultContainer();
    } else if (controlType === 'textButton') {
      controlToAdd = this.createDefaultTextButton();
    } else {
      controlToAdd = this.createDefaultTextField();
    }
    console.log('largest key is: ');
    console.log(this.getLargestKey());
    controlToAdd['key'] = this.getLargestKey() + 1;

    this.props.onAddControl(controlToAdd);
    // dispatch action here!
  };

  render() {
    let updateDimenionsBtn = null;
    const {
      width,
      height,
      name,
      updateDimensionsEnabled
    } = this.props.wireframe;
    // const { width, height } = this.props.wireframe;
    if (updateDimensionsEnabled) {
      updateDimenionsBtn = (
        <Button
          node="button"
          style={{
            marginRight: '5px'
          }}
          waves="light"
          onClick={this.submitDimensions}
        >
          Update Dimensions
        </Button>
      );
    } else {
      updateDimenionsBtn = (
        <Button
          disabled
          node="button"
          style={{
            marginRight: '5px'
          }}
          waves="light"
          // onClick={() => onUpdateDimensions()}
        >
          Update Dimensions
        </Button>
      );
    }
    return (
      <Fragment>
        <div className="wireframe-properties">
          <Button
            flat
            node="button"
            waves="light"
            icon={<Icon>zoom_in</Icon>}
          />
          <Button
            flat
            node="button"
            waves="light"
            icon={<Icon>zoom_out</Icon>}
          />
          <Button
            onClick={() => this.props.saveWireframe()}
            flat
            node="button"
            waves="light"
          >
            Save
          </Button>
          <Button flat node="button" waves="light">
            Close
          </Button>
        </div>
        <div className="wireframe-dimensions">
          <div>
            Wireframe Name:
            <input
              value={name}
              onChange={this.onChange}
              name="wireframe-name"
            />
          </div>
          <div>
            Wireframe Width:
            <input
              type="number"
              value={width}
              onChange={this.onChange}
              name="width"
            />
          </div>
          <div>
            Wireframe Height:
            <input
              type="number"
              value={height}
              onChange={this.onChange}
              name="height"
            />
          </div>
          {updateDimenionsBtn}
        </div>
        <div className="wireframe-control-list">
          <div
            className="wireframe-control"
            onClick={() => this.addNewControl('container')}
          >
            <div className="example-container" />
            <div className="example-control-text">Container</div>
          </div>
          <div
            className="wireframe-control"
            onClick={() => this.addNewControl('label')}
          >
            <div> Prompt for Input:</div>
            <div className="example-control-text">Label</div>
          </div>
          <div
            className="wireframe-control"
            onClick={() => this.addNewControl('textButton')}
          >
            <Button
              style={{
                backgroundColor: '#E6E6E6',
                border: '1px solid black',
                color: 'black',
                fontWeight: '500',
                width: '120px'
              }}
              node="button"
            >
              Submit
            </Button>
            <div className="example-control-text">Button</div>
          </div>
          <div onClick={() => this.addNewControl('textField')}>
            <input
              disabled
              placeholder="Input"
              style={{
                border: '1px solid black',
                borderRadius: '5px',
                width: '60%',
                paddingLeft: '10px'
              }}
            />
            <div className="example-control-text">Textfield</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wireframe: state.wireframe
});

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWidth: updatedWidth => {
      dispatch(updateWidth(updatedWidth));
    },
    onUpdateHeight: updatedHeight => {
      dispatch(updateHeight(updatedHeight));
    },
    onUpdateDimensions: () => {
      dispatch(updateDimensions());
    },
    onAddControl: newControl => {
      dispatch(addControl(newControl));
    },
    onUpdateName: updatedName => {
      dispatch(updateName(updatedName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WireframeControls);
