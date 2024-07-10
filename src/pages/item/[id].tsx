import { useRouter } from 'next/router';
import items from '../../public/data/items.json';
import { Item as ItemType } from '../../interfaces/Item'
import { useCart } from '@/src/context/CartContext';
import Button from '../../components/Button'
import styles from '../../styles/Item.module.css'

const ItemPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const item = items.find(item => item.id === id) as ItemType;
    const { addToCart } = useCart();


    if (!item) return <p className={styles['not-found']}>Item not found!</p>;

    return (
        <div className={styles.container}>
            <img src={item.imageUrl} alt={item.name} className={styles.image} />
            <h1 className={styles.title}>{item.name}</h1>
            <p className={styles.description}>{item.description}</p>
            <Button onClick={()=> addToCart({ item, quantity: 1})}>Add to cart</Button>
        </div>
    )
}

export default ItemPage;