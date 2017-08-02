import React from 'react';
import { Label, Icon } from 'semantic-ui-react';


const SubjectLabel =
({ subject, ...rest } : { subject: string, rest?: {} }) =>
  <Label color='green' {...rest}>
    <Icon name='idea' />
    {subject}
  </Label>
;

export default SubjectLabel;
