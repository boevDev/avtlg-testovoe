'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './delete.module.scss';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const onDelete = async (data: any) => {
    const res = await fetch('http://localhost:8080/cars/' + params.id, {
      method: 'DELETE',
    });
    console.log(res.status);
    if (res.status === 200) {
      router.push('/view');
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  return (
    <Container className={styles.deleteContainer}>
      <Row className='text-center justify-content-center'>
        Вы действительно хотите удалить это объявление?
      </Row>
      <Row className='mt-4'>
        <Col>
          <Button variant='danger' className='w-100' onClick={onDelete}>
            Да
          </Button>
        </Col>
        <Col>
          <Button
            variant='primary'
            className='w-100'
            onClick={() => router.push('/view')}
          >
            Нет
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
