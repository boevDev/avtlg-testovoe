'use server';

import Link from 'next/link';
import { Button, Container, Row } from 'react-bootstrap';
import ListOfCars from '@/components/list-of-cars/list-of-cars';

const getCars = async () => {
  const res = await fetch('http://localhost:8080/cars', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export default async function Page() {
  return (
    <main>
      <Container className='pt-3'>
        <Row className='mb-3'>
          <Link href={'/create'}>
            <Button>Создать новое объявление</Button>
          </Link>
        </Row>
        <ListOfCars name='' />
      </Container>
    </main>
  );
}
