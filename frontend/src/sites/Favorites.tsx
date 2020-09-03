import React, { Component } from 'react';
import Style from 'style/favorites.module.sass';

import Header from 'components/Header';

class Favorites extends Component {
    render() {
        return(
            <div className={Style.Favorites}>
                <Header />
                Favorites
            </div>
        );
    }
}

export default Favorites;