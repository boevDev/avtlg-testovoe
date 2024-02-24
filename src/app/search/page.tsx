import ListOfCars from '@/components/list-of-cars/list-of-cars';
import SearchBar from '@/components/search-bar/search-bar';
import { Suspense } from 'react';
import { Container } from 'react-bootstrap';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

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
          <Suspense key={query} fallback={<div>loading...</div>}>
            <ListOfCars name={query} />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
