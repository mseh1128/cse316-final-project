import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

class WireframeCard extends React.Component {
  render() {
    const { wireframe, deleteWireframe } = this.props;
    return (
      <div className="card z-depth-0 todo-list-link">
        <div
          className="card-content grey-text text-darken-3"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Link
            to={'/wireframe/' + wireframe.key}
            key={wireframe.key}
            style={{ width: '80%', color: 'black' }}
          >
            <span className="card-title">
              {wireframe.name ? wireframe.name : 'Unknown'}
            </span>
          </Link>

          <Button
            flat
            node="button"
            waves="light"
            icon={<Icon>close</Icon>}
            style={{ width: '20%' }}
            onClick={() => deleteWireframe(wireframe.key)}
          />
        </div>
      </div>
    );
  }
}
export default WireframeCard;
