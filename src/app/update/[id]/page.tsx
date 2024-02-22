'use client';

import CarForm, { CarFormFields } from '@/components/form/car-form';
import { useState, useEffect } from 'react';

export default function Page() {
  // Настрой маршрутизацию
  const [car, setCar] = useState<CarFormFields | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/cars/1')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        console.log(res);

        throw new Error();
      })
      .then((data) => {
        if (data.technical_characteristics) {
          setCar({
            ...data,
            hasTechnicalCharacteristics: true,
          });
        } else {
          setCar({
            ...data,
            hasTechnicalCharacteristics: false,
          });
        }
      })
      .catch(() => {
        console.log('failed to load');
      });
  }, []);

  if (!car) {
    return <div>loading...</div>;
  }

  return <CarForm mode='update' defaultValues={car} />;
}
