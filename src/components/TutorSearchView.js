import React, { Component } from 'react';
import { Search, Input, Form, Accordion } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';
import { push } from 'react-router-redux';

import { Range as _Range, createSliderWithTooltip } from 'rc-slider';
const Range = createSliderWithTooltip(_Range);

import 'rc-slider/assets/index.css';

import { getTutors } from '~/fetches';

import Layout from './LayoutCenterMedium';


class TutorSearchView extends Component {
  static defualtProps = {
    maxSliderWage: 50,
    minSliderWage: 0,
  }

  state = {
    subject: '',
    username: '',
    minWage: 0,
    maxWage: 50,
    zipCode: '',
    tutors: [],
    isLoading: false,
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.subject !== this.state.subject ||
      prevState.minWage !== this.state.minWage ||
      prevState.maxWage !== this.state.maxWage ||
      prevState.username !== this.state.username ||
      prevState.zipCode !== this.state.zipCode
    ) this.fetchTutors();
  }

  props: {
    maxSliderWage: ?number,
    minSliderWage: ?number,
    dispatch: Function,
  }


  fetchTutors =
    () => {
      this.setState({ isLoading: true });

      return getTutors({
        ...this.state,
        subjects: this.state.subject
          ? [this.state.subject]
          : undefined,
        zipCode: this.state.zipCode
          ? this.state.zipCode
          : undefined,
      })
        .then(tutors => this.setState({ tutors, isLoading: false }))
        .catch(console.log);
    }

  handleResultSelect = (_, result) => this.props.dispatch(push(`/create-appointment/${result.title}`))
  
  handleSearchChange = (_, value) => this.setState({ subject: value })

  handleSliderChange = ([minWage, maxWage]) => this.setState({ minWage, maxWage })

  handleUsernameChange = (_, { value }) => this.setState({ username: value })

  handleZipCodeChange = (_, { value }) => this.setState({ zipCode: value })

  render() {
    const { isLoading, tutors, subject, minWage, maxWage } = this.state;
    const { maxSliderWage, minSliderWage } = this.props;

    return (
      <Layout>
        <Accordion
          style={{ margin: '0 0 20px 0' }}
          styled
          fluid
          panels={[{
            title: 'Advanced',
            content: <div>
              <Form style={{ display: 'flex' }}>
                <Form.Group style={{ width: '100%' }}>
                  <Form.Field style={{ flex: 1 }}>
                    <label>Username</label>
                    <Input
                      placeholder='Billy Bob Joe the Tutero'
                      value={this.state.username}
                      onChange={this.handleUsernameChange}/>
                  </Form.Field>
                  <Form.Field style={{ flex: 1 }}>
                    <label>ZIP Code</label>
                    <Input
                      placeholder='90210'
                      value={this.state.zipCode}
                      onChange={this.handleZipCodeChange}/>
                  </Form.Field>
                </Form.Group>
              </Form>
              <div style={{ margin: '0px 15px 10px 15px' }}>
                <Range
                  max={maxSliderWage}
                  min={minSliderWage}
                  pushable={1}
                  allowCross={false}
                  step={1}
                  onChange={this.handleSliderChange}
                  defaultValue={[minSliderWage, maxSliderWage]}
                  value={[minWage, maxWage]}
                  marks={
                    {
                      [minSliderWage]: `$${minSliderWage}/hour`,
                      [maxSliderWage]: `$${maxSliderWage}/hour`,
                    }
                  }
                  tipFormatter={value => `$${value}/hour`}/>
              </div>
            </div>,
          }]} />

        <Search input={{ fluid: true }} fluid
          loading={isLoading}
          open={this.state.tutors.length !== 0}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={
            tutors.map(({
              username,
              wage,
              subjects,
            }) => ({
              title: username,
              price: `$${wage}/hour`,
              description: subjects.join(', '),
            }))
          }
          placeholder='Search a Subject!'
          value={subject} />
      </Layout>
    );
  }
}

export default connect()(TutorSearchView);
