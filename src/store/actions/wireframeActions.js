import {
  UPDATE_WIDTH,
  UPDATE_HEIGHT,
  UPDATE_DIMENSIONS,
  UPDATE_CONTROL_POSITION,
  UPDATE_CONTROL_SIZE,
  SELECT_CONTROL,
  ADD_CONTROL,
  UPDATE_FONT_SIZE,
  UPDATE_BORDER_THICKNESS,
  UPDATE_BORDER_RADIUS,
  UPDATE_TEXT_COLOR,
  UPDATE_TEXT,
  UPDATE_BACKGROUND_COLOR,
  UPDATE_BORDER_COLOR,
  DELETE_CONTROL,
  UPDATE_NAME,
  INITIATE_LOCAL_WIREFRAME
} from './types';

export const updateDimensions = () => {
  return {
    type: UPDATE_DIMENSIONS
  };
};

export const initiateLocalWireframe = localWireframe => {
  return {
    type: INITIATE_LOCAL_WIREFRAME,
    payload: localWireframe
  };
};

export const updateWidth = updatedWidth => {
  console.log('in update width');
  return {
    type: UPDATE_WIDTH,
    payload: updatedWidth
  };
};

export const updateHeight = updatedHeight => {
  return {
    type: UPDATE_HEIGHT,
    payload: updatedHeight
  };
};

export const deleteControl = controlIdx => {
  return {
    type: DELETE_CONTROL,
    payload: controlIdx
  };
};
export const updateFontSize = (controlIdx, updatedFontSize) => {
  return {
    type: UPDATE_FONT_SIZE,
    payload: [controlIdx, updatedFontSize]
  };
};

export const updateBorderThickness = (controlIdx, updatedBorderThickness) => {
  return {
    type: UPDATE_BORDER_THICKNESS,
    payload: [controlIdx, updatedBorderThickness]
  };
};

export const updateBorderRadius = (controlIdx, updatedBorderRadius) => {
  return {
    type: UPDATE_BORDER_RADIUS,
    payload: [controlIdx, updatedBorderRadius]
  };
};

export const updateTextColor = (controlIdx, updatedTextColor) => {
  return {
    type: UPDATE_TEXT_COLOR,
    payload: [controlIdx, updatedTextColor]
  };
};

export const updateText = (controlIdx, updatedText) => {
  return {
    type: UPDATE_TEXT,
    payload: [controlIdx, updatedText]
  };
};

export const updateName = updatedName => {
  return {
    type: UPDATE_NAME,
    payload: updatedName
  };
};

export const updateBackgroundColor = (controlIdx, updatedBackgroundColor) => {
  return {
    type: UPDATE_BACKGROUND_COLOR,
    payload: [controlIdx, updatedBackgroundColor]
  };
};

export const updateBorderColor = (controlIdx, updatedBorderColor) => {
  console.log('In update border color with value: ', updatedBorderColor);
  return {
    type: UPDATE_BORDER_COLOR,
    payload: [controlIdx, updatedBorderColor]
  };
};

export const addControl = newControl => {
  return {
    type: ADD_CONTROL,
    payload: newControl
  };
};

export const updateControlPosition = (controlIdx, updatedXPos, updatedYPos) => {
  return {
    type: UPDATE_CONTROL_POSITION,
    payload: [controlIdx, updatedXPos, updatedYPos]
  };
};

export const updateControlSize = (controlIdx, updatedWidth, updatedHeight) => {
  return {
    type: UPDATE_CONTROL_SIZE,
    payload: [controlIdx, updatedWidth, updatedHeight]
  };
};

export const setSelectedControl = selectedControlIdx => {
  return {
    type: SELECT_CONTROL,
    payload: selectedControlIdx
  };
};
