import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

import type User from '~/types/User';


const LearnerLabel =
({ learner, ...rest } : { learner: User, rest?: {} }) =>
  <Label {...rest}>
    <Icon name='student' />
    {learner.username}
  </Label>
;

export default LearnerLabel;
