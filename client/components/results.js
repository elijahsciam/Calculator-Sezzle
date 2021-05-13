//useEffect database query to get last 10 calculations
// //passing results as props to display
import React, {useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fade from '@material-ui/core/Fade';
import io from 'socket.io-client'
const socket = io(window.location.origin)



const Results = (props) => {

  useEffect(() => {
    socket.on('update-results', res => {
      if (res.length > 10) {
        res = res.slice(res.length - 10, res.length - 1)
      }
      console.log(res)
      props.setCalculations(res)
    })
  }, [props.count])

  // if (props.results) {
  //   var reversedResults = reverseMap(props.results)
  // }

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


export default Results
