// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {itemDetails} = props
  const {id, imgUrl, title, amount, bgColor, dataTestid} = itemDetails

  const displayAmount = `Rs ${amount}`
  const bgColorValue = `bg-money-container ${bgColor}`

  return (
    <li className={bgColorValue}>
      <img src={imgUrl} className="money-details-img" alt={id} />
      <div className="amount-container">
        <p className="money-title"> {title} </p>
        <p className="amount-details" data-testid={dataTestid}>
          {displayAmount}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
