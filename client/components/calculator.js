import React from 'react'

const Calculator = () => {
  const logo = (
    <img
      src="http://www.logo-designer.co/wp-content/uploads/2020/03/2020-fintech-company-sezzle-reveals-new-logo-design-8.jpg"
      height="40"
      width="60"
    />
  )
  const symbols = [
    ['AC', '+/-', '%', '÷'],
    [7, 8, 9, 'X'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=', logo]
  ]

  const add = nums => {
    let sum = 0
    nums.forEach(num => {
      sum += num
    })
    return sum
  }

  const subtract = nums => {
    let sum = 0
    nums.forEach(num => {
      if (num === nums[0]) {
        sum += num
      } else {
        sum -= num
      }
      return sum
    })
  }

  return (
    <div>
      <form name="calculator">
        <table border="5">
          <tr>
            <td colSpan="5">
              <input type="text" name="display" id="display" disabled />
            </td>
          </tr>

          {symbols.map(array => {
            const row = array.map(symbol => {
              if (symbol === logo) {
                return <td key={logo}>{symbol}</td>
              }
              return (
                <td key={symbol}>
                  <button type="button" className="block">
                    {symbol}
                  </button>
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
