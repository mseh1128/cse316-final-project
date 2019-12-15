import React from 'react';

class WireframeCard extends React.Component {
  render() {
    const { wireframe } = this.props;
    console.log('WireframeCard, wireframe.key: ' + wireframe.key);
    return (
      <div className="card z-depth-0 todo-list-link">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">
            {wireframe.name ? wireframe.name : 'Unknown'}
          </span>
        </div>
      </div>
    );
  }
}
export default WireframeCard;
