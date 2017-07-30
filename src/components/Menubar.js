import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { signOut } from '~/actions';

const Menubar =
(
  {
    path,
    user,
    onItemClick,
    onSignOut,
    onProfile,
    } : {
    path: string,
    user: {},
    onItemClick: Function,
    onSignOut: Function,
    onProfile: Function,
  }
) =>
  <Menu pointing secondary size='large'>
    <Menu.Item header
      content={<span style={{ color: 'white' }}>Tutor<em>Fast</em></span>}
      name='/'
      color='blue'
      active={path === '/'}
      style={{ backgroundColor: 'dimgrey' }}
      onClick={onItemClick} />

    <Menu.Item
      content='Find a Tutor'
      name='/search'
      active={path === '/search'}
      onClick={onItemClick} />

    <Menu.Menu position='right'>
      {
        !user.token
          ? <Menu.Item
            content='Sign Up'
            name='/sign-up'
            active={path === '/sign-up'}
            onClick={onItemClick} />
          : null
      }

      {
        !user.token
          ? <Menu.Item
            content='Sign In'
            name='/sign-in'
            active={path === '/sign-in'}
            onClick={onItemClick} />
          : null
      }

      {
        user.token
          ? <Menu.Item
            content={user.username}
            name={'/user'}
            active={path === '/user'}
            onClick={onProfile} />
          : null
      }

      {
        user.token
          ? <Menu.Item
            content='Sign Out'
            onClick={onSignOut} />
          : null
      }
    </Menu.Menu>
  </Menu>
;

export default connect(
  ({ router, user }) => ({ path: router.location.pathname, user }),
  dispatch => ({
    onItemClick: (_, { name }) => dispatch(push(name)),
    onSignOut: () => {
      dispatch(signOut());
      dispatch(push('/'));
    },
    onProfile: () => dispatch(push('/user')),
  }),
)(Menubar);
