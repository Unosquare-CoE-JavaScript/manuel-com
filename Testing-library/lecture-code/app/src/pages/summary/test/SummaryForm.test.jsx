import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('checkbox is initialy unchecked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on click and disables on second click', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  // popover starts hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover shows when mouse hovers the checkbox
  const termsAndConditions = screen.queryByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
