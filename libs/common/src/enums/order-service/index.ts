export enum OrderStatus {
  PENDING = 100,
  CONFIRMED = 200,
  CREATED = 300,
  DELIVERED = 400,
  CANCELLED = 500,
}

export enum OrderAction {
  CREATED = 'CREATE',
  UPDATED = 'UPDATE',
  DELETED = 'DELETE',
}
