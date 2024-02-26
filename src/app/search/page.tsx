import ListOfCars from '@/components/list-of-cars/list-of-cars';
import SearchBar from '@/components/search-bar/search-bar';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button, Container, Row } from 'react-bootstrap';

export default async function Page({
  searchParams,
}: {
  searchParams?: CarQueryParams;
}) {
  return (
    <main>
      <Container className='pt-3'>
        <Row>
          <h1 className='text-center fw-bolder mb-3'>Поиск по фильтрам</h1>
        </Row>
        <Row>
          <Link className='mt-2 mb-2' href={'/view'}>
            <Button>Закрыть фильтры</Button>
          </Link>
        </Row>
        <Row>
          <SearchBar placeholder='Имя' />
        </Row>
        <Row className='pt-3'>
          <Suspense
            key={searchParams ? Object.values(searchParams).join('') : ''}
            fallback={<div>loading...</div>}
          >
            <ListOfCars {...searchParams} />
          </Suspense>
        </Row>
      </Container>
    </main>
  );
}
