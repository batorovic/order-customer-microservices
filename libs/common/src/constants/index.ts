import { SORT_ORDER } from '../enums';

export * from './error-messages';

export const MONGO_TIMEOUT = 15000;

export const PAGINATION_DEFAULT_VALUES = {
  LIMIT: 20,
  SKIP: 0,
  ORDER: SORT_ORDER.ASC,
};
