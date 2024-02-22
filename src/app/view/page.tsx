'use server';

import Link from 'next/link';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import contactIcon from './assets/contact.svg';

const getCars = async () => {
  const res = await fetch('http://localhost:8080/cars');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const currency = (number: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(number);

export default async function Page() {
  const cars = (await getCars()) as Car[];

  return (
    <main>
      <Container className='pt-3'>
        <Row className='mb-3'>
          <Link href={'/create'}>
            <Button>Создать новое объявление</Button>
          </Link>
        </Row>
        <Stack gap={3}>
          {cars.map((item) => (
            <Row
              className='position-relative border-bottom m-0 pb-3'
              key={item.id}
            >
              <Col>
                <img src='https://placekitten.com/200/200' alt='kitty' />
              </Col>
              <Col>
                <Row>
                  <Col className='fw-bolder fs-3'>{item.name}</Col>
                </Row>
                <Row>
                  <Col className='mt-1 fw-light'>{item.description}</Col>
                </Row>
                <Row>
                  <Col className='mt-2 fw-light'>
                    <Image
                      width={16}
                      height={16}
                      src={contactIcon}
                      alt='contacts'
                      className='me-2'
                    />
                    {item.contacts}
                  </Col>
                </Row>
                <Row>
                  <Col className='mt-2 fs-4'>{currency(item.price)}</Col>
                </Row>
                <Row className='mt-3 d-flex justify-content-between'>
                  <Col>
                    <Link href={'/update/' + item.id}>
                      <Button>Изменить</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link href={'/delete'}>
                      <Button variant='danger'>Удалить</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Stack>
      </Container>
    </main>
  );
}
