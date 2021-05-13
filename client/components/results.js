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
    socket.on('equation', res => {
      props.setResults(res)
    })
  }, [props.count])
  return (
    <div>
      <List component='ul' dense={true} className='listy'>
     {props.results ? props.results.map((result) => {
       if (props.results.indexOf(result) >= props.results.length - 10) {
       return <Fade key={result} in={true}><ListItem key={result}>
         <ListItemText primary={result} />
       </ListItem></Fade>
     } else {
       console.log('filtered result')
     }
    }).reverse()
     : <p>Nothing yet!</p>}
     </List>
    </div>
  )
}


export default Results
