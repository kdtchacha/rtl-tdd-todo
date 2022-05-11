import React from "react";
import { fireEvent, getByPlaceholderText, getByText, render } from "@testing-library/react";
import TodoForm from './TodoForm';
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";

describe('<TodoForm />', () => {
    it('has input and a button', () => {
        const {getByPlaceholderText, getByText} 
        = render(<TodoForm />);
        getByPlaceholderText('할 일을 입력하세요'); //input이 출력 되었는지 확인하는 조건
        getByText('등록'); //button이 출력되었는지 확인

    })

    it('changes input', () => {
        const {getByPlaceholderText} = render(<TodoForm />);
       const input = getByPlaceholderText('할 일을 입력하세요'); 
       fireEvent.change(input, {
           target: {
               value: 'TDD 배우기'
           }
       })
       expect(input).toHaveAttribute('value', 'TDD 배우기');
    })

    it('calls onInsert and clears input', () => {
        const onInsert = jest.fn();
        const {getByPlaceholderText, getByText} = render(<TodoForm onInsert={onInsert} />)
        const input = getByPlaceholderText('할 일을 입력하세요');
        const button = getByText('등록');
        fireEvent.change(input, {
            target: {
                value: 'TDD 배우기'
            }
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기');
    expect(input).toHaveAttribute('value', '');
  })
})