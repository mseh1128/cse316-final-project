import React, { Component } from 'react';
// import { Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import {
  updateBorderRadius,
  updateBorderThickness,
  updateFontSize,
  updateTextColor,
  updateBackgroundColor,
  updateBorderColor,
  updateText
} from '../../store/actions/wireframeActions';

class WireframeProperties extends Component {
  onChange = (event, controlIdx) => {
    console.log('In on change event!');
    const re = /^[0-9\b]+$/;

    const target = event.target;
    const value = target.value;
    const targetName = target.name;

    if (
      targetName === 'fontSize' ||
      targetName === 'borderThickness' ||
      targetName === 'borderRadius'
    ) {
      console.log('REACHED HERE');
      if (value === '' || re.test(value)) {
        // console.log('TYPED A NUM');
        if (targetName === 'fontSize') {
          console.log('Updating font size');
          this.props.onUpdateFontSize(controlIdx, parseInt(value));
        } else if (targetName === 'borderThickness') {
          this.props.onUpdateBorderThickness(controlIdx, parseInt(value));
        } else if (targetName === 'borderRadius') {
          this.props.onUpdateBorderRadius(controlIdx, parseInt(value));
        } else {
          console.log('Something went wrong');
        }
      } else {
        console.log('DIDNT TYPE A NUM');
      }
    } else if (targetName === 'textContent') {
      this.props.onUpdateText(controlIdx, value);
    } else {
      console.log('must be a color picker');
      if (targetName === 'backgroundColorPicker') {
        console.log('Updating background color');
        this.props.onUpdateBackgroundColor(controlIdx, value);
      } else if (targetName === 'borderColorPicker') {
        console.log('Updating border color');
        this.props.onUpdateBorderColor(controlIdx, value);
      } else {
        console.log('Updating text color');
        this.props.onUpdateTextColor(controlIdx, value);
        // must be font color picker
      }
      // targetName is
    }
  };

  render() {
    const { selectedControlID } = this.props.wireframe;
    console.log('IN WIREFRAME PROPERTIES');
    console.log('selectedControlID is: ');
    console.log(selectedControlID);
    if (selectedControlID != null) {
      const controlIdx = this.props.wireframe.controls.findIndex(
        control => control.key === selectedControlID
      );
      const controlElement = this.props.wireframe.controls[controlIdx];
      console.log(controlElement);
      if (controlElement.type === 'container') {
        const {
          backgroundColor,
          borderColor,
          borderThickness,
          borderRadius
        } = controlElement;
        return (
          <div className="property-grid">
            <div className="property" style={{ marginTop: '30px' }}>
              <div className="property-text">Background: </div>
              <input
                name="backgroundColorPicker"
                type="color"
                value={backgroundColor}
                onChange={e => this.onChange(e, controlIdx)}
              />
            </div>
            <div className="property-border-color property">
              <div className="property-text">Border Color: </div>
              <input
                name="borderColorPicker"
                type="color"
                value={borderColor}
                onChange={e => this.onChange(e, controlIdx)}
              />
            </div>
            <div className="property-border-thickness property">
              <div className="property-text">Border Thickness: </div>

              <input
                type="number"
                name="borderThickness"
                onChange={e => this.onChange(e, controlIdx)}
                value={borderThickness}
                style={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  width: '20%',
                  paddingLeft: '10px',
                  color: 'black'
                }}
              />
            </div>
            <div className="property-border-radius property">
              <div className="property-text">Border Radius: </div>
              <input
                type="number"
                name="borderRadius"
                onChange={e => this.onChange(e, controlIdx)}
                value={borderRadius}
                style={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  width: '20%',
                  paddingLeft: '10px',
                  color: 'black'
                }}
              />
            </div>
          </div>
        );
      } else {
        const {
          text,
          fontSize,
          textColor,
          backgroundColor,
          borderColor,
          borderThickness,
          borderRadius
        } = controlElement;
        return (
          <div className="property-grid">
            <div className="property-display">
              <div className="property-text properties-text">Properties</div>
              <input
                onChange={e => this.onChange(e, controlIdx)}
                value={text}
                name="textContent"
                style={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  width: '60%',
                  paddingLeft: '10px',
                  color: 'black'
                }}
              />
            </div>
            <div className="property-font-size property">
              <div className="property-text">Font Size: </div>
              <input
                type="number"
                name="fontSize"
                onChange={e => this.onChange(e, controlIdx)}
                value={fontSize}
                style={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  width: '30%',
                  paddingLeft: '10px',
                  color: 'black'
                }}
              />
            </div>
            <div className="property-text-color property">
              <div className="property-text">Text Color: </div>
              <input
                name="textColorPicker"
                type="color"
                value={textColor}
                onChange={e => this.onChange(e, controlIdx)}
              />
            </div>
            <div className="property-background-color property">
              <div className="property-text">Background: </div>
              <input
                name="backgroundColorPicker"
                type="color"
                value={backgroundColor}
                onChange={e => this.onChange(e, controlIdx)}
              />
            </div>
            <div className="property-border-color property">
              <div className="property-text">Border Color: </div>
              <input
                name="borderColorPicker"
                type="color"
                value={borderColor}
                onChange={e => this.onChange(e, controlIdx)}
              />
            </div>
            <div className="property-border-thickness property">
              <div className="property-text">Border Thickness: </div>

              <input
                type="number"
                name="borderThickness"
                onChange={e => this.onChange(e, controlIdx)}
                value={borderThickness}
                style={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  width: '20%',
                  paddingLeft: '10px',
                  color: 'black'
                }}
              />
            </div>
            <div className="property-border-radius property">
              <div className="property-text">Border Radius: </div>
              <input
                type="number"
                name="borderRadius"
                onChange={e => this.onChange(e, controlIdx)}
                value={borderRadius}
                style={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  width: '20%',
                  paddingLeft: '10px',
                  color: 'black'
                }}
              />
            </div>
          </div>
        );
      }
      // return <div>IM NOT SURE WHAT I AM</div>;
    } else {
      return <div>nothing here</div>;
    }

    // return <div>Test</div>;
  }
}

const mapStateToProps = state => ({
  wireframe: state.wireframe
});

const mapDispatchToProps = dispatch => {
  return {
    onUpdateBorderRadius: (controlIdx, updatedBorderRadius) => {
      dispatch(updateBorderRadius(controlIdx, updatedBorderRadius));
    },
    onUpdateBorderThickness: (controlIdx, updatedBorderThickness) => {
      dispatch(updateBorderThickness(controlIdx, updatedBorderThickness));
    },
    onUpdateFontSize: (controlIdx, updatedFontSize) => {
      dispatch(updateFontSize(controlIdx, updatedFontSize));
    },
    onUpdateTextColor: (controlIdx, updatedTextColor) => {
      dispatch(updateTextColor(controlIdx, updatedTextColor));
    },
    onUpdateBackgroundColor: (controlIdx, updatedBackgroundColor) => {
      dispatch(updateBackgroundColor(controlIdx, updatedBackgroundColor));
    },
    onUpdateBorderColor: (controlIdx, updatedBorderColor) => {
      dispatch(updateBorderColor(controlIdx, updatedBorderColor));
    },
    onUpdateText: (controlIdx, updatedText) => {
      dispatch(updateText(controlIdx, updatedText));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WireframeProperties);
