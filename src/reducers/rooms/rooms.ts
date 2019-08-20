import { roomsActionTypes, FETCH_ROOMS, FETCH_ROOMS_FULFILLED } from '../../actions/rooms/rooms';

export interface RoomsItemI {
  id: string;
  imageUrl: string;
  normalDayPrice: number;
  holidayPrice: number;
  name: string;
}

export interface RoomsI {
  rooms: RoomsItemI[];
  loading: boolean;
}

const initState: RoomsI = {
  rooms: [],
  loading: false,
};

const reducer = (state = initState, action: roomsActionTypes): RoomsI => {
  switch (action.type) {
    case FETCH_ROOMS:
      return {
        ...state,
        rooms: [],
        loading: true,
      };
    case FETCH_ROOMS_FULFILLED:
      return {
        ...state,
        rooms: [
          ...state.rooms,
          ...action.payload.rooms,
        ],
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};

export default reducer;
