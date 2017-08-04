import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { push } from 'react-router-redux';
import { Dropdown, Header, Segment, Button, Divider, Label, Input } from 'semantic-ui-react';
import Layout from './LayoutCenterMedium';

import { pipe } from '~/util';
import { getUser, getOwnUser, createAppointment } from '~/fetches';

import TimeInput from 'time-input';
import DatePicker from 'react-datepicker';
import NumericInput from 'react-numeric-input';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';



class CreateAppointmentView extends Component {

    state = {
        loading: false,
        errors: [],
        tutorid: '',
        tutor: {},
        learner: {},
        startTime: '',
        hours: '0',
        date: moment(),
        startDate: new Date(),
        endDate: new Date(),
        cost: '0',
        location: '',
        subject: '',
        state: '',
    }

    static defaultProps = {
        
    }

    props: {
        token: string,
        onCreate: Function,
        user: {
            token: string,
        },
    }

    componentWillMount = () => {
        this.setState({ tutorid:  this.props.match.params.tutor });

        getOwnUser( this.props.user.token )
            .then(user => this.setState({ learner: user }))
        ;

        getUser({
            token: this.props.user.token,
            userid: this.props.match.params.tutor 
        })
            .then(user => this.setState({ tutor : user }))
        ;
    }

    componentDidMount = () => {

    }

    startTimeChangeHandler = ( value ) => {
        this.setState({ startTime : value });
    }

    onHoursChangeHandler = (value) => {
        this.setState({ hours : value });
        this.setState({ cost : (this.state.tutor.wage * value)});
    }

    onDateChangeHandler = (value) => this.setState({ date: value })

    onLocationChangeHandler = (_, { value }) => this.setState({ location : value })

    onDropdownChangeHandler = (e, data) => this.setState({ subject : data.value });
    
    handleSubmit = () => {

        const { learner, tutor, subject, location, startDate, endDate, cost, state} = this.state;
        console.log(`cost : ${this.state.cost}`);
        console.log(`subject : ${this.state.subject}`);
        console.log(`Number(cost) : ${Number(this.state.cost)}`);
        this.onSubmit({
            learner: learner,
            tutor: tutor,
            subject: subject,
            location: location,
            startDate: startDate,
            endDate: endDate,
            cost: Number(cost),
            state: state,
        });
    }

    onSubmit = (appointment) => {
        this.setState({ loading: true });

        return createAppointment({
            appointment: appointment,
            token: this.props.token,
        })
            .then(pipe(() => this.setState({ loading: false, errors: [] })))
            .then(({ appointment, token }) => this.props.onCreate(token, appointment))
            .catch(err => this.setState({ loading: false, errors: [err] }))
        ;
    }

    render() {
        var options = [{
            key: 'a',
            text: '',
            value: '',
        }];
        //TODO: clean this up
        var sub = [this.state.tutor.subjects].join(',');
        var subs = sub.split(',');
        options = subs.map(function(val) {
            return {
                key: val,
                text: val,
                value: val,
            };
        });

        return (
            <Layout>

                <Header 
                    as='h1'
                    content={"Creating appointment between " + this.state.tutor.username + " and " + this.state.learner.username }
                /> 

                <Segment>
                    <Dropdown
                        selection closeOnChange
                        options={options}
                        placeholder='Select Subject'
                        value={this.state.subject}  
                        onChange={this.onDropdownChangeHandler}
                    />
                    <Header 
                        as='h3'
                        dividing
                        content={"Choose a time, date, and place for your meeting."}
                    />
                    <Header
                        as='h5'
                        content="Start Time"
                    />
                    <TimeInput
                        value={this.state.startTime || '12:00 PM'}
                        onChange={this.startTimeChangeHandler}
                    />

                    <Header
                        as='h5'
                        content="Date"
                    />
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.onDateChangeHandler}
                    />

                    <Input 
                        fluid
                        placeholder="Meeting Location"
                        name='location'
                        onChange={this.onLocationChangeHandler}
                    />

                    <Label
                        size='medium'
                        content={"Tutor's wage: $" + this.state.tutor.wage + "/hr"}
                    />

                    <NumericInput
                        min={0}
                        max={10}
                        step={.5}
                        precision={2}
                        value={this.state.hours}
                        onChange={this.onHoursChangeHandler}
                        placeholder='Hours'
                    />

                    <Label
                        size='big'
                        color='blue'
                        content={"Total cost: $" + (this.state.cost || 0)}
                    />

                    <br/>
                    <br/>
                    <Button
                        content='Request an Appointment!'
                        color='green'
                        onClick={this.handleSubmit}
                    />

                </Segment>
            </Layout>
        );
    }


}

export default connect(
    ({ user }) => ({ user: user, token: user.token }),
    dispatch => ({
        onCreate: ( appointment, token ) => {

        }
    })
)(CreateAppointmentView)