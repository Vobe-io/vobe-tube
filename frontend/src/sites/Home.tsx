import React, { Component } from 'react';
import Style from 'style/home.module.sass';

import Header from 'components/Header';

class Home extends Component {
    render() {
        return(
            <div className={Style.Home}>
                <Header />
                Home
            </div>
        );
    }
}

export default Home;