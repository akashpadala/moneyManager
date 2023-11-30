// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachHistoryItem, onClickDelete} = props
  const {id, inputTitle, inputAmount, inputType} = eachHistoryItem

  const onDelete = () => {
    onClickDelete(id)
  }

  const amount = `Rs ${inputAmount}`

  return (
    <li className="transaction-history-item">
      <p className="title-name"> {inputTitle} </p>
      <p className="title-name"> {amount} </p>
      <p className="title-name"> {inputType} </p>
      <button
        className="dlt-button"
        type="button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="dlt-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
