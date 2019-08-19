import Axios from 'axios';
import { mergeMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { CountI } from '../../reducers/rooms/rooms';

export const FETCH_ROOMS = 'FETCH_ROOMS';
export const FETCH_ROOMS_FULFILLED = 'FETCH_ROOMS_FULFILLED';

interface FetchRoomsI {
  type: typeof FETCH_ROOMS;
}

export const fetchRooms = (): FetchRoomsI => ({
  type: FETCH_ROOMS,
});

interface FetchRoomsFulfilledI {
  type: typeof FETCH_ROOMS_FULFILLED;
}

export const fetchRoomsFulfilled = (): FetchRoomsFulfilledI => ({
  type: FETCH_ROOMS_FULFILLED,
});

export const roomsEpic: Epic<roomsActionTypes, FetchRoomsFulfilledI, CountI> = (action$) => action$.pipe(
  ofType(FETCH_ROOMS),
  mergeMap(
    action => Axios({
      method: 'get',
      url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
      headers: {
        Authorization: 'Bearer pj6Zo71utSu7169UgLSqS0qLr3sippW2rkISAy9B9DQ8Sd3nTIkNaBVQ9nNJ',
        Accept: 'application/json',
      },
    })
      .then((response) => fetchRoomsFulfilled(response.data.roomsId ? response.data : { content: '' }))
      .catch((error) => console.error(error)),
  ),
);

export type roomsActionTypes = FetchRoomsI | FetchRoomsFulfilledI;
