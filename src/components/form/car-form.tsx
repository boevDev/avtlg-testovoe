import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';

export type CarInfo = {
  name: string;
  description: string;
  price: number;
  contacts: string;
  technical_characteristics?: {
    brand: string;
    model: string;
    productionYear: number;
    mileage: number;
  };
};

export type CarFormFields = CarInfo & {
  hasTechnicalCharacteristics: boolean;
};

const schema: yup.ObjectSchema<Partial<CarFormFields>> = yup.object({
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
  contacts: yup.string().required().email(),
  hasTechnicalCharacteristics: yup.boolean().required(),
  technical_characteristics: yup.object({
    brand: yup.string().required(),
    model: yup.string().required(),
    productionYear: yup.number().required().positive(),
    mileage: yup.number().required().positive(),
  }),
});

type Props = {
  mode: 'create' | 'update';
  defaultValues?: Partial<CarFormFields>;
};

export default function CarForm(props: Props) {
  const { defaultValues } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    console.log({ data });

    // mode create - post
    // mode update - patch/put
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
    <Container className={`pt-3`}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Название</Form.Label>
          <Form.Control
            type='name'
            placeholder='Введите марку и модель'
            {...register('name')}
          />
          {!!errors.name?.message && (
            <Form.Text className='text-danger' id='name'>
              {errors.name?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as={'textarea'}
            type='input'
            placeholder='Введите описание'
            {...register('description')}
          />
          {!!errors.description?.message && (
            <Form.Text className='text-danger' id='description'>
              {errors.description?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='price'>
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type='input'
            placeholder='Введите цену'
            {...register('price', {
              valueAsNumber: true,
            })}
          />
          {!!errors.price?.message && (
            <Form.Text className='text-danger' id='price'>
              {errors.price?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='contacts'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='input'
            placeholder='Введите Email'
            {...register('contacts')}
          />
          {!!errors.contacts?.message && (
            <Form.Text className='text-danger' id='contacts'>
              {errors.contacts?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className='mb-3' controlId='hasTechnicalCharacteristics'>
          <Form.Check
            type='checkbox'
            label='Добавить тех. характеристики'
            {...register('hasTechnicalCharacteristics')}
          />
        </Form.Group>

        {watch('hasTechnicalCharacteristics') && (
          <>
            <Form.Group
              className='mb-3'
              controlId='technical_characteristics.brand'
            >
              <Form.Label>Марка</Form.Label>
              <Form.Control
                type='input'
                placeholder='Введите марку'
                {...register('technical_characteristics.brand')}
              />
              {!!errors?.technical_characteristics?.brand?.message && (
                <Form.Text
                  className='text-danger'
                  id='technical_characteristics.brand'
                >
                  {errors.technical_characteristics.brand.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='technical_characteristics.model'
            >
              <Form.Label>Модель</Form.Label>
              <Form.Control
                type='input'
                placeholder='Введите модель'
                {...register('technical_characteristics.model')}
              />
              {!!errors?.technical_characteristics?.model?.message && (
                <Form.Text
                  className='text-danger'
                  id='technical_characteristics.model'
                >
                  {errors.technical_characteristics.model.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='technical_characteristics.productionYear'
            >
              <Form.Label>Год выпуска</Form.Label>
              <Form.Control
                type='input'
                placeholder='Укажите год выпуска'
                {...register('technical_characteristics.productionYear', {
                  valueAsNumber: true,
                })}
              />
              {!!errors?.technical_characteristics?.productionYear?.message && (
                <Form.Text
                  className='text-danger'
                  id='technical_characteristics.productionYear'
                >
                  {errors.technical_characteristics.productionYear.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='technical_characteristics.mileage'
            >
              <Form.Label>Пробег</Form.Label>
              <Form.Control
                type='input'
                placeholder='Укажите пробег'
                {...register('technical_characteristics.mileage', {
                  valueAsNumber: true,
                })}
              />
              {!!errors?.technical_characteristics?.mileage?.message && (
                <Form.Text
                  className='text-danger'
                  id='technical_characteristics.mileage'
                >
                  {errors.technical_characteristics.mileage.message}
                </Form.Text>
              )}
            </Form.Group>
          </>
        )}

        <Button variant='primary' type='submit'>
          {/* mode create - Создать */}
          {/* mode update - Обновить */}
          Создать
        </Button>
      </Form>
    </Container>
  );
}