import React from 'react';
import { Segment, Image } from 'semantic-ui-react';

import Layout from './LayoutCenterSmall';

export default
(
  { location } :
  { location: { pathname: string } }
) =>
  <Layout>
    <Segment color='red' padded style={{ textAlign: 'center' }}>
      <Image src='/not-found.png' />
      <h3>No match for <code>{location.pathname}</code></h3>
    </Segment>
  </Layout>
;
