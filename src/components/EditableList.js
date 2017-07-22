import React, { Component } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';

class EditableList extends Component {
  defaultProps = {
    onChange: () => {},
  }

  state = {
    list: [...this.props.list],
  }

  props: {
    list: Array<string>,
    onChange: ?(list: Array<string>) => {},
  }

  handleRef = c => c ? c.focus() : null

  handleChange = (_, { name, value }) => {
    const nextList = this.state.list.map(
      (v, idx) => idx === name
        ? value
        : v
    );

    this.setState({
      list: nextList,
    });

    this.props.onChange([...nextList]);
  }

  handleRemove = (_, { name }) => {
    const nextList = this.state.list.filter(
      (_, idx) => idx !== name
    );

    this.setState({ list: nextList });

    this.props.onChange([...nextList]);
  }

  handleAdd = () => {
    const nextList = [...this.state.list, ''];

    this.setState({ list: nextList });

    this.props.onChange([...nextList]);
  }

  handleEnter = ev => ev.keyCode === 13 && this.handleAdd()

  render() {
    return (
      <div>
        {this.state.list.map((item, idx) =>
          <div key={idx} style={{ display: 'flex', marginBottom: '5px' }}>
            <Input style={{ flex: '1' }}
              value={item}
              action
              autoComplete='off'
              onChange={this.handleChange}
              onKeyDown={this.handleEnter}
              ref={this.handleRef}
              name={idx} />
            <Button attached='right' icon='trash' name={idx} onClick={this.handleRemove} />
          </div>
        )}
        <Button type='button' positive animated='fade' fluid onClick={this.handleAdd}>
          <Button.Content visible>
            <Icon name='add' />
          </Button.Content>
          <Button.Content hidden>
            Add Another Subject!
          </Button.Content>
        </Button>
      </div>
    );
  }
}

export default EditableList;
