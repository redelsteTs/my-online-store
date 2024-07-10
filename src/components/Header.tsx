import Link from 'next/link';
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'
import Button from '../components/Button'

const Header: React.FC = () => {
    const { cartItems, completeOrder } = useCart()
    
    const router = useRouter();

    const showCompleteOrder = router.pathname === '/cart' && cartItems.length > 0; 

    return (
        <header className={styles.header}>
        <Link className={styles.link} href="/">
        Home
        </Link>
        {showCompleteOrder && (
            <div>
                <Button onClick={completeOrder}>Complete order</Button>
            </div>
        )}
        <Link className={styles.link} href="/cart">
            Cart
        </Link>

        </header>
    );
};

export default Header;