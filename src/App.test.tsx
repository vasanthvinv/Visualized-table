import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import  {store}  from './app/store';
import Data from './features/components/Data';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Data />
    </Provider>
  );
  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText(/learn/i)).toBeInTheDocument();
});
