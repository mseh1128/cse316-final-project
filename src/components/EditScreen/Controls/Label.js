import React from 'react';

export default function Label({
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
    <div
      className="box"
      style={{
        width,
        height,
        fontSize,
        color: textColor,
        backgroundColor,
        borderWidth: borderThickness,
        borderRadius,
        borderStyle: 'solid',
        borderColor
      }}
    >
      {text}
    </div>
  );
}
