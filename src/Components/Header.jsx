import React, { Component } from 'react';


class Header extends Component {

    render() {
        return (<header id="main-header">
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <a className="logo" href="/">
                                <img className="fgflogo" src="/img/logos/White-Golden-Only-Name.png" alt="Fly Goldfinch" style={{ height: "40px" }} title="Fly Goldfinch" />
                            </a>
                        </div>
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-4" >
                            <div className="accOptions top-user-area clearfix">
                                <ul className="top-user-area-list list list-horizontal list-border">
                                    <li className="top-user-area-avatar">
                                        <a href="/myaccount">
                                            <img className="origin round" src="/img/spidy_50x50.jpg" alt="Alt text" title="AMaze" />
                                        Hi, John</a>
                                    </li>
                                    <li><a href="/logout">Sign Out</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>);
    }
}

export default Header;

