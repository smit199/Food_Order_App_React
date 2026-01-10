import styles from './Message.module.css'

const Message = () => {
    return (
        <div className={styles['message-container']}>
            <h2>Delicious Food, Dlivered TO You</h2>
            <p>Choose your favourite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
            <p>All your meals are cooked with high-quality ingredients, Just-in-time and of course by exprienced chefs</p>
        </div>
    )
}

export default Message;