import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { push } from 'react-router-redux';
import { Header, Segment, Button, Divider, Label } from 'semantic-ui-react';

import TimeInput from 'time-input';

import Layout from './LayoutCenterMedium';

class CreateAppointmentView extends Component {

    state = {
        tutor: '',
        learner: '',
        time: '',
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

    onTimeChangeHandler = (val) => {
        this.setState({ time: val });
        console.log(`${val}`);
    }

    render() {
        return (
            <Layout>

                <Header 
                    as='h1'
                    content={"Creating appointment between " + this.state.tutor + " and "  }
                /> 

                <Segment>
                    <Header 
                        as='h3'
                        dividing
                        content={"Choose a time for your meeting..."}
                    />
                    <TimeInput
                        value={this.state.time || '12:00 PM'}
                        onChange={this.onTimeChangeHandler}
                    />
                    

                </Segment>
            </Layout>
        );
    }


}

export default connect()(CreateAppointmentView)