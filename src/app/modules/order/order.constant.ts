export const OrderSearchableFields = [
  'user.displayName',
  'user.email',
  'car.carName',
];
export const OrderFilterableFields = [
  'query',
  'user._id',
  'orderDetails.status',
];

export const orderStatus = ['pending', 'shipped', 'delivered', 'cancelled'];
