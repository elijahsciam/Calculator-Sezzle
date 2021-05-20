//useEffect database query to get last 10 calculations
// //passing results as props to display
import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fade from '@material-ui/core/Fade';
import io from 'socket.io-client'
const socket = io(window.location.origin)



const Calculations = (props) => {

  useEffect(() => {
    socket.on('update-results', res => {
      if (res.length > 10) {
        res = res.slice(res.length - 10, res.length)
      }
      props.setCalculations(res)
    })
  }, [props.count])

  return (
    <div>
      <List component='ul' dense={true} className='listy'>
     {props.calculations ? props.calculations.map((result) => {
       return <Fade key={result} in={true}><ListItem key={result}>
         <ListItemText primary={result} />
       </ListItem></Fade>
    }).reverse()
     : <p>Nothing yet!</p>}
     </List>
    </div>
  )
}


export default Calculations
