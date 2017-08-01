import React from 'react';
import { Button } from 'semantic-ui-react';


const CloseToastButton = (
  { children, closeToast = () => {}, onClick, ...rest } :
  { children?: Array<{}> | {}, closeToast?: Function, onClick: Function, rest?: {} }
) =>
  <Button {...rest}
    onClick={() => {
      onClick();
      closeToast();
    }}>
    {children}
  </Button>
;

export default CloseToastButton;
