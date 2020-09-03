import React, { Component } from 'react';

import Style from 'style/sidebar.module.sass'

import { ReactComponent as Logo } from 'assets/logo_tube.svg';
import { Icon } from '@iconify/react';
import bxHomeAlt from '@iconify/icons-bx/bx-home-alt';
import bxHeart from '@iconify/icons-bx/bx-heart';
import bxTimeFive from '@iconify/icons-bx/bx-time-five';
import bxDownload from '@iconify/icons-bx/bx-download';
import bxSliderAlt from '@iconify/icons-bx/bx-slider-alt';
import { Link, useLocation } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className={Style.Sidebar}>
                <Logo className={Style.Logo} />
                <div className={Style.SidebarContainer}>
                    <div className={Style.SidebarTop}>
                        <SidebarElement to="/" icon={
                            <Icon icon={bxHomeAlt} />
                        } />
                        <SidebarElement to="/favorites" icon={
                            <Icon icon={bxHeart} />
                        } />
                        <SidebarElement to="/watched" icon={
                            <Icon icon={bxTimeFive} />
                        } />
                        <SidebarElement to="/downloads" icon={
                            <Icon icon={bxDownload} />
                        } />
                    </div>
                    <div className={Style.SidebarBottom}>
                        <div className={Style.Placeholder}></div>
                        <div className={Style.Placeholder}></div>
                        <div className={Style.Placeholder}></div>
                        <SidebarElement to="/settings" icon={
                            <Icon icon={bxSliderAlt} />
                        } />
                    </div>
                </div>
            </div>
        );
    }
}

const SidebarElement = (props: { to: string, icon: any }) => {
    const location = useLocation();
    return (
        <Link to={props.to} className={`${Style.IconContainer} ${location.pathname === props.to ? Style.IconSelected : ''}`}>
            {props.icon}
            <div className={Style.SelectionLine}></div>
        </Link>
    );
}

export default Sidebar;