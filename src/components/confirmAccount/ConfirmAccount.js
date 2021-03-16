import styles from './ConfirmAccount.module.css'

export default function ConfirmAccount() {
 const message = 'Success, your account is activated!'
  const message2 = 'Now, you can log in'
  return (
    <div className={styles.response}>
        {message}
        <p className={styles.mesText}>{message2}</p>
    </div>
  );
}
