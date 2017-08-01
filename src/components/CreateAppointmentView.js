import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { push } from 'react-router-redux';
import { Header, Segment, Button, Divider, } from 'semantic-ui-react';

import Layout from './LayoutCenterMedium';

class CreateAppointmentView extends Component {

    state = {
        tutor: '',
        learner: '',
    }

    static defaultProps = {
        
    }

    props: {
        /*tutor: {
            str: string,
            token: string,
        },
        user: {
            token: string,
        }*/
    }

    componentWillMount = () => {

    }

    componentDidMount = () => {
        this.setState({ tutor:  this.props.match.params.tutor });
    }

    render() {
        return (
            <div>
                <h1>{this.state.tutor}</h1>
            </div>
        );
    }


}

export default connect()(CreateAppointmentView)