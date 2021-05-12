//useEffect database query to get last 10 calculations
// //passing results as props to display
import React from 'react'

const Results = (props) => {
  return (
    <div>
     {props.results ? props.results.map((result) => {
       return <p key={result}>{result}</p>
     }) : <p>Nothing yet!</p>}
    </div>
  )
}


export default Results
