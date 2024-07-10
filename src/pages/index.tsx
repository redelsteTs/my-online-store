import type { NextPage } from "next";
import Link from "next/link";
import items from '../public/data/items.json'
import { Item as ItemType } from '../interfaces/Item'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
      <div className={styles.container}>
        {items.map((item: ItemType) => (
          <div key={item.id} className={styles.item}>
            <Link href={`/item/${item.id}`} className={styles.card}>
              <div>
                <img src={item.imageUrl} alt={item.name} className={styles.image}/>
                <div className={styles.info}>{item.name}</div>
                <div className={styles.info}>${(item.price / 100).toFixed(2)}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };
  
  export default Home;
  