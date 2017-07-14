import React, { Component } from 'react';
import { Search, Input, Accordion } from 'semantic-ui-react';
import { connect } from 'react-redux';
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
  }


  fetchTutors =
    () => {
      this.setState({ isLoading: true });

      return getTutors({
        ...this.state,
        subjects: this.state.subject
          ? [this.state.subject]
          : undefined,
      })
        .then(tutors => this.setState({ tutors, isLoading: false }))
        .catch(console.log);
    }

  handleResultSelect = (_, { result }) => this.setState({ subject: result })

  handleSearchChange = (_, value) => this.setState({ subject: value })

  handleSliderChange = ([minWage, maxWage]) => this.setState({ minWage, maxWage })

  handleUsernameChange = (_, { value }) => this.setState({ username: value })

  handleZipCodeChange = (_, { value }) => this.setState({ zipCode: value })

  render() {
    const { isLoading, tutors, subject, minWage, maxWage } = this.state;
    const { maxSliderWage, minSliderWage } = this.props;

    return (
      <Layout>
        <Accordion styled panels={[{
          title: 'Advanced',
          content: <div>
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
            <Input
              fluid
              placeholder='Billy Bob Joe the Tutero'
              value={this.state.username}
              onChange={this.handleUsernameChange}/>
            <Input
              fluid
              placeholder='90210'
              value={this.state.zipCode}
              onChange={this.handleZipCodeChange}/>
          </div>,
        }]} />

        <Search input={{ fluid: true }} fluid
          loading={isLoading}
          open
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={
            tutors.map(({
              username,
              rate,
              subjects,
            }) => ({
              title: username,
              price: `$${rate}/hour`,
              description: subjects.join(', '),
            }))
          }
          placeholder='Search a Subject!'
          value={subject} />
      </Layout>
    );
  }
}

export default connect(

)(TutorSearchView);
