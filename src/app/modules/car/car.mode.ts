import { Schema, model } from 'mongoose';
import { CarModel, ICar } from './car.interface';

const carSchema = new Schema<ICar, Record<string, unknown>>({
  carName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
    required: false,
  },
});

export const Car = model<ICar, CarModel>('Car', carSchema, 'cars');
