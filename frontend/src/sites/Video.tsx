import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';

import Style from 'style/video.module.sass';
import { Endpoints } from 'scripts/constants';
import { Video as VideoType } from 'scripts/types';

import Header from 'components/Header';
import ContentBox from 'components/ContentBox';

interface Params {
  id: string
}

interface Props extends RouteComponentProps<Params> {
}

interface State {
  video: VideoType
}

class Video extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      video: {
        id: "",
        name: "",
        description: ""
      }
    }
  }

  componentDidMount() {
    this.fetchVideo();
  }

  async fetchVideo() {
    axios.get(Endpoints.video + "/" + this.props.match.params.id + "/info")
      .then(res => {
        this.setState({ video: res.data });
      })
      .catch(err => console.log("error"));
  }

  render() {
    return (
      <div className={Style.Video}>
        <Header />
        <div className={Style.ContentContainer}>
          <video className={Style.Player} src={Endpoints.video + "/" + this.props.match.params.id} typeof="video/mp4" controls></video>
          <div className={Style.ContentBoxContainer}>
            <ContentBox
              left={<>Information</>}
              content={<div className={Style.ContentBoxContent}>
                <div className={Style.Name}>{this.state.video.name}</div>
                <div className={Style.Description}>{this.state.video.description}</div>
              </div>}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Video;