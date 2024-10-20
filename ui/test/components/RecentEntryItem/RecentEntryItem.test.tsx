import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import RecentEntryItem from '@components/RecentEntryItem/RecentEntryItem';
import RecentEntryItemProps from '@components/RecentEntryItem/RecentEntryItemProps';

describe('RecentEntryItem', () => {
  
  test('should match the snapshot', () => {
    const props: RecentEntryItemProps = {
      category: 'health',
      amount: '-12',
      date: 'date',
      description: 'string',
      id: 1,
      highlight: false,
      onClick: () => {},
    };
    render(<RecentEntryItem {...props} />);
    expect(screen.getAllByRole('button')).toMatchSnapshot();
  });

  test('should item be green for amount credited', () => {
    const props: RecentEntryItemProps = {
      category: 'health',
      amount: '12',
      date: 'date',
      description: 'string',
      id: 1,
      highlight: false,
      onClick: () => {},
    };

    render(<RecentEntryItem {...props} />);
    const element = screen.getByText('12')
    const style = window.getComputedStyle(element)
    expect(style.color).toBe('rgb(0, 128, 0)')
  });

  test('should item be red for amount debited', () => {
    const props: RecentEntryItemProps = {
      category: 'health',
      amount: '-12',
      date: 'date',
      description: 'string',
      id: 1,
      highlight: false,
      onClick: () => {},
    };

    render(<RecentEntryItem {...props} />);
    const element = screen.getByText('-12')
    const style = window.getComputedStyle(element)
    expect(style.color).toBe('rgb(255, 0, 0)')
  });
});
