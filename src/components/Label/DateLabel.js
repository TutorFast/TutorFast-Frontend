import React from 'react';
import { Label, Icon } from 'semantic-ui-react';


const DateLabel =
({ date, ...rest } : { date: string, rest?: {} }) =>
  <Label color='blue' {...rest}>
    <Icon name='calendar' />
    {new Date(date).toLocaleDateString()}
  </Label>
;

export default DateLabel;
