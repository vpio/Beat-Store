import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';

library.add(faPlay, faStop)

class PlayButton extends React.Component {
  state = {
    clicked: false
  }

  handleClick = () => {
    const {clicked} = this.state;
    this.setState({clicked : !clicked})
    if (!this.state.clicked){
      this.props.startTrack()
    } else {
      this.props.stopTrack()
    }
  }

  render(){
    const {clicked} = this.state;
      return(
        <Button onClick={() => {
          this.handleClick()
        }}>{(clicked) ? <FontAwesomeIcon icon={'stop'} /> : <FontAwesomeIcon icon={'play'} />}</Button>
      )
  }
}

export default PlayButton;
