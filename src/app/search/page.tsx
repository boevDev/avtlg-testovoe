import ListOfCars from '@/components/list-of-cars/list-of-cars';
import SearchBar from '@/components/search-bar/search-bar';
import { Suspense } from 'react';
import { Container } from 'react-bootstrap';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    brand?: string;
  };
}) {
  const name = searchParams?.name || '';
  const brand = searchParams?.brand || '';

  return (
    <main>
      <Container className='pt-3'>
        <div>
          <h1>Поиск</h1>
        </div>
        <div>
          <SearchBar placeholder='Поиск' />
        </div>
        <div className='pt-3'>
          <Suspense key={name} fallback={<div>loading...</div>}>
            <ListOfCars name={name} brand={brand} />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
