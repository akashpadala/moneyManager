import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const initialMoneyDetailsList = [
  {
    id: 'balance',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    title: 'Your Balance',
    amount: 0,
    bgColor: 'bgGreen',
    dataTestid: 'balanceAmount',
  },
  {
    id: 'income',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    title: 'Your Income',
    amount: 0,
    bgColor: 'bgBlue',
    dataTestid: 'incomeAmount',
  },
  {
    id: 'expenses',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    title: 'Your Expenses',
    amount: 0,
    bgColor: 'bgViolet',
    dataTestid: 'expensesAmount',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    inputTitle: '',
    inputAmount: '',
    inputType: 'Income',
    income: 0,
    expenses: 0,
    historyList: [],
    moneyDetailsList: initialMoneyDetailsList,
  }

  onChangeTitle = event => {
    this.setState({
      inputTitle: event.target.value,
    })
  }

  onChangeAmount = event => {
    this.setState({
      inputAmount: event.target.value,
    })
  }

  onChangeType = event => {
    const inputValue = event.target.value
    const typeValue = inputValue.charAt(0) + inputValue.slice(1).toLowerCase()
    console.log(typeValue)
    this.setState({
      inputType: typeValue,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {
      inputTitle,
      inputAmount,
      inputType,
      historyList,
      moneyDetailsList,
    } = this.state
    if (inputType === 'Income') {
      this.setState(prevState => ({
        moneyDetailsList: moneyDetailsList.map(eachMoneyItem => {
          if (eachMoneyItem.id === 'income') {
            return {
              ...eachMoneyItem,
              amount: parseInt(prevState.income) + parseInt(inputAmount),
            }
          }
          return eachMoneyItem
        }),
        income: parseInt(prevState.income) + parseInt(inputAmount),
      }))
    } else {
      this.setState(prevState => ({
        moneyDetailsList: moneyDetailsList.map(eachMoneyItem => {
          if (eachMoneyItem.id === 'expenses') {
            return {
              ...eachMoneyItem,
              amount: parseInt(prevState.expenses) + parseInt(inputAmount),
            }
          }
          return eachMoneyItem
        }),
        expenses: parseInt(prevState.expenses) + parseInt(inputAmount),
      }))
    }
    const newHistoryItem = {
      id: uuidv4(),
      inputTitle,
      inputAmount: parseInt(inputAmount),
      inputType,
    }
    this.setState({
      historyList: [...historyList, newHistoryItem],
      inputTitle: '',
      inputAmount: '',
      inputType: 'Income',
    })
  }

  onClickDelete = id => {
    const {historyList, moneyDetailsList} = this.state
    const historyObject = historyList.find(eachItem => eachItem.id === id)
    const {inputType, inputAmount} = historyObject
    if (inputType === 'Income') {
      this.setState(prevState => ({
        historyList: historyList.filter(eachItem => eachItem.id !== id),
        moneyDetailsList: moneyDetailsList.map(eachMoneyItem => {
          if (eachMoneyItem.id === 'income') {
            return {
              ...eachMoneyItem,
              amount: parseInt(prevState.income) - parseInt(inputAmount),
            }
          }
          return eachMoneyItem
        }),
        income: parseInt(prevState.income) - parseInt(inputAmount),
      }))
    } else {
      this.setState(prevState => ({
        historyList: historyList.filter(eachItem => eachItem.id !== id),
        moneyDetailsList: moneyDetailsList.map(eachMoneyItem => {
          if (eachMoneyItem.id === 'expenses') {
            return {
              ...eachMoneyItem,
              amount: parseInt(prevState.expenses) - parseInt(inputAmount),
            }
          }
          return eachMoneyItem
        }),
        expenses: parseInt(prevState.expenses) - parseInt(inputAmount),
      }))
    }
  }

  getMoneyDetailsItem = updatedMoneyDetailsList =>
    updatedMoneyDetailsList.map(eachItem => (
      <MoneyDetails itemDetails={eachItem} key={eachItem.id} />
    ))

  render() {
    const {
      inputTitle,
      inputAmount,
      inputType,
      historyList,
      moneyDetailsList,
      income,
      expenses,
    } = this.state

    const updatedMoneyDetailsList = moneyDetailsList.map(eachItem => {
      if (eachItem.id === 'balance') {
        return {...eachItem, amount: parseInt(income) - parseInt(expenses)}
      }
      return eachItem
    })

    return (
      <div className="bg-container">
        <div className="inner-bg-container">
          <div className="title-container">
            <h1 className="title"> Hi, Richard </h1>
            <p className="description">
              Welcome back to your
              <span className="app-title"> Money Manager </span>
            </p>
          </div>
          <ul className="money-details-container">
            {this.getMoneyDetailsItem(updatedMoneyDetailsList)}
          </ul>
          <div className="transaction-form-container">
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <h1 className="transaction-title-el1"> Add Transaction </h1>
              <label htmlFor="title" className="transaction-title-el2">
                TITLE
              </label>
              <input
                className="label-input"
                type="text"
                id="title"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
                value={inputTitle}
              />
              <label htmlFor="amount" className="transaction-title-el2">
                AMOUNT
              </label>
              <input
                className="label-input"
                type="text"
                id="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={inputAmount}
              />
              <label htmlFor="type" className="transaction-title-el2">
                TYPE
              </label>
              <select
                className="label-input"
                id="type"
                value={inputType}
                onChange={this.onChangeType}
              >
                <option value={transactionTypeOptions[0].optionId}>
                  {transactionTypeOptions[0].displayText}
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="transaction-details">
              <h1 className="transaction-title-el1"> History </h1>
              <div className="history-container">
                <div className="history-item">
                  <p className="name"> Title </p>
                  <p className="name"> Amount </p>
                  <p className="name"> Type </p>
                </div>
                {historyList.map(eachHistoryItem => (
                  <TransactionItem
                    eachHistoryItem={eachHistoryItem}
                    onClickDelete={this.onClickDelete}
                    key={eachHistoryItem.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
