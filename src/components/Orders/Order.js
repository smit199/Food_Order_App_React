import OrderForm from "./OrderForm";
import styles from './Order.module.css'

const Order = (props) => {
    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles['order-form']}>
                <OrderForm onCloseOrderForm={props.onCloseOrderForm}></OrderForm>
            </div>
        </>
    )
}

export default Order;