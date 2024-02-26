import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Stack,
} from 'react-bootstrap';
import contactIcon from './assets/contact.svg';
import styles from './style.module.scss';

const fetchCars = async (queryParams?: {
  name?: string;
  brand?: string;
  model?: string;
  productionYear?: string;
}): Promise<Car[]> => {
  const res = await fetch(
    'http://localhost:8080/cars?' +
      (!!queryParams
        ? new URLSearchParams({
            ...queryParams,
          })
        : ''),
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.log(res);
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

type Props = {
  name?: string;
  brand?: string;
  model?: string;
  productionYear?: string;
};

export default async function ListOfCars(props: Props) {
  const { name, brand, model, productionYear } = props;
  const cars = await fetchCars({
    name,
    brand,
    model,
    productionYear,
  });

  console.log(cars);

  return (
    <Stack gap={3}>
      {cars.map((item) => (
        <Row className='position-relative border-bottom m-0 pb-3' key={item.id}>
          <Col>
            <Image
              priority
              width={200}
              height={200}
              src='https://placekitten.com/200/200'
              alt='kitty'
            />
          </Col>
          <Col>
            <Row>
              <Col className='fw-bolder fs-3'>{item.name}</Col>
            </Row>
            <Row>
              <Col className={`mt-1 fw-light ${styles.description}`}>
                {item.description}
              </Col>
            </Row>
            <Row>
              <Col className='mt-4 d-flex align-items-center fw-bolder fs-6 text-secondary'>
                <Image
                  width={24}
                  height={24}
                  src={contactIcon}
                  alt='contacts'
                  className='me-2'
                />
                {item.contacts}
              </Col>
            </Row>

            {!!item.hasTechnicalCharacteristics && (
              <Row className='mt-4'>
                <Col className={styles.techCharCol}>
                  <Row className={styles.techCharTitle}>
                    Марка:
                    <Row className={styles.techCharChild}>
                      {item.technical_characteristics?.brand}
                    </Row>
                  </Row>
                </Col>

                <Col className={styles.techCharCol}>
                  <Row className={styles.techCharTitle}>
                    Модель:
                    <Row className={styles.techCharChild}>
                      {item.technical_characteristics?.model}
                    </Row>
                  </Row>
                </Col>
                <Col className={styles.techCharCol}>
                  <Row className={styles.techCharTitle}>
                    Год выпуска:
                    <Row className={styles.techCharChild}>
                      {item.technical_characteristics?.productionYear}
                    </Row>
                  </Row>
                </Col>
                <Col className={styles.techCharCol}>
                  <Row className={styles.techCharTitle}>
                    Пробег:
                    <Row className={styles.techCharChild}>
                      {mileageFormat(item.technical_characteristics?.mileage)}
                    </Row>
                  </Row>
                </Col>
              </Row>
            )}

            <ListGroup className='mt-4'>
              {!!item.options &&
                item.options.map((item) => (
                  <ListGroupItem key={item.id} variant='success'>
                    {item.name}
                  </ListGroupItem>
                ))}
            </ListGroup>

            <Row>
              <Col className='mt-4 fs-1'>{currencyFormat(item.price)}</Col>
            </Row>
            <Row className='mt-3 d-flex justify-content-between'>
              <Col>
                <Link href={'/update/' + item.id} className={styles.btn}>
                  <Button variant='primary' className={styles.btn}>
                    Изменить
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link href={'/delete/' + item.id}>
                  <Button variant='danger' className={styles.btn}>
                    Удалить
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Stack>
  );
}
