import React, { Component } from 'react';

import Style from 'style/status.module.sass';
import { Endpoints } from 'scripts/constants'
import { api } from 'App';
import { commonFetch } from 'scripts/APIService';

type HealthResponse = {
  healthy: boolean;
}

class Status extends Component {

  componentDidMount() {
    commonFetch<HealthResponse>(Endpoints.health_check, api.request(undefined, "GET"), res => {
      if(res.Response.healthy) console.log("Server is healthy");
      else console.log("Something is wrong with the server");
    });
  }

  render() {
    return (
      <div className={Style.Status}>
        Status
      </div>
    );
  }
}

export default Status;