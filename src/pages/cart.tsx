import { useCart } from '../context/CartContext';
import Button from '../components/Button'
import styles from '../styles/Cart.module.css'

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, completeOrder } = useCart();

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
        <div className={styles['cart-container']}>
            {cartItems.map((cartItem, index) => (
                <div className={styles['item-container']} key={cartItem.item.id}>
                <img src={cartItem.item.imageUrl} alt={cartItem.item.name} style={{ width: '100px' }} />
                <h3>{cartItem.item.name}</h3>
                <p>Quantity: {cartItem.quantity}</p>
                <div className={styles['button-group']}>
                    <div className={styles['inline-buttons']}>
                        <Button onClick={() => incrementQuantity(cartItem.item.id, index)}>+</Button>
                        <Button onClick={() => decrementQuantity(cartItem.item.id, index)}>-</Button>
                    </div>
                    <Button onClick={() => removeFromCart(cartItem.item.id, index)}>Remove</Button>
                </div>
                </div>
            ))}
        </div>
        <div>
            <Button onClick={completeOrder}>Complete order</Button>
        </div>
    </div>
  );
};

export default CartPage;
