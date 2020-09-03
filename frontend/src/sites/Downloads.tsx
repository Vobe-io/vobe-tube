import React, { Component } from 'react';
import Style from 'style/downloads.module.sass';
import Header from 'components/Header';


class Downloads extends Component {
    render() {
        return(
            <div className={Style.Downloads}>
                <Header />
                Downloads
            </div>
        );
    }
}

export default Downloads;