import { useState, useEffect } from 'react'
import OrderingView from './components/OrderingView'
import KitchenView from './components/KitchenView'
import './App.css'

function App() {
  const [view, setView] = useState('ordering')
  const [orders, setOrders] = useState([])

  // Load orders from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem('juice_bar_orders')
    if (stored) {
      setOrders(JSON.parse(stored))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('juice_bar_orders', JSON.stringify(orders))
  }, [orders])

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder])
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  return (
    <div className="app">
      {view === 'ordering' ? (
        <OrderingView
          onOrderPlace={addOrder}
          onSwitchView={() => setView('kitchen')}
        />
      ) : (
        <KitchenView
          orders={orders}
          onStatusChange={updateOrderStatus}
          onDeleteOrder={deleteOrder}
          onSwitchView={() => setView('ordering')}
        />
      )}
    </div>
  )
}

export default App
