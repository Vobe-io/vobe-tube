import React, { Component } from 'react';
import Style from 'style/header.module.sass';
import { Link } from "react-router-dom";

import { Icon } from '@iconify/react';
import bxSearch from '@iconify/icons-bx/bx-search';
import bxChevronDown from '@iconify/icons-bx/bx-chevron-down';

import profilePic from 'assets/jogi_loew.jpg';

class Header extends Component {
    render() {
        return (
            <div className={Style.Header}>
                <Search />
                <Profile />
            </div>
        );
    }
}

class Search extends Component {
    render() {
        return (
            <div className={Style.Search}>
                <Icon className={Style.SearchIcon} icon={bxSearch} />
                <input className={Style.TextField} type="text" placeholder="Search movies, actors, etc" />
            </div>
        );
    }
}

class Profile extends Component {
    render() {
        return (
            <div></div>
            /*<div className={Style.Profile}>
                <img className={Style.ProfilePic} alt="ProfilePicture" src={profilePic} />
                <div className={Style.ProfileInfo}>
                    <Link to="/profile" className={Style.ProfileHeader}>
                        <div className={Style.ProfileName}>Joachim Löw</div>
                        <Icon className={Style.ProfileMenuIcon} icon={bxChevronDown} />
                    </Link>
                    <div className={Style.ProfileEmail}>jogi@vobe.io</div>
                </div>
            </div>*/
        );
    }
}

export default Header;