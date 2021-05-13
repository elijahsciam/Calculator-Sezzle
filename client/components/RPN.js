/* eslint-disable no-unused-vars, no-throw-literal*/

class RPNCalculator {
  constructor() {
    this.numStack = [];
    this.equation = [];
  }

  push(num) {
    this.numStack.push(num);
  }
  popCompute(operationFunc) {
    if (this.numStack.length < 2) {
      throw 'rpnCalculatorInstance is empty';
    } else {
      const num1 = this.numStack.pop();
      const num2 = this.numStack.pop();
      return operationFunc(num1, num2)
    }
  }
  '+'() {
    return this.popCompute((first, second) => {
      const result = first + second
      this.equation.push(`${first} + ${second} = ${result}`)
      return result
    });
  }
  '-'() {
    return this.popCompute((first, second) => {
       const result = second - first
      this.equation.push(`${second} - ${first} = ${result}`)
      return result
    });
  }
  'X'() {
    return this.popCompute((first, second) => {
       const result = first * second
      this.equation.push(`${first} x ${second} = ${result}`)
      return result
    });
  }
  '÷'() {
    return this.popCompute((first, second) => {
      const result = second / first
      this.equation.push(`${second} ÷ ${first} = ${result}`)
      return result
    });
  }
  value() {
    return this.numStack[this.numStack.length - 1];
  }
  clear() {
    this.numStack =[]
  }
}

export default RPNCalculator

