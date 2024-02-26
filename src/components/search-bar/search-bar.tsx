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

  type Args = {
    name?: string;
    brand?: string;
    model?: string;
    productionYear?: string;
  };

  const handleSearch = useDebouncedCallback((args: Args) => {
    const params = new URLSearchParams(searchParams);
    if (args.name) {
      params.set('name', args.name);
    } else {
      params.delete('name');
    }
    if (args.brand) {
      params.set('brand', args.brand);
    } else {
      params.delete('brand');
    }
    if (args.model) {
      params.set('model', args.model);
    } else {
      params.delete('model');
    }
    if (args.productionYear) {
      params.set('productionYear', args.productionYear);
    } else {
      params.delete('productionYear');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

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
                handleSearch({ brand: e.target.value });
              }}
              defaultValue={searchParams.get('brand')?.toString()}
            />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Модель'
              onChange={(e) => {
                handleSearch({ model: e.target.value });
              }}
              defaultValue={searchParams.get('model')?.toString()}
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
                handleSearch({ productionYear: e.target.value });
              }}
              defaultValue={searchParams.get('productionYear')?.toString()}
            />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Пробег</InputGroup.Text>
            <Form.Control placeholder='От' aria-label='От' />
            <Form.Control placeholder='До' aria-label='До' />
          </InputGroup>
        </Col>

        <Col>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Цена</InputGroup.Text>
            <Form.Control placeholder='От' aria-label='От' />
            <Form.Control placeholder='До' aria-label='До' />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
