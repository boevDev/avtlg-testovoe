'use server';

import Link from 'next/link';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import Image from 'next/image';
import contactIcon from './assets/contact.svg';
import styles from './style.module.scss';
import ListOfCars from '@/components/list-of-cars/list-of-cars';

const getCars = async () => {
  const res = await fetch('http://localhost:8080/cars', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const currencyFormat = (number: number | string) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(Number(number));

const mileageFormat = (number: number | string | undefined) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
  }).format(Number(number));

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
        <ListOfCars name={''} />
      </Container>
    </main>
  );
}
