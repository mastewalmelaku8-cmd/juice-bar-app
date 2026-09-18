import './KitchenView.css'
import OrderCard from './OrderCard'

function KitchenView({ orders, onStatusChange, onDeleteOrder, onSwitchView }) {
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const preparingOrders = orders.filter(o => o.status === 'preparing')
  const readyOrders = orders.filter(o => o.status === 'ready')

  return (
    <div className="kitchen-container">
      <div className="kitchen-header">
        <h1>🏪 Kitchen Display System</h1>
        <button className="btn-secondary" onClick={onSwitchView}>
          🛒 Ordering
        </button>
      </div>

      <div className="kitchen-grid">
        <div className="column">
          <div className="column-header pending">
            ⏰ New Orders ({pendingOrders.length})
          </div>
          <div className="orders-list">
            {pendingOrders.length === 0 ? (
              <p className="no-orders">No new orders</p>
            ) : (
              pendingOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={onStatusChange}
                  onDelete={onDeleteOrder}
                  status="pending"
                />
              ))
            )}
          </div>
        </div>

        <div className="column">
          <div className="column-header preparing">
            🔥 Making ({preparingOrders.length})
          </div>
          <div className="orders-list">
            {preparingOrders.length === 0 ? (
              <p className="no-orders">No orders being made</p>
            ) : (
              preparingOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={onStatusChange}
                  onDelete={onDeleteOrder}
                  status="preparing"
                />
              ))
            )}
          </div>
        </div>

        <div className="column">
          <div className="column-header ready">
            ✅ Ready ({readyOrders.length})
          </div>
          <div className="orders-list">
            {readyOrders.length === 0 ? (
              <p className="no-orders">No ready orders</p>
            ) : (
              readyOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={onStatusChange}
                  onDelete={onDeleteOrder}
                  status="ready"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KitchenView
