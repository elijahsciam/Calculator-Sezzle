//useEffect database query to get last 10 calculations
// //passing results as props to display
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fade from '@material-ui/core/Fade';



const Results = (props) => {
  return (
    <div>
      <List component='results'>
     {props.results ? props.results.map((result) => {
       return <Fade key={result} in={true}><ListItem key={result}>
         <ListItemText primary={result} />
       </ListItem></Fade>
     }) : <p>Nothing yet!</p>}
     </List>
    </div>
  )
}


export default Results
