import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CustomerSummary } from './CustomerSummary';

describe('CustomerSummary', () => {
  it('renders customer profile data', () => {
    render(
      <CustomerSummary
        profile={{
          id: 'c-1',
          name: 'Joseph Smith',
          gender: 'Male',
          age: 33,
          email: 'joe.smith@testemail.com',
          phones: ['248-555-1000'],
          accountId: '12345678',
        }}
      />,
    );

    expect(screen.getByText(/male - 33/i)).toBeInTheDocument();
    expect(screen.getByText(/#12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/joe.smith@testemail.com/i)).toBeInTheDocument();
  });
});
