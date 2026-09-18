import { useState } from 'react'
import './OrderingView.css'

const MENU_ITEMS = [
  { id: 1, name: 'Mass Bulk', price: 530, type: 'bulk', cost: 364.18 },
  { id: 2, name: 'Blue Whale Bulk', price: 550, type: 'bulk', cost: 379.40 },
  { id: 3, name: 'Sea Beast', price: 460, type: 'bulk', cost: 319.55 },
  { id: 4, name: 'Marine Lean', price: 460, type: 'lean', cost: 321.65 },
  { id: 5, name: 'Tropical Tide', price: 470, type: 'lean', cost: 326.38 },
  { id: 6, name: 'Green Wave', price: 520, type: 'lean', cost: 357.35 },
  { id: 7, name: 'Ocean Blue', price: 480, type: 'lean', cost: 335.30 },
  { id: 8, name: 'Water 2l', price: 65, type: 'hydrate', cost: 364.18 },
  { id: 9, name: 'Water 1l', price: 50, type: 'hydrate', cost: 364.18 },
]

function OrderingView({ onOrderPlace, onSwitchView }) {
  const [cart, setCart] = useState([])
  const [customerName, setCustomerName] = useState('')

  const addToCart = (item) => {
    setCart([...cart, item])
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0 || !customerName.trim()) {
      alert('Please add items and enter a customer name')
      return
    }

    const newOrder = {
      id: Date.now(),
      customer: customerName,
      items: cart,
      total: calculateTotal(),
      status: 'pending',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    onOrderPlace(newOrder)
    const orderNumber = newOrder.id.toString().slice(-4)
    alert(`✅ Order #${orderNumber} placed for ${customerName}!`)
    setCart([])
    setCustomerName('')
  }

  return (
    <div className="ordering-container">
      <div className="ordering-header">
        <h1>🥤 Juice Bar Ordering</h1>
        <button className="btn-secondary" onClick={onSwitchView}>
          👀 Kitchen View
        </button>
      </div>

      <div className="ordering-grid">
        <div className="menu-section">
          <h2>Menu</h2>
          <div className="menu-items">
            {MENU_ITEMS.map(item => (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => addToCart(item)}
              >
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="cart-section card card-elevated">
          <h2>Your Order</h2>

          <input
            type="text"
            placeholder="Customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="customer-input"
          />

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">No items yet</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              <div className="cart-total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="btn-primary btn-place-order" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderingView
