import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

import type User from '~/types/User';


const TutorLabel =
({ tutor, ...rest } : { tutor: User, rest?: {} }) =>
  <Label {...rest}>
    <Icon name='book' />
    {tutor.username}
  </Label>
;

export default TutorLabel;
