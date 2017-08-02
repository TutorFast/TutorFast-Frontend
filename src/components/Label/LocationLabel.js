import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

import type User from '~/types/User';


const LocationLabel =
({ location, ...rest } : { location: string, rest?: {} }) =>
  <Label color='brown' {...rest}>
    <Icon name='globe' />
    {location}
  </Label>
;

export default LocationLabel;
