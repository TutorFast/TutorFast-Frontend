import type User from './User';


export type Appointment = {
  learner: User,
  tutor: User,
  subject: string,
  location: string,
  startDate: Date,
  endDate: Date,
  cost: number,
  state: string,
  charge?: string,
};
