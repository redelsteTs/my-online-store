import React from 'react'
import styles from '../styles/Button.module.css'

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({onClick, children, className}) => {
    return (
        <button onClick={onClick} className={`${styles['button-base']} ${className || ''}`}>
            {children}
        </button>
    )
}

export default Button;