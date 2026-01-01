import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { customerRequested } from '@/features/customer/customerSlice'
import {
  ordersFilterChanged,
  ordersRequested,
  ordersTabChanged,
} from '@/features/orders/ordersSlice'
import { Header } from '@/widgets/header/Header'
import { CustomerSummary } from '@/widgets/customer-summary/CustomerSummary'
import { ActivitySummary } from '@/widgets/activity-summary/ActivitySummary'
import { OrdersSection } from '@/widgets/orders-section/OrdersSection'
import './CustomerPage.scss'

export const CustomerPage = () => {
  const dispatch = useAppDispatch()
  const customer = useAppSelector((state) => state.customer)
  const orders = useAppSelector((state) => state.orders)
  const visibleOrders = orders.orders.filter(
    (order) => order.status === orders.filter,
  )

  useEffect(() => {
    if (customer.status === 'idle') {
      dispatch(customerRequested())
    }
  }, [customer.status, dispatch])

  useEffect(() => {
    if (orders.status === 'idle') {
      dispatch(ordersRequested())
    }
  }, [orders.status, dispatch])

  return (
    <div className="customer-page">
      <Header title={customer.profile?.name ?? 'Customer'} />
      {customer.status === 'loading' || orders.status === 'loading' ? (
        <div className="customer-page__notice">Loading data…</div>
      ) : null}
      {customer.status === 'error' ? (
        <div className="customer-page__notice customer-page__notice--error">
          {customer.error ?? 'Failed to load customer.'}
        </div>
      ) : null}
      {orders.status === 'error' ? (
        <div className="customer-page__notice customer-page__notice--error">
          {orders.error ?? 'Failed to load orders.'}
        </div>
      ) : null}
      <div className="customer-page__summary">
        {customer.profile ? (
          <CustomerSummary profile={customer.profile} />
        ) : null}
        {customer.stats && customer.carrier ? (
          <ActivitySummary stats={customer.stats} carrier={customer.carrier} />
        ) : null}
      </div>
      <OrdersSection
        tabs={orders.tabs}
        activeTab={orders.activeTab}
        filter={orders.filter}
        orders={visibleOrders}
        errorsLoading={orders.errorsLoading}
        onTabChange={(tab) => dispatch(ordersTabChanged(tab))}
        onFilterChange={(filter) => dispatch(ordersFilterChanged(filter))}
      />
    </div>
  )
}
