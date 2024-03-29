import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { v4 as uuid } from 'uuid';
import styles from './car-form.module.scss';
import { useRouter } from 'next/navigation';
import deleteIcon from './assets/delete-icon.svg';
import Image from 'next/image';

export type CarInfo = {
  name: string;
  description: string;
  price: number;
  contacts: string;
  technical_characteristics?: {
    brand?: string | null;
    model?: string | null;
    productionYear?: number | null;
    mileage?: number | null;
  } | null;
  options?: {
    name: string;
    id: string;
  }[];
};

export type CarFormFields = CarInfo & {
  hasTechnicalCharacteristics?: boolean | null;
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
    .typeError('Введите число')
    .required('Заполните цену')
    .positive('Больше нуля'),
  contacts: yup.string().required('Заполните почту').email('Введите почту'),
  hasTechnicalCharacteristics: yup.boolean(),
  technical_characteristics: yup
    .object({
      brand: yup.string().required('Заполните марку авто'),
      model: yup.string().required('Заполните модель авто'),
      productionYear: yup
        .number()
        .typeError('Введите число')
        .required('Заполните год выпуска')
        .positive('Больше нуля'),
      mileage: yup
        .number()
        .typeError('Введите число')
        .required('Заполните пробег авто')
        .positive('Больше нуля'),
    })
    .when('hasTechnicalCharacteristics', {
      is: false,
      then: (schema) =>
        schema.shape({
          brand: yup.string(),
          model: yup.string(),
          productionYear: yup
            .number()
            .transform((value) => (isNaN(value) ? undefined : value))
            .nullable(),
          mileage: yup
            .number()
            .transform((value) => (isNaN(value) ? undefined : value))
            .nullable(),
        }),
    }),
  options: yup.array().of(
    yup.object({
      name: yup.string().required('Введите опцию'),
      id: yup.string().required(),
    })
  ),
});

type Props = {
  mode: 'create' | 'update';
  defaultValues?: Partial<CarFormFields>;
  id?: string | string[];
};

export default function CarForm(props: Props) {
  const { defaultValues, mode, id } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = async (data: any) => {
    const res =
      mode === 'create'
        ? await fetch('http://localhost:8080/cars', {
            method: 'POST',
            body: JSON.stringify({
              id: uuid(),
              ...data,
            }),
          })
        : await fetch('http://localhost:8080/cars/' + id, {
            method: 'PUT',
            body: JSON.stringify({
              id: id,
              ...data,
            }),
          });
    console.log(res.status);
    if (res.status < 300) {
      router.push('/view');
      router.refresh();
    }
  };

  return (
    <Container className={`pt-3 ${styles.formContainer}`}>
      {mode === 'create' ? (
        <h1 className={styles.title}>Создайте объявление</h1>
      ) : mode === 'update' ? (
        <h1 className={styles.title}>Внесите изменения</h1>
      ) : null}
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
            type='text'
            data-type='currency'
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
            type-data='boolean'
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

            {fields.map((fieldItem, index) => (
              <InputGroup key={fieldItem.id} className='mb-3'>
                <Form.Control
                  placeholder='Введите опцию'
                  aria-label='Введите опцию'
                  aria-describedby='basic-addon2'
                  {...register(`options.${index}.name`)}
                />
                <Button
                  variant='outline-danger'
                  id='button-addon2'
                  type='button'
                  onClick={() => {
                    remove(index);
                  }}
                >
                  -Удалить
                </Button>
              </InputGroup>
            ))}

            <Button
              type='button'
              variant='outline-dark'
              onClick={() => {
                append({
                  id: uuid(),
                  name: '',
                });
              }}
            >
              +Добавить опцию
            </Button>
          </>
        )}

        {mode === 'create' ? (
          <Button variant='primary' type='submit' className={styles.btn}>
            Создать
          </Button>
        ) : mode === 'update' ? (
          <Button variant='primary' type='submit' className={styles.btn}>
            Изменить
          </Button>
        ) : null}
      </Form>
    </Container>
  );
}
