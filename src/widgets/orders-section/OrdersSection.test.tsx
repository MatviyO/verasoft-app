import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OrdersSection } from './OrdersSection';

describe('OrdersSection', () => {
  it('renders tabs and rows', () => {
    render(
      <OrdersSection
        tabs={['Orders A', 'Orders AAA']}
        activeTab="Orders AAA"
        filter="sent"
        orders={[
          {
            id: 'o-1',
            date: 'Sat, Apr 14',
            time: '4:19 PM',
            subject: 'Thank You Bonus',
            contact: 'joe.smith@testemail.com',
            communicationType: 'Promotion Email',
            orderNumber: '12345546',
            status: 'sent',
          },
        ]}
        errorsLoading={false}
        onTabChange={() => undefined}
        onFilterChange={() => undefined}
      />,
    );

    expect(screen.getByRole('tab', { name: /orders aaa/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText(/promotion email/i)).toBeInTheDocument();
  });

  it('calls handlers on click', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    const onFilterChange = vi.fn();

    render(
      <OrdersSection
        tabs={['Orders A', 'Orders AAA']}
        activeTab="Orders A"
        filter="sent"
        orders={[]}
        errorsLoading={false}
        onTabChange={onTabChange}
        onFilterChange={onFilterChange}
      />,
    );

    await user.click(screen.getByRole('tab', { name: /orders aaa/i }));
    await user.click(screen.getByText(/errors/i));

    expect(onTabChange).toHaveBeenCalledWith('Orders AAA');
    expect(onFilterChange).toHaveBeenCalledWith('errors');
  });

  it('shows loader when errors are loading', () => {
    render(
      <OrdersSection
        tabs={['Orders A']}
        activeTab="Orders A"
        filter="errors"
        orders={[]}
        errorsLoading
        onTabChange={() => undefined}
        onFilterChange={() => undefined}
      />,
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });
});
