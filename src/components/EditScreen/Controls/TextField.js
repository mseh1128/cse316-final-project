import React from 'react';

export default function TextField({
  control: {
    width,
    height,
    text,
    fontSize,
    textColor,
    backgroundColor,
    borderColor,
    borderThickness,
    borderRadius
  }
}) {
  console.log('In label');
  console.log(width);
  return (
    <input
      disabled
      placeholder={text}
      name="textField"
      style={{
        width,
        height,
        fontSize,
        color: textColor,
        backgroundColor,
        borderWidth: borderThickness,
        borderRadius,
        borderStyle: 'solid',
        borderColor,
        paddingLeft: '10px'
      }}
    />
  );
}
