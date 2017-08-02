import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { push } from 'react-router-redux';
import { Header, Segment, Button, Divider, Label, Input } from 'semantic-ui-react';
import Layout from './LayoutCenterMedium';

import { pipe } from '~/util';
import { createAppointment } from '~/fetches';

import TimeInput from 'time-input';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';



class CreateAppointmentView extends Component {

    state = {
        loading: false,
        errors: [],
        tutor: '',
        learner: '',
        time: '',
        startDate: moment(),
        cost: '',
        hours: '',
        location: '',
    }

    static defaultProps = {
        
    }

    props: {
        onCreate: Function,
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

    onTimeChangeHandler = (val) => this.setState({ time: val });

    onDateChangeHandler = (val) => this.setState({ startDate: val });

    onLocationChangeHandler = (_, { value }) => this.setState({ location: value });  

    handleSubmit = () => {
        /*this.setState({
            
        });*/

        const { learner, tutor, location, startDate, endDate, cost} = this.state;
        this.onSubmit({
            learner: learner,
            tutor: tutor,
            location: location,
            startDate: startDate,
            endDate: endDate,
            cost: cost,
        });
    }

    onSubmit = (appointment) => {
        this.setState({ loading: true });

        return createAppointment(appointment)
            .then(pipe(() => this.setState({ loading: false, errors: [] })))
            .then(({ appointment, token }) => this.props.onCreate(token, appointment))
            .catch(err => this.setState({ loading: false, errors: [err] }))
        ;
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
                        content={"Choose a time, date, and place for your meeting..."}
                    />

                    <TimeInput
                        value={this.state.time || '12:00 PM'}
                        onChange={this.onTimeChangeHandler}
                    />

                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.onDateChangeHandler}
                    />

                    <Input 
                        fluid
                        placeholder="Meeting Location"
                        name='location'
                        onChange={this.onLocationChangeHandler}
                    />


                    <br/>
                    <Button
                        content='Create an Appointment!'
                        onClick={this.handleSubmit}
                    />

                </Segment>
            </Layout>
        );
    }


}

export default connect(
    () => ({}),
    dispatch => ({
        onCreate: (token, user) => {
            dispatch(push('/'));
        }
    }),
)(CreateAppointmentView)