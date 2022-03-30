import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], index: 0 };
    this._nodes = new Map();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd() {
    let startNumber = 0;
    if (this.state.items.length) {
      startNumber = this.state.items[this.state.items.length - 1];
    }

    let newItems = this.state.items.splice(0);
    for (let i = startNumber; i < startNumber + 100; i++) {
      newItems.push(i);
    }

    this.setState({ items: newItems });
  }

  handleRemove() {
    this.setState({ items: this.state.items.slice(1) });
  }

  handleShow(i) {
    this.setState({ index: i });
    const node = this._nodes.get(i);
    console.log(this._nodes);
    if (node) {
      ReactDOM.findDOMNode(node).scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }

  render() {
    return (
      <div className="relative flex space-x-4 overflow-x-auto">
        <ul className="h-24 bg-red-100 w-full">
          {this.state.items.map((item, i) => (
            <Item key={i} ref={(element) => this._nodes.set(i, element)}>
              {item}
            </Item>
          ))}
        </ul>
        {Array.from({ length: 32 }).map((item, index) => (
          <button
            className="flex flex-1 w-12 px-4 py-1 text-apps-primary"
            key={index}
            onClick={this.handleShow.bind(this, index)}>
            {index}
          </button>
        ))}
        {/* <button onClick={this.handleShow.bind(this, 50)}>50</button>
        <button onClick={this.handleShow.bind(this, 99)}>99</button> */}
        <button onClick={this.handleAdd}>Add</button>
        <button onClick={this.handleRemove}>Remove</button>
        {this.state.index}
      </div>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <li ref={(element) => (this.listItem = element)}>
        {this.props.children} test
      </li>
    );
  }
}

export default Dashboard;
