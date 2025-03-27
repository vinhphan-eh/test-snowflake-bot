import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('should call onChange prop with input value', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<SearchBar testId="search-bar" onChange={onChangeMock} value="test" />);
    const input = getByTestId('search-bar');
    fireEvent.changeText(input, { nativeEvent: { text: 'Good Day' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should pass undefined value', () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar testId="search-bar" onChange={onChangeMock} value={undefined} onBlur={onBlurMock} />
    );
    const input = getByTestId('search-bar');
    fireEvent.changeText(input, { nativeEvent: { text: 'Good Day' } });
    expect(onChangeMock).toHaveBeenCalled();
    fireEvent(input, 'blur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('should render with disabled state', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<SearchBar testId="search-bar" onChange={onChangeMock} value="123" isDisabled />);
    const input = getByTestId('search-bar');
    expect(input.props).toHaveProperty('editable', false);
  });

  it('should render with disabled state and iconAfter', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar testId="search-bar" onChange={onChangeMock} value="" iconAfter="warning" isDisabled />
    );
    const input = getByTestId('search-bar');
    fireEvent.press(input);
    expect(input.props).toHaveProperty('value', '');
  });

  it('should focus on input', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar testId="search-bar" onChange={onChangeMock} value="" iconAfter="warning" placeholder="" />
    );
    const input = getByTestId('search-bar');
    fireEvent(input, 'focus');
    expect(input.props).toHaveProperty('placeholder', '');
  });

  it('should clear input', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <SearchBar testId="search-bar" onChange={onChangeMock} value="123" iconAfter="warning" placeholder="" />
    );
    const button = getByTestId('search-bar-clear-button');
    fireEvent.press(button);
    expect(onChangeMock).toHaveBeenCalled();
  });
});
