//useEffect database query to get last 10 calculations
// //passing results as props to display
// import React from 'react'

// export const mathify = string => {}

// const Display = props => {}

// export default Display

const string = '9 + 4'
let array = string.split(' ')

array = array.map((val) => {
  if (!isNaN(parseInt(val))) {
    return parseInt(val)
  } else {
    return val
  }
})



console.log(array)
