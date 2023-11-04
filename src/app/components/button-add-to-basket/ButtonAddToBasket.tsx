import React from 'react';
import styles from './ButtonAddToBasket.module.scss';

const ButtonAddToBasket = () => {
    return (
        <div>
            <button className={styles.addButton}>Add To Basket</button>
        </div>
    );
};

export default ButtonAddToBasket;