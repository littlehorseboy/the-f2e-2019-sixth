import { reserveSuccessActionTypes, RESERVESUCCESS } from '../../actions/reserveSuccess/reserveSuccess';

export interface ReserveSuccessI {
  refNo: string;
  reserveDate: string;
  guestCount: number;
  nightCount: number;
  bed: string;
  price: number;
}

const initState: ReserveSuccessI = {
  refNo: '',
  reserveDate: '',
  guestCount: 0,
  nightCount: 0,
  bed: '',
  price: 0,
};

const reducer = (state = initState, action: reserveSuccessActionTypes): ReserveSuccessI => {
  switch (action.type) {
    case RESERVESUCCESS:
      return {
        refNo: action.payload.refNo,
        reserveDate: action.payload.reserveDate,
        guestCount: action.payload.guestCount,
        nightCount: action.payload.nightCount,
        bed: action.payload.bed,
        price: action.payload.price,
      };
    default:
      return state;
  }
};

export default reducer;
