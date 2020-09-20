import React, { Component } from 'react';

import Style from 'style/videoelement.module.sass';

interface Props {
  thumbnailURL: string,
  name: string
  width: number
  height: number
}

class VideoElement extends Component<Props> {
  render() {
    return (
      <div className={Style.Video} style={{ width: this.props.width, height: this.props.height }}>
        <img className={Style.Thumbnail} alt="thumbnail not found" src={this.props.thumbnailURL} />
        <div className={Style.Name}>{this.props.name}</div>
      </div>
    );
  }
}

export default VideoElement;