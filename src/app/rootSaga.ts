import { all, fork } from 'redux-saga/effects'
import { customerSaga } from '@/features/customer/customerSaga'
import { ordersSaga } from '@/features/orders/ordersSaga'

export function* rootSaga() {
  yield all([fork(customerSaga), fork(ordersSaga)])
}
