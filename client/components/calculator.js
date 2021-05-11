import React, {useState, useEffect} from 'react'
// import Display, {mathify} from './display'

const Calculator = () => {
  let [currentDisplay, setCurrentDisplay] = useState('')
  let [results, setResults] = useState() //add them to database when setResults

  const logo = (
    <img
      src="http://www.logo-designer.co/wp-content/uploads/2020/03/2020-fintech-company-sezzle-reveals-new-logo-design-8.jpg"
      height="40"
      width="70"
    />
  )
  const symbols = [
    ['AC', '+/-', '%', '÷'],
    [7, 8, 9, 'X'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=', logo]
  ]

  const handleClick = event => {
    const target = event.target.value
    if (target === 'X' || target === '+' || target === '-' || target === '÷') {
      setCurrentDisplay((currentDisplay += ' ' + event.target.value + ' '))
    } else if (target === '=') {
    } else if (target === 'AC') {
      setCurrentDisplay('')
    } else {
      setCurrentDisplay((currentDisplay += event.target.value))
    }
  }

  // useEffect(() => {
  //   console.log('idk')
  // }, [currentCalc])
  return (
    <div>
      <form name="calculator">
        <table border="5">
          <tr>
            <td colSpan="5">
              <input
                type="text"
                name="display"
                id="display"
                value={currentDisplay}
              />
            </td>
          </tr>
          {symbols.map(array => {
            const row = array.map(symbol => {
              if (symbol === logo) {
                return <td key={logo}>{symbol}</td>
              }
              return (
                <td key={symbol}>
                  <input
                    type="button"
                    className="block"
                    value={symbol}
                    onClick={() => {
                      handleClick(event)
                    }}
                  />
                </td>
              )
            })
            return <tr key={row}> {row} </tr>
          })}
        </table>
      </form>
    </div>
  )
}

export default Calculator
