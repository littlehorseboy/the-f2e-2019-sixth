import { ReserveSuccessI } from '../../reducers/reserveSuccess/reserveSuccess';

export const RESERVESUCCESS = 'RESERVESUCCESS';

interface ReserveSuccessActionI {
  type: typeof RESERVESUCCESS;
  payload: ReserveSuccessI;
}

export const reserveSuccess = (
  payload: ReserveSuccessI,
): ReserveSuccessActionI => ({
  type: RESERVESUCCESS,
  payload,
});

export type reserveSuccessActionTypes = ReserveSuccessActionI;
