import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Label from './Controls/Label.js';
import Container from './Controls/Container.js';
import TextButton from './Controls/TextButton.js';
import TextField from './Controls/TextField.js';
import {
  updateControlPosition,
  updateControlSize,
  setSelectedControl
} from '../../store/actions/wireframeActions';
import { Rnd } from 'react-rnd';

class WireframeScreen extends Component {
  constructor() {
    super();
    this.containerProps = React.createRef();
    this.state = { widthOverflow: false, heightOverflow: false };
    // this.onChange = this.onChange.bind(this)

    // this.onChange = this.onChange.bind(this)
  }

  prevClientHeight = null;
  prevScrollHeight = null;
  prevClientWidth = null;
  prevScrollWidth = null;

  onDragStart = () => {
    console.log('Started dragging this');
    console.log('Container props are');
    console.log(this.containerProps.current.clientHeight);
    // this.setState({activeDrags: ++this.state.activeDrags});
  };

  onDragStop = (e, d) => {
    const updatedXPos = d.x;
    const updatedYPos = d.y;

    console.log('Stopped dragging this');
    const controlIdx = this.props.wireframe.controls.findIndex(
      control => control.key === parseInt(d.node.id)
    );
    console.log('Control idx is: ' + controlIdx);
    this.props.onUpdateControlPosition(controlIdx, updatedXPos, updatedYPos);

    // this.setState({activeDrags: --this.state.activeDrags});
  };

  onResizeStop = (e, direction, ref, delta, position) => {
    // console.log(direction);
    console.log(ref.id);
    const controlIdx = this.props.wireframe.controls.findIndex(
      control => control.key === parseInt(ref.id)
    );
    console.log(ref.style.width);
    console.log(delta.width);
    console.log('Control idx is: ' + controlIdx);
    const { width, height } = ref.style;
    // console.log(position);
    this.props.onUpdateControlSize(controlIdx, width, height);
    // this.setState({
    //   width: ref.style.width,
    //   height: ref.style.height,
    //   ...position,
    // });
  };

  componentDidMount() {
    console.log('Container props are');
    this.updateHeightOverflow();
    this.updateWidthOverflow();
  }

  componentDidUpdate() {
    console.log('Component did update!');
    const {
      clientWidth,
      scrollWidth,
      clientHeight,
      scrollHeight
    } = this.containerProps.current;
    console.log('Client width is: ' + clientWidth);
    console.log('Prev client width is: ' + this.prevClientWidth);
    console.log('Client Height is: ' + clientHeight);
    console.log('Prev client Height is: ' + this.prevClientHeight);

    console.log('Scroll width is: ' + scrollWidth);
    console.log('Prev scroll width is: ' + this.prevScrollWidth);
    console.log('Scroll Height is: ' + scrollHeight);
    console.log('Prev scroll Height is: ' + this.prevScrollHeight);
    if (
      this.prevClientWidth !== clientWidth ||
      this.prevScrollWidth !== scrollWidth ||
      this.prevClientHeight !== clientHeight ||
      this.prevScrollHeight !== scrollHeight
    ) {
      this.updateWidthOverflow();
      this.updateHeightOverflow();
    } else {
    }
  }

  updateWidthOverflow = () => {
    const { clientWidth, scrollWidth } = this.containerProps.current;
    this.prevClientWidth = clientWidth;
    this.prevScrollWidth = scrollWidth;
    if (scrollWidth > clientWidth) {
      this.setState({ widthOverflow: true });
    } else {
      this.setState({ widthOverflow: false });
    }
  };

  updateHeightOverflow = () => {
    const { clientHeight, scrollHeight } = this.containerProps.current;
    this.prevClientHeight = clientHeight;
    this.prevScrollHeight = scrollHeight;
    if (scrollHeight > clientHeight) {
      this.setState({ heightOverflow: true });
    } else {
      this.setState({ heightOverflow: false });
    }
  };

  handleKeyPress = event => {
    console.log('Handling key press');
    console.log(event.key);
  };

  setSelectedControlAction = key => {
    console.log('KEY IS: ');
    console.log(key);
    this.props.onSetSelectedControl(key);
  };

  renderControls = controls => {
    const dragHandlers = {
      // onDragStart: this.onDragStart,
      onResizeStop: this.onResizeStop,
      onDragStop: this.onDragStop
    };
    return controls.map(control => {
      if (control.type === 'label') {
        console.log('Control type is label!');
        console.log(control);
        return (
          <Rnd
            default={{
              x: control.xPosition,
              y: control.yPosition,
              width: control.width,
              height: control.height
            }}
            id={control.key}
            bounds="parent"
            {...dragHandlers}
            onClick={() => this.setSelectedControlAction(control.key)}
          >
            <Label control={control} />
          </Rnd>
        );
      } else if (control.type === 'container') {
        return (
          <Rnd
            default={{
              x: control.xPosition,
              y: control.yPosition,
              width: control.width,
              height: control.height
            }}
            id={control.key}
            bounds="parent"
            {...dragHandlers}
            onClick={() => this.setSelectedControlAction(control.key)}
          >
            <Container control={control} />
          </Rnd>
        );
      } else if (control.type === 'textButton') {
        return (
          <Rnd
            default={{
              x: control.xPosition,
              y: control.yPosition,
              width: control.width,
              height: control.height
            }}
            id={control.key}
            bounds="parent"
            {...dragHandlers}
            onClick={() => this.setSelectedControlAction(control.key)}
          >
            <TextButton control={control} />
          </Rnd>
        );
      } else {
        return (
          <Rnd
            default={{
              x: control.xPosition,
              y: control.yPosition,
              width: control.width,
              height: control.height
            }}
            id={control.key}
            bounds="parent"
            {...dragHandlers}
            onClick={() => this.setSelectedControlAction(control.key)}
            onKeyPress={e => this.handleKeyPress(e)}
          >
            <TextField control={control} />
          </Rnd>
        );
        // type is text field
      }
    });
  };

  render() {
    const classes = ['outer-box'];
    const { realWidth, realHeight, controls } = this.props.wireframe;
    if (!this.state.heightOverflow) classes.push('no-height-overflow');
    if (!this.state.widthOverflow) classes.push('no-width-overflow');
    const classesAsStr = classes.join(' ');
    const controlComponents = this.renderControls(controls);
    console.log('Control components are: ');
    console.log(controlComponents);
    console.log('CLASS NAME IS:', classesAsStr);

    return (
      <div className={classesAsStr} ref={this.containerProps}>
        <div
          className="inner-box"
          style={{
            width: realWidth,
            height: realHeight
          }}
        >
          {controlComponents}
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
    onUpdateControlPosition: (controlIdx, updatedXPos, updatedYPos) => {
      dispatch(updateControlPosition(controlIdx, updatedXPos, updatedYPos));
    },
    onUpdateControlSize: (controlIdx, updatedWidth, updatedHeight) => {
      dispatch(updateControlSize(controlIdx, updatedWidth, updatedHeight));
    },
    onSetSelectedControl: selectedControlIdx => {
      dispatch(setSelectedControl(selectedControlIdx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WireframeScreen);
