'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  placeholder: string;
};

const SearchBar: React.FC<Props> = (props) => {
  const { placeholder } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((args: CarQueryParams) => {
    const params = new URLSearchParams(searchParams);

    for (let key in args) {
      if (args[key as keyof CarQueryParams]) {
        params.set(key, String(args[key as keyof CarQueryParams]));
      } else {
        params.delete(key);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Row>
        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder={placeholder}
              onChange={(e) => {
                handleSearch({ name: e.target.value });
              }}
              defaultValue={searchParams.get('name')?.toString()}
            />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Марка'
              onChange={(e) => {
                handleSearch({
                  'technical_characteristics.brand': e.target.value,
                });
              }}
              defaultValue={searchParams
                .get('technical_characteristics.brand')
                ?.toString()}
            />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Модель'
              onChange={(e) => {
                handleSearch({
                  'technical_characteristics.model': e.target.value,
                });
              }}
              defaultValue={searchParams
                .get('technical_characteristics.model')
                ?.toString()}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Год выпуска'
              onChange={(e) => {
                handleSearch({
                  'technical_characteristics.productionYear': e.target.value,
                });
              }}
              defaultValue={searchParams
                .get('technical_characteristics.productionYear')
                ?.toString()}
            />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Пробег</InputGroup.Text>
            <Form.Control
              placeholder='От'
              aria-label='От'
              onChange={(e) => {
                handleSearch({
                  'technical_characteristics.mileage_gte': e.target.value,
                });
              }}
              defaultValue={searchParams
                .get('technical_characteristics.mileage_gte')
                ?.toString()}
            />
            <Form.Control
              placeholder='До'
              aria-label='До'
              onChange={(e) => {
                handleSearch({
                  'technical_characteristics.mileage_lte': e.target.value,
                });
              }}
              defaultValue={searchParams
                .get('technical_characteristics.mileage_lte')
                ?.toString()}
            />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Цена</InputGroup.Text>
            <Form.Control
              placeholder='От'
              aria-label='От'
              onChange={(e) => {
                handleSearch({ price_gte: e.target.value });
              }}
              defaultValue={searchParams.get('price_gte')?.toString()}
            />
            <Form.Control
              placeholder='До'
              aria-label='До'
              onChange={(e) => {
                handleSearch({ price_lte: e.target.value });
              }}
              defaultValue={searchParams.get('price_lte')?.toString()}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
