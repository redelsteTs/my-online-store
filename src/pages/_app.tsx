import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '../context/CartContext'
import Header from '../components/Header';

function MyShop({ Component, pageProps}: AppProps) {
    return (
        <CartProvider>
            <Header />
            <div className='content-wrapper'>
            <Component {...pageProps} />
            </div>
        </CartProvider>
    )
}

export default MyShop;