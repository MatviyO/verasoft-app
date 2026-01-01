import type { Order } from '@/entities/order/types'
import { Badge } from '@/shared/ui/Badge/Badge'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { DotsLoader } from '@/shared/ui/Loader/DotsLoader'
import { TabList } from '@/shared/ui/Tabs/TabList'
import './OrdersSection.css'

type OrdersSectionProps = {
  tabs: string[]
  activeTab: string
  filter: 'sent' | 'errors'
  orders: Order[]
  errorsLoading: boolean
  onTabChange: (tab: string) => void
  onFilterChange: (filter: 'sent' | 'errors') => void
}

export const OrdersSection = ({
  tabs,
  activeTab,
  filter,
  orders,
  errorsLoading,
  onTabChange,
  onFilterChange,
}: OrdersSectionProps) => {
  const isSent = filter === 'sent'
  const isErrors = filter === 'errors'
  const isEmpty = !errorsLoading && orders.length === 0

  return (
  <section className="orders-section">
    <TabList tabs={tabs} active={activeTab} onChange={onTabChange} />
    <Card className="orders-section__table">
      <div className="orders-section__header">
        <div className="orders-section__filters">
          <button
            className={`orders-section__filter ${
              isSent ? 'is-active' : ''
            }`.trim()}
            onClick={() => onFilterChange('sent')}
            type="button"
          >
            {isSent ? (
              <Badge tone="neutral">Sent</Badge>
            ) : (
              <span className="orders-section__filter-label">Sent</span>
            )}
          </button>
          <button
            className={`orders-section__filter ${
              isErrors ? 'is-active' : ''
            }`.trim()}
            onClick={() => onFilterChange('errors')}
            type="button"
          >
            {isErrors ? (
              <Badge tone="neutral">Errors</Badge>
            ) : (
              <span className="orders-section__filter-label">Errors</span>
            )}
          </button>
        </div>
        <div className="orders-section__title">Recent Orders</div>
        <div className="orders-section__spacer" aria-hidden="true" />
      </div>
      {isErrors && (errorsLoading || isEmpty) ? null : (
        <div className="orders-section__columns">
          <span>Date &amp; Time</span>
          <span>Subject</span>
          <span>Communication Type</span>
          <span>Order #</span>
          <span />
        </div>
      )}
      <div
        className={`orders-section__rows ${
          isEmpty ? 'orders-section__rows--empty' : ''
        }`.trim()}
      >
        {errorsLoading ? (
          <div className="orders-section__loader">
            <DotsLoader />
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-section__empty">No Items</div>
        ) : (
          orders.map((order) => (
            <div className="orders-section__row" key={order.id}>
              <div className="orders-section__cell">
                <div className="orders-section__date">{order.date}</div>
                <div className="orders-section__time">{order.time}</div>
              </div>
              <div className="orders-section__cell">
                <div className="orders-section__subject">{order.subject}</div>
                <div className="orders-section__contact">{order.contact}</div>
              </div>
              <div className="orders-section__cell">
                {order.communicationType}
              </div>
              <div className="orders-section__cell">{order.orderNumber}</div>
              <div className="orders-section__cell">
                <Button size="sm" variant="ghost">
                  Resend
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  </section>
)
}
