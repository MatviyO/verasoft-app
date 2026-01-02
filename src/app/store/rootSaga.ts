import { customerSaga } from '@/features/customer/customerSaga';
import { ordersSaga } from '@/features/orders/ordersSaga';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(customerSaga), fork(ordersSaga)]);
}
