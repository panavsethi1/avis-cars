import React, { Component } from 'react';

class NotFoundPage extends Component{
    render() {
        return (<div className="container">
            <div className="row">
                <div className="mb30"></div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <p className="not-found text-hero">404</p>
                                <h1>Page is not found</h1>
                                <a className="btn btn-ghost btn-lg mt5 to-homepage" href="/"><i class="fas fa-chevron-circle-left"></i> to Homepage</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default NotFoundPage;