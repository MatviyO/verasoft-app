import { renderWithProviders } from '@/test-utils';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the customer layout', () => {
    renderWithProviders(<App />, {
      customer: {
        status: 'success',
        profile: {
          id: 'c-1',
          name: 'Joseph Smith',
          gender: 'Male',
          age: 33,
          email: 'joe.smith@testemail.com',
          phones: ['248-555-1000'],
          accountId: '12345678',
        },
        stats: { sms: 6, email: 4, orders: 1 },
        carrier: { status: 'IN', since: 'Jun 3, 2016' },
        error: null,
      },
      orders: {
        status: 'success',
        error: null,
        tabs: ['Orders AAA'],
        activeTab: 'Orders AAA',
        filter: 'sent',
        sortKey: 'date',
        sortDirection: 'asc',
        orders: [
          {
            id: 'o-1',
            date: 'Sat, Apr 14',
            time: '4:19 PM',
            sentAt: 100,
            subjectTitle: 'Thank You Bonus',
            subjectEmail: 'joe.smith@testemail.com',
            communicationType: 'Promotion Email',
            orderNumber: '12345546',
            status: 'sent',
          },
        ],
      },
    });

    expect(
      screen.getByRole('button', { name: /new order/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/recent orders/i)).toBeInTheDocument();
  });
});
