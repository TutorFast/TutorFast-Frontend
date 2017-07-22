import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

export default (
  { children } :
  { children: Array<{}> | {} }
) =>
  <Container fluid>
    <Row>
      <Col
        md={8} lg={6}
        offset={{ md: 2, lg: 3 }}>
        {children}
      </Col>
    </Row>
  </Container>
;
