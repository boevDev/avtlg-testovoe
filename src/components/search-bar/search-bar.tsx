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

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
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
  );
};

export default SearchBar;
