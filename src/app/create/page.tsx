'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import styles from './style.module.scss';

const schema = yup.object({
  name: yup
    .string()
    .required('Заполните название')
    .min(3, 'Длинна должна быть больше 3 символов'),
  description: yup
    .string()
    .required('Заполните описание')
    .min(3, 'Длинна должна быть больше 3 символов'),
  price: yup
    .number()
    .typeError('Заполните цену')
    .required('Заполните цену')
    .positive('Больше нуля'),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log({ data });

    const res = await fetch('http://localhost:8080/cars', {
      method: 'POST',
      body: JSON.stringify({
        id: uuid(),
        ...data,
      }),
    });
    console.log(res.status);
  };

  console.log({ errors });

  return (
    <main>
      <Container className={`${styles.createContainer} pt-3`}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='formCarName'>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type='name'
              placeholder='Введите марку и модель'
              {...register('name')}
            />
            {!!errors.name?.message && (
              <Form.Text className='text-danger' id='formCarName'>
                {errors.name?.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className='mb-3' controlId='formCarDescription'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as={'textarea'}
              type='input'
              placeholder='Введите описание'
              {...register('description')}
            />
            {!!errors.description?.message && (
              <Form.Text className='text-danger' id='formCarName'>
                {errors.description?.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formCarPrice'>
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type='input'
              placeholder='Введите цену'
              {...register('price', {
                valueAsNumber: true,
              })}
            />
            {!!errors.price?.message && (
              <Form.Text className='text-danger' id='formCarName'>
                {errors.price?.message}
              </Form.Text>
            )}
          </Form.Group>
          <Button variant='primary' type='submit'>
            Создать
          </Button>
        </Form>
      </Container>
    </main>
  );
}
