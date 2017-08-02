import React from 'react';
import { Label } from 'semantic-ui-react';


const PriceLabel =
({ price, ...rest } : { price: number, rest?: {} }) =>
  <Label tag color='orange' {...rest}>
    ${price.toFixed(2)}
  </Label>
;

export default PriceLabel;
