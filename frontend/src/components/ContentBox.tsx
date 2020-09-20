import React, { Component } from 'react';

import Style from 'style/contentbox.module.sass';

interface Props {
  left?: any
  right?: any
  content: any
}

class ContentBox extends Component<Props> {
  render() {
    return(
      <div className={Style.ContentBox}>
        <div className={Style.Header}>
          <div>
            {this.props.left}
          </div>
          <div>
            {this.props.right}
          </div>
        </div>
        <div className={Style.Content}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default ContentBox;