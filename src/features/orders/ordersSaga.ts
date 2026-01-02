import axios from 'axios';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { ordersApi, type OrdersPayload } from './ordersApi';
import {
  ordersErrorsLoadingSet,
  ordersFailed,
  ordersFilterChanged,
  ordersRequested,
  ordersSucceeded,
} from './ordersSlice';

function* handleOrdersLoad() {
  try {
    const data: OrdersPayload = yield call(ordersApi.getOrders);
    yield put(ordersSucceeded(data));
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message ?? error.message)
      : 'Unexpected error';
    yield put(ordersFailed(message));
  }
}

export function* ordersSaga() {
  yield takeLatest(ordersRequested.type, handleOrdersLoad);
  yield takeLatest(ordersFilterChanged.type, handleOrdersFilterChange);
}

function* handleOrdersFilterChange(
  action: ReturnType<typeof ordersFilterChanged>,
) {
  if (action.payload !== 'errors') {
    yield put(ordersErrorsLoadingSet(false));
    return;
  }

  yield put(ordersErrorsLoadingSet(true));
  yield delay(2000);
  yield put(ordersErrorsLoadingSet(false));
}
