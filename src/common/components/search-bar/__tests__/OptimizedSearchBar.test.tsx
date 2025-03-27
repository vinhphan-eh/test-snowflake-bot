import React from 'react';
import { fireEvent, render } from '../../../utils/testing';
import OptimizedSearchBar from '../OptimizedSearchBar';

describe('OptimizedSearchBar', () => {
  it('should call onChange prop with input value', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<OptimizedSearchBar testId="search-bar" onChange={onChangeMock} />);
    const input = getByTestId('search-bar');
    fireEvent.changeText(input, { nativeEvent: { text: 'Good Day' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should pass undefined value', () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();
    const { getByTestId } = render(
      <OptimizedSearchBar testId="search-bar" onChange={onChangeMock} onBlur={onBlurMock} />
    );
    const input = getByTestId('search-bar');
    fireEvent.changeText(input, { nativeEvent: { text: 'Good Day' } });
    expect(onChangeMock).toHaveBeenCalled();
    fireEvent(input, 'blur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('should render with disabled state', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<OptimizedSearchBar testId="search-bar" onChange={onChangeMock} isDisabled />);
    const input = getByTestId('search-bar');
    expect(input.props).toHaveProperty('editable', false);
  });

  it('should focus on input', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<OptimizedSearchBar testId="search-bar" onChange={onChangeMock} placeholder="" />);
    const input = getByTestId('search-bar');
    fireEvent(input, 'focus');
    expect(input.props).toHaveProperty('placeholder', '');
  });
});
