import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { push } from 'react-router-redux';
import { Header, Segment, Button, Divider, } from 'semantic-ui-react';

import Layout from './LayoutCenterMedium';

class CreateAppointmentView extends Component {

    static defaultProps = {
        params: {
            tutorid: '',
        },
    }

    props: {
        params: {
            tutorid: string,
        },
        /*tutor: {
            str: string,
            token: string,
        },
        user: {
            token: string,
        }*/
}

    componentWillMount = () => {
        //this.props.tutorid = this.props.params.tutorid;
        console.log(`!${this.props.params.tutorid}.`);
        
    }

    componentDidMount = () => {
        //this.props.tutorid = this.props.params.tutorid;
        console.log(`----!${this.props.params.tutorid}.`);
        
    }

    render() {
        return (
            <div>
                <h1>{this.props.params.tutorid}</h1>
            </div>
        );
    }


}

export default connect()(CreateAppointmentView)