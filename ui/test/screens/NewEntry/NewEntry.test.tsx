import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import NewEntry from '../../../src/screens/NewEntry/NewEntry'
import { NewEntryProps } from '../../../src/screens/NewEntry/NewEntry.types'

describe('NewEntry', () => {
  test('should match the snapshot', () => {
    const props: NewEntryProps = {
      onSubmit: () => {},
      categories: ["health"]
    };

    const {container} = render(<NewEntry {...props} />);
    
    expect(container).toMatchSnapshot();
  });
});