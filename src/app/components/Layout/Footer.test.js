import React from 'react';

import { render } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom/extend-expect';

describe('UI Footer', () => {
  it('has text  © Copyright by React Wizards Guild | 2019', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('© Copyright by React Wizards Guild | 2019')).toBeInTheDocument();
  });
});
