import React from 'react';
import { Label, Icon } from 'semantic-ui-react';


const TimeLabel =
({ date, ...rest } : { date: string, rest?: {} }) =>
  <Label color='yellow' {...rest}>
    <Icon name='clock' />
    {new Date(date).toLocaleTimeString()}
  </Label>
;

export default TimeLabel;
