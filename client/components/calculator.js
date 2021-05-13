import React, {useState, useEffect} from 'react'
// import Display, {mathify} from './display'
import RPNCalculator from './RPN'
import Results from './results'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io(window.location.origin)
const RPN = new RPNCalculator([])

const Calculator = () => {
  let [currentDisplay, setCurrentDisplay] = useState('')
  let [currentOperator, setCurrentOperator] = useState()
  let [results, setResults] = useState()
  let count = 0
  const logo = (
    <img
      src="http://www.logo-designer.co/wp-content/uploads/2020/03/2020-fintech-company-sezzle-reveals-new-logo-design-8.jpg"
      height="40"
      width="70"
    />
  )
  const symbols = [
    ['AC', '+/-', '%', '÷'],
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=', logo],
  ] //refactor this to have functions as variables? maybe make things more DRY in handleClick??

  async function set(equation) {
    await axios.post('/api/calculations', {equation: equation})
  }
  const sock = (eq) => {
    if (eq) socket.emit('new-equation', eq)
  }

  const handleClick = (event) => {
    const target = event.target.value
    if (target === '+' || target === '-' || target === 'x' || target === '÷') {
      RPN.push(Number(currentDisplay))
      setCurrentOperator(target)
      setCurrentDisplay('')
    } else if (target === '=') {
      RPN.push(Number(currentDisplay))
      setCurrentDisplay(RPN[currentOperator]())
      set(RPN.equation[RPN.equation.length - 1])
      results.push(RPN.equation[RPN.equation.length - 1])
      sock(results)
      setCurrentOperator('')
      count++
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
      setResults((results = data))
    }
    fetch()
  }, [])

  return (
    <div>
      <form name="calculator">
        <table border="5">
          <tbody>
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
            {symbols.map((array) => {
              const row = array.map((symbol) => {
                if (symbol === logo) {
                  return <td key="logo">{symbol}</td>
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
              return <tr key={array}>{row}</tr>
            })}
          </tbody>
        </table>
      </form>
      <Results results={results} setResults={setResults} count={count} />
    </div>
  )
}

export default Calculator
