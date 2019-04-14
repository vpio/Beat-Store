import React from 'react';
import BeatPlayer from './BeatPlayer.js';
import DashboardDrawer from './DashboardDrawer.js';

class Dashboard extends React.Component {
  state={
    items: 0
  }

  incrementItems = (e) => {
    e.stopPropagation()
    e.preventDefault();
    const {items} = this.state;
    this.setState({items: items + 1})
  }
  render() {
    return (
      <div>
        <DashboardDrawer items={this.state.items}/>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <BeatPlayer
            beats={this.props.beats}
            addItem={(e) => {this.incrementItems(e)}}
           />
         </div>
      </div>
    )
  }
}

export default Dashboard;
