import { Model, Types } from 'mongoose';

export type ICar = {
  _id: Types.ObjectId;
  carName: string;
  description: string;
  price: number;
  img: string;
  gallery: string[];
};

export type CarModel = Model<ICar, Record<string, unknown>>;

export type ICarFilters = {
  query?: string;
  carName?: string;
  minPrice?: number;
  maxPrice?: number;
};
