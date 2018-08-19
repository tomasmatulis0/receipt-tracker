import * as React from 'react';
import { Expense } from '../Expense/Expense';
import { FIELD_TYPES, IExpense } from '../../contracts';

interface IExpenseListProps {
	addExpense: (receiptId: number) => void;
	handleInputChange: (receiptId: number, expenseId: number, value: number, fieldType: FIELD_TYPES) => void;
	expenses: IExpense[];
	receiptId: number;
}

export const ExpenseList = (props: IExpenseListProps) => (
	<div>
		{props.expenses.map((expense) => (
			<Expense
				key={expense.id}
				expense={expense}
				handleInputChange={props.handleInputChange}
				addExpense={props.addExpense}
				receiptId={props.receiptId}
			/>
		))}
	</div>
);
