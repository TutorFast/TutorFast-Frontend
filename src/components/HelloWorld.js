import React from 'react';
import { connect } from 'react-redux';
import { test } from '../actions';

const HelloWorld = (
  { onClick, list = ['default'] } :
  { onClick: Function, list: Array<string> }
) =>
  <div>
    <h1 onClick={onClick}> Hello sdk! </h1>
    <ul> {list.map(
      (itm, idx) => <li key={idx}> { itm } </li>
    )} </ul>
  </div>
;

export default connect(
  ({ test }) => ({ list: test }),
  dispatch => ({ onClick: () => dispatch(test('something')) }),
)(HelloWorld);
