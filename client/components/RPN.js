/* eslint-disable no-unused-vars, no-throw-literal*/
import axios from 'axios'

class RPNCalculator {
  constructor() {
    this.numStack = [];
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
    return this.popCompute((first, second) => first + second);
  }
  '-'() {
    return this.popCompute((first, second) => second - first);
  }
  'X'() {
    return this.popCompute((first, second) => second * first);
  }
  '÷'() {
    return this.popCompute((first, second) => second / first);
  }
  value() {
    return this.numStack[this.numStack.length - 1];
  }
  clear() {
    this.numStack =[]
  }
}

export default RPNCalculator

