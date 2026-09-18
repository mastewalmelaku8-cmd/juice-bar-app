import './OrderCard.css'

function OrderCard({ order, onStatusChange, onDelete, status }) {
  const getNextStatus = () => {
    if (status === 'pending') return 'preparing'
    if (status === 'preparing') return 'ready'
    return null
  }

  const getNextButtonText = () => {
    if (status === 'pending') return 'Start Making'
    if (status === 'preparing') return 'Mark Ready'
    return null
  }

  const nextStatus = getNextStatus()
  const nextButtonText = getNextButtonText()

  return (
    <div className={`order-card order-${status}`}>
      <div className="order-header">
        <div>
          <p className="order-number">#{order.id.toString().slice(-4)}</p>
          <p className="customer-name">{order.customer}</p>
        </div>
        <span className="order-time">{order.time}</span>
      </div>

      <div className="order-items">
        {order.items.map((item, idx) => (
          <div key={idx} className="item-line">
            {item.name}
          </div>
        ))}
      </div>

      <div className="order-total">
        Total: ${order.total}
      </div>

      <div className="order-actions">
        {nextStatus && (
          <button
            className={`btn-status btn-${status}`}
            onClick={() => onStatusChange(order.id, nextStatus)}
          >
            {nextButtonText}
          </button>
        )}
        <button
          className="btn-delete"
          onClick={() => onDelete(order.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default OrderCard
