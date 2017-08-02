import React from 'react';
import { Label, Icon } from 'semantic-ui-react';


const TimespanLabel =
({ start, end, ...rest } : { start: string, end: string, rest?: {} }) =>
  <Label color='yellow' image {...rest}>
    <Icon name='clock' />
    {new Date(start).toLocaleTimeString()}
    <Label.Detail>
      <Icon name='angle double right' />
      {new Date(end).toLocaleTimeString()}
    </Label.Detail>
  </Label>
;

export default TimespanLabel;
