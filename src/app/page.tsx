import styles from './page.module.scss';
import { Button } from 'react-bootstrap';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className='d-flex justify-content-center mx-auto'>
        <h1>Hello, world</h1>
      </div>
    </main>
  );
}
