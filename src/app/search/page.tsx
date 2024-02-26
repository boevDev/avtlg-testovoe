import ListOfCars from '@/components/list-of-cars/list-of-cars';
import SearchBar from '@/components/search-bar/search-bar';
import Link from 'next/link';
import { Suspense } from 'react';
import { Container } from 'react-bootstrap';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string;
    brand?: string;
    model?: string;
    productionYear?: string;
  };
}) {
  const name = searchParams?.name || '';
  const brand = searchParams?.brand || '';
  const model = searchParams?.model || '';
  const productionYear = searchParams?.productionYear || '';

  return (
    <main>
      <Container className='pt-3'>
        <div>
          <h1 className='text-center fw-bolder mb-3'>Поиск по фильтрам</h1>
        </div>
        <div>
          <SearchBar placeholder='Имя' />
        </div>
        <div className='pt-3'>
          <Suspense key={name} fallback={<div>loading...</div>}>
            <ListOfCars
              name={name}
              brand={brand}
              model={model}
              productionYear={productionYear}
            />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
