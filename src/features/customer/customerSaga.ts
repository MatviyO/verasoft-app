import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { customerApi, type CustomerPayload } from './api/customerApi';
import {
  customerFailed,
  customerRequested,
  customerSucceeded,
} from './customerSlice';

function* handleCustomerLoad() {
  try {
    const data: CustomerPayload = yield call(customerApi.getCustomer);
    yield put(customerSucceeded(data));
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? (error.response?.data?.message ?? error.message)
      : 'Unexpected error';
    yield put(customerFailed(message));
  }
}

export function* customerSaga() {
  yield takeLatest(customerRequested.type, handleCustomerLoad);
}
