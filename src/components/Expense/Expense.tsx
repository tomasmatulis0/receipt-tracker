import * as React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import './Expense.css';
import 'tachyons';
import { IExpense, FIELD_TYPES } from '../../contracts';

interface IExpenseProps {
	addExpense: (receiptId: number) => void;
	handleInputChange: (receiptId: number, expenseId: number, value: number, fieldType: FIELD_TYPES) => void;
	expense: IExpense;
	receiptId: number;
}

const handlePriceInput = (event: any, props: IExpenseProps) => {
	const value = event.target.value.slice(0, -2);
	const re = /^[0-9]+(\.([0-9]{1,2})?)?$/;
	if (value === '' || re.test(value)) {
		props.handleInputChange(props.receiptId, props.expense.id, value, FIELD_TYPES.price);
	}
}

export const Expense = (props: IExpenseProps) => (
	<div>
		<form>
			<FormGroup controlId="formBasicText" className='flex justify-between mh3'>
				<FormControl
					value={props.expense.note}
					className='w-70 mr3'
					type="text"
					maxLength={30}
					placeholder="Enter expense"
					onChange={(event: any) => props.handleInputChange(props.receiptId, props.expense.id, event.target.value, FIELD_TYPES.note)}
				/>
				<FormControl
					value={props.expense.price + ' €'}
					className='w-30 tr'
					type="text"
					maxLength={12}
					placeholder="Price"
					onChange={(event) => handlePriceInput(event, props)}
				/>
			</FormGroup>
		</form>
	</div>
);
