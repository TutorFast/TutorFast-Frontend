import React from 'react';
import { connect } from 'react-redux';
import { Card, Label, Dimmer} from 'semantic-ui-react';

import ApproveAppointmentButton from './ApproveAppointmentButton';
import RejectAppointmentButton from './RejectAppointmentButton';

import TutorLabel from './Label/TutorLabel';
import LearnerLabel from './Label/LearnerLabel';
import TimespanLabel from './Label/TimespanLabel';
import DateLabel from './Label/DateLabel';
import SubjectLabel from './Label/SubjectLabel';
import PriceLabel from './Label/PriceLabel';
import LocationLabel from './Label/LocationLabel';

import type Appointment from '~/types/Appointment';
import type User from '~/types/User';


const AppointmentCard =
(
  {
    appointment,
    user,
    onApproved,
    onRejected,
    disabled = false,
    selected,
    dispatch,
    ...rest
    } :
  {
    appointment: Appointment,
    user: User,
    onApproved?: ({ appointment: Appointment, message: string }) => {},
    onRejected?: ({ appointment: Appointment, message: string }) => {},
    disabled?: boolean,
    selected?: boolean,
    rest?: {} }
) =>
  <Card raised={selected} style={selected ? { backgroundColor: 'lightyellow', zIndex: '1' } : {}}
    color={appointment.state === 'approved' ? 'green' : appointment.state === 'rejected' ? 'red' : null} 
    {...rest}>
    <Card.Content style={{ paddingTop: '40px' }}>
      <DateLabel size='tiny' attached='top left' date={appointment.startDate} />
      <TimespanLabel size='tiny' attached='top right' start={appointment.startDate} end={appointment.endDate}/>
      {appointment.state !== 'rejected' ? <PriceLabel style={{
        right: '-40px',
        top: '10px',
        position: 'absolute',
        transform: 'rotate(-30deg)',
      }} price={appointment.cost} /> : null}
      <Card.Header>
        <Label.Group size='large'>
          <LearnerLabel learner={appointment.learner} /> <SubjectLabel subject={appointment.subject} /> <TutorLabel tutor={appointment.tutor} />
        </Label.Group>
      </Card.Header>
      <Card.Meta>
        {appointment.state.toUpperCase()}
      </Card.Meta>
      <Card.Description>
        <LocationLabel location={appointment.location} />
      </Card.Description>
    </Card.Content>
    {appointment.state === 'proposed' && user._id === appointment.tutor._id
      ? <Card.Content extra>
        <div className='ui two buttons'>
          <ApproveAppointmentButton disabled={disabled} appointmentId={appointment._id} onApproved={onApproved} />
          <RejectAppointmentButton disabled={disabled} appointmentId={appointment._id} onRejected={onRejected} />
        </div>
      </Card.Content> : null}
  </Card>
;

export default connect(
  ({ user }) => ({ user }),
)(AppointmentCard);
