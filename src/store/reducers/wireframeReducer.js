import {
  UPDATE_WIDTH,
  UPDATE_HEIGHT,
  UPDATE_DIMENSIONS,
  UPDATE_CONTROL_POSITION,
  UPDATE_CONTROL_SIZE,
  SELECT_CONTROL,
  ADD_CONTROL,
  UPDATE_FONT_SIZE,
  UPDATE_BORDER_RADIUS,
  UPDATE_BORDER_THICKNESS,
  UPDATE_TEXT_COLOR,
  UPDATE_BACKGROUND_COLOR,
  UPDATE_BORDER_COLOR,
  UPDATE_TEXT,
  DELETE_CONTROL,
  INITIATE_LOCAL_WIREFRAME,
  REMOVE_LOCAL_WIREFRAME,
  UPDATE_NAME
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  console.log('In wireframe reducer');
  switch (action.type) {
    case INITIATE_LOCAL_WIREFRAME:
      return action.payload;
    case REMOVE_LOCAL_WIREFRAME:
      return {};
    case UPDATE_DIMENSIONS:
      return {
        ...state,
        realWidth: state.width,
        realHeight: state.height,
        updateDimensionsEnabled: false
      };
    case UPDATE_WIDTH:
      return {
        ...state,
        width: action.payload,
        updateDimensionsEnabled: true
      };
    case UPDATE_HEIGHT:
      return {
        ...state,
        height: action.payload,
        updateDimensionsEnabled: true
      };
    case UPDATE_TEXT:
      //controlIdx, updatedBorderRadius
      const updateTextControlIdx = action.payload[0];
      const updatedText = action.payload[1];
      const updatedTextNewState = { ...state };
      updatedTextNewState.controls[updateTextControlIdx]['text'] = updatedText;
      return updatedTextNewState;
    case UPDATE_NAME:
      //controlIdx, updatedBorderRadius
      return {
        ...state,
        name: action.payload
      };
    case UPDATE_BORDER_RADIUS:
      //controlIdx, updatedBorderRadius
      console.log('IN UPDATE BORDER RADIUS');
      const borderControlIdx = action.payload[0];
      const updatedBorderRadius = action.payload[1];
      const borderNewState = { ...state };
      borderNewState.controls[borderControlIdx][
        'borderRadius'
      ] = updatedBorderRadius;
      return borderNewState;
    case UPDATE_BORDER_THICKNESS:
      const borderThicknessControlIdx = action.payload[0];
      const updatedBorderThickness = action.payload[1];
      const borderThicknessNewState = { ...state };
      borderThicknessNewState.controls[borderThicknessControlIdx][
        'borderThickness'
      ] = updatedBorderThickness;
      return borderThicknessNewState;
    case UPDATE_FONT_SIZE:
      const fontSizeControlIdx = action.payload[0];
      const updatedFontSize = action.payload[1];
      const fontSizeNewState = { ...state };
      fontSizeNewState.controls[fontSizeControlIdx][
        'fontSize'
      ] = updatedFontSize;
      return fontSizeNewState;
    case UPDATE_CONTROL_POSITION:
      //controlIdx, updatedXPos, updatedYPos
      const controlIdx = action.payload[0];
      const updatedXPosition = action.payload[1];
      const updatedYPosition = action.payload[2];
      const newState = { ...state };
      newState.controls[controlIdx]['xPosition'] = updatedXPosition;
      newState.controls[controlIdx]['yPosition'] = updatedYPosition;
      return newState;

    case UPDATE_TEXT_COLOR:
      //controlIdx, textColor
      const textColorcontrolIdx = action.payload[0];
      const updatedTextColor = action.payload[1];
      const textColorNewState = { ...state };
      textColorNewState.controls[textColorcontrolIdx][
        'textColor'
      ] = updatedTextColor;
      return textColorNewState;

    case UPDATE_BACKGROUND_COLOR:
      //controlIdx, backgroundColor
      const backgroundColorControlIdx = action.payload[0];
      const updatedBGColor = action.payload[1];
      const BGColorNewState = { ...state };
      BGColorNewState.controls[backgroundColorControlIdx][
        'backgroundColor'
      ] = updatedBGColor;
      return BGColorNewState;

    case UPDATE_BORDER_COLOR:
      //controlIdx, borderColor
      console.log('in update border color reducer!');
      const borderColorcontrolIdx = action.payload[0];
      const updatedBorderColor = action.payload[1];
      const borderColorNewState = { ...state };
      borderColorNewState.controls[borderColorcontrolIdx][
        'borderColor'
      ] = updatedBorderColor;
      return borderColorNewState;

    case UPDATE_CONTROL_SIZE:
      //controlIdx, updatedWidth, updatedHeight
      const sizeControlIdx = action.payload[0];
      console.log('Size updated width is: ');
      console.log(action.payload[1]);
      const sizeUpdatedWidth = action.payload[1];
      const sizeUpdatedHeight = action.payload[2];
      const sizeNewState = { ...state };
      sizeNewState.controls[sizeControlIdx]['width'] = sizeUpdatedWidth;
      sizeNewState.controls[sizeControlIdx]['height'] = sizeUpdatedHeight;
      return sizeNewState;
    case SELECT_CONTROL:
      return {
        ...state,
        selectedControlID: action.payload
      };
    case ADD_CONTROL:
      return {
        ...state,
        controls: [...state.controls, action.payload]
      };
    case DELETE_CONTROL:
      //controlIdx, updatedWidth, updatedHeight
      console.log('IN DELETE CONTROL REDUCER!');
      const deleteControlIdx = action.payload;
      console.log('Control to delete is in index ', deleteControlIdx);
      const deleteControlNewState = { ...state };
      console.log(deleteControlNewState.controls);
      deleteControlNewState.controls.splice(deleteControlIdx, 1);
      deleteControlNewState.selectedControlID = null;
      return deleteControlNewState;
    default:
      return state;
  }
}
