/* eslint-disable no-console */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

const homepageErrors = console.error.bind(console.error);
beforeAll(() => {
  console.error = (errormessage) => {
    /*
      if error is a proptype error and includes the following string: `Warning: Failed prop type:`
      suppress the error and don't show it
      if it is not a proptype error, we show it
    */
    const suppressedErrors = errormessage
      .toString()
      .includes('Warning: Failed %s type:');

    // eslint-disable-next-line no-unused-expressions
    !suppressedErrors && homepageErrors(errormessage);
  };
});
afterAll(() => {
  console.error = homepageErrors;
});
