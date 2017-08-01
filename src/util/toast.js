import React from 'react';
import { toast } from 'react-toastify';

import CloseToastButton from '../components/CloseToastButton';


export default (
  content: string,
  {
    onCloseButtonClick = console.log,
    closeButtonContent = 'Close',
    closeButtonIcon = 'close',
    closeButtonType,
    type,
    ...rest
    } : {
    onCloseButtonClick: Function,
    closeButtonContent: any,
    closeButtonIcon: string,
    closeButtonType?: string,
    type?: string,
    rest: {}
  }
) =>
  toast(content, {
    closeButton: <CloseToastButton image
      labelPosition='right'
      icon={closeButtonIcon}
      content={closeButtonContent}
      onClick={onCloseButtonClick}
      {...closeButtonType ? { [closeButtonType]: true } : {}} />,
    type: type && toast.TYPE[type.toUpperCase()],
    position: toast.POSITION.BOTTOM_RIGHT,
    ...rest,
  })
;
