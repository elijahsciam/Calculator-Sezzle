/* eslint-disable complexity */
import React, {useState, useEffect} from 'react'
// import Display, {mathify} from './display'
import RPNCalculator from './RPN'
import Results from './results'
import axios from 'axios'
import io from 'socket.io-client'
import Button from '@material-ui/core/Button'
import Welcome from './welcome'
const socket = io(window.location.origin)
const RPN = new RPNCalculator([])

const Calculator = () => {
  let [currentDisplay, setCurrentDisplay] = useState('')
  let [currentOperator, setCurrentOperator] = useState()
  let [results, setResults] = useState()
  let [calculations, setCalculations] = useState()
  let count = 0
  const logo = (
    <img
      src="http://www.logo-designer.co/wp-content/uploads/2020/03/2020-fintech-company-sezzle-reveals-new-logo-design-8.jpg"
      height="40"
      width="70"
    />
  )
  const symbols = [
    ['AC', ':)', '(:', '÷'],
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=', logo],
  ]

  async function set(equation) {
    await axios.post('/api/calculations', {equation: equation})
  }

  const reverseMap = (array) => {
    let timer = 0
    let result = []
    let i = array.length - 1
    while (timer < 10) {
      if (array[i] === undefined) {
        break
      }
      result.push(array[i])
      timer++
      i--
    }
    return result
  }

  const sock = (res) => {
    if (res) {
      socket.emit('new-equation', res)
    }
  }

  const handleClick = (event) => {
    const target = event.target.innerText
    if (target === '+' || target === '-' || target === 'X' || target === '÷') {
      RPN.push(Number(currentDisplay))
      setCurrentOperator(target)
      setCurrentDisplay('')
    } else if (target === '=') {
      RPN.push(Number(currentDisplay))
      setCurrentDisplay(RPN[currentOperator]())
      set(RPN.equation[RPN.equation.length - 1])
      results.push(RPN.equation[RPN.equation.length - 1])
      count++
      sock(results)
      setCurrentOperator('')
    } else if (target === ':)' || target === '(:') {
      console.log('gotcha!')
    } else {
      setCurrentDisplay((currentDisplay += target))
    }
    if (target === 'AC') {
      setCurrentOperator('')
      setCurrentDisplay('')
      RPN.clear()
    }
  }

  useEffect(() => {
    async function fetch() {
      const getter = await axios.get('/api/calculations')
      const data = getter.data.map((val) => {
        return val.equation
      })
      setCalculations((calculations = reverseMap(data)))
      setResults((results = reverseMap(data)))
    }
    fetch()
  }, [])

  return (
    <body>
      <div id="header">
        <h1>Elijah Sciammas Calculator</h1>
      </div>
      <div className="calc">
        <form name="calculator">
          <div id="calculator">
            <table border="5">
              <tbody>
                <tr>
                  <td colSpan="5">
                    <input
                      type="text"
                      name="display"
                      id="display"
                      value={currentDisplay}
                      disabled
                    />
                  </td>
                </tr>
                {symbols.map((array) => {
                  const row = array.map((symbol) => {
                    if (symbol === logo) {
                      return <td key="logo">{symbol}</td>
                    }
                    return (
                      <td key={symbol}>
                        <Button
                          color="primary"
                          variant="contained"
                          className="block"
                          onClick={() => {
                            handleClick(event)
                          }}
                        >
                          {symbol}
                        </Button>
                      </td>
                    )
                  })
                  return <tr key={array}>{row}</tr>
                })}
              </tbody>
            </table>
          </div>
        </form>
        <div id="results">
          <h4 style={{color: 'lavender'}}>Calculations</h4>
          <Results
            calculations={calculations}
            setCalculations={setCalculations}
            count={count}
            reverseMap={reverseMap}
          />
        </div>
      </div>
      <Welcome />
    </body>
  )
}

export default Calculator
