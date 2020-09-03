import React, { Component } from 'react';
import Style from 'style/watched.module.sass';

import Header from 'components/Header';

class Watched extends Component {
    render() {
        return(
            <div className={Style.Watched}>
                <Header />
                Watched
            </div>
        );
    }
}

export default Watched;