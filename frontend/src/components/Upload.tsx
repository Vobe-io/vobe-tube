import React, { Component } from 'react';
import cx from 'classnames';
import axios from 'axios';
import { Endpoints } from 'scripts/constants';

import Style from 'style/upload.module.sass';

enum UploadStatus {
  SELECTING,
  UPLOADING,
  PROCESSING,
  FINISHED,
  FAILED
}

interface Props {
  toggleUpload: () => void
}

interface State {
  status: UploadStatus
  progress: Number
  videoFile: string | null
}

class Upload extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      status: UploadStatus.SELECTING,
      progress: 0,
      videoFile: null
    }
  }

  upload = () => {
    const form: HTMLFormElement = document.querySelector<HTMLFormElement>('#uploadForm')!;
    const formData = new FormData(form);
    const videoInput: HTMLInputElement = document.querySelector<HTMLInputElement>('#videoInput')!;
    const thumbnailInput: HTMLInputElement = document.querySelector<HTMLInputElement>('#thumbnailInput')!;
    if (videoInput.files![0] !== undefined && thumbnailInput.files![0] !== undefined) {
      const config = {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.setState({ progress: percentCompleted });
          if (percentCompleted >= 100) this.setState({ status: UploadStatus.PROCESSING });
        }
      };
      axios.post(Endpoints.video, formData, config)
        .then(res => {
          this.setState({ status: UploadStatus.FINISHED });
        })
        .catch(err => {
          this.setState({ status: UploadStatus.FAILED });
        });
      this.setState({ status: UploadStatus.UPLOADING });
    } else alert("You have selected no Video or Thumbnail"); // Buggy redirect
  }

  renderStatus() {
    switch (this.state.status) {
      case UploadStatus.UPLOADING:
        return (<>
          <div>Uploading {this.state.progress}%</div>
        </>);
      case UploadStatus.PROCESSING:
        return (<>
          <div>Video is now getting processed, this might take some while</div>
        </>);
      case UploadStatus.FINISHED:
        return (<>
          <div className={Style.FinishedStatus}>Finished</div>
        </>);
      case UploadStatus.FAILED:
        return (<>
          <div className={Style.FailedStatus}>Failed</div>
        </>);
      default:
        return (this.renderUploadCreator());
    }
  }

  renderUploadCreator() {
    return (
      <form onSubmit={this.upload} className={Style.UploadForm} id="uploadForm">
        <label>
          Video:<br />
          <input className={Style.FileInput} id="videoInput" accept="video/*" type="file" name="videoFile" />
        </label>
        <label>
          Thumbnail:<br />
          <input className={Style.FileInput} id="thumbnailInput" accept="image/*" type="file" name="thumbnailFile" />
        </label>
        <div className={Style.InfoContainer}>
          <input className={cx(Style.TextArea, Style.VideoTitle)} type="text" spellCheck="false" autoComplete="off" name="name" placeholder="Name" />
          <hr className={Style.SepLine}/>
          <textarea className={cx(Style.TextArea, Style.VideoDescription)} spellCheck="true" autoComplete="off" name="description" placeholder="Description" />
        </div>
        <input type="submit" className={Style.UploadButton} value="Upload" />
      </form>
    );
  }

  render() {
    return (
      <div className={Style.Upload}>
        <div className={Style.Window}>
          {this.renderStatus()}
          <div onClick={this.props.toggleUpload} className={Style.CancelButton}>cancel</div>
        </div>
      </div>
    );
  }
}

export default Upload;