import type { RootState } from '@/app/store';
import axios from 'axios';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { ordersApi, type OrdersPayload } from './ordersApi';
import { ordersFailed, ordersRequested, ordersSucceeded } from './ordersSlice';

function* handleOrdersLoad(action: ReturnType<typeof ordersRequested>) {
  try {
    const { activeTab, filter } = (yield select(
      (state: RootState) => state.orders,
    )) as RootState['orders'];
    if (filter === 'errors') {
      yield delay(2000);
    } else if (action.payload?.delayMs) {
      yield delay(action.payload.delayMs);
    }
    const data: OrdersPayload = yield call(ordersApi.getOrders, {
      tab: activeTab,
      filter,
    });
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
}
