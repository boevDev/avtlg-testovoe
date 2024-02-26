'use server';

import Link from 'next/link';
import { Button, Container, Row } from 'react-bootstrap';
import ListOfCars from '@/components/list-of-cars/list-of-cars';

export default async function Page() {
  return (
    <main>
      <Container className='pt-3'>
        <Row className='mb-3'>
          <Link href={'/create'}>
            <Button>Создать новое объявление</Button>
          </Link>
        </Row>
        <ListOfCars name='' brand='' model='' productionYear='' />
      </Container>
    </main>
  );
}
