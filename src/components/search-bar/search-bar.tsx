'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Button, Form, InputGroup } from 'react-bootstrap';

type Props = {
  placeholder: string;
};

const SearchBar: React.FC<Props> = (props) => {
  const { placeholder } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <InputGroup className='mb-3'>
        <Form.Control
          placeholder={placeholder}
          aria-describedby='basic-addon2'
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <Button variant='outline-primary' id='button-addon2'>
          Найти
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
