import React from 'react';
import { toast } from 'react-toastify';

import CloseToastButton from '../components/CloseToastButton';


export default (
  content: string,
  {
    onCloseButtonClick = console.log,
    closeButtonContent = 'Close',
    closeButtonType,
    type,
    ...rest
    } : {
    onCloseButtonClick: Function,
    closeButtonContent: any,
    closeButtonType?: string,
    type?: string,
    rest: {}
  }
) =>
  toast(content, {
    closeButton: <CloseToastButton
      content={closeButtonContent}
      onClick={onCloseButtonClick}
      {...closeButtonType ? { [closeButtonType]: true } : {}} />,
    type: type && toast.TYPE[type.toUpperCase()],
    position: toast.POSITION.BOTTOM_RIGHT,
    ...rest,
  })
;
