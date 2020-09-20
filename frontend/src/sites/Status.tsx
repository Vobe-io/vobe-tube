import React, { Component } from 'react';

import Style from 'style/status.module.sass';
import { Endpoints } from 'scripts/constants'
import { api } from 'App';
import { commonFetch } from 'scripts/APIService';

type HealthResponse = {
  healthy: boolean
}

class Status extends Component<{}, HealthResponse> {

  constructor(props: {}) {
    super(props);
    this.state = {healthy: false};
  }

  componentDidMount() {
    commonFetch<HealthResponse>(Endpoints.health_check, api.request(undefined, "GET"), res => {
      this.setState({
        healthy: res.Response.healthy
      })
    });
  }

  render() {
    return (
      <div className={Style.Status}>
        <div className={`${Style.StatusText} ${this.state.healthy ? Style.StatusHealthy : Style.StatusNotHealthy}`}>
          {this.state.healthy ? 
          'Server is healthy' :
          'Server is not healthy'}
        </div>
      </div>
    );
  }
}

export default Status;