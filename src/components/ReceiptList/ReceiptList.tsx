import * as React from 'react';
import { Receipt } from '../Receipt/Receipt';
import 'tachyons';
import { FIELD_TYPES, IReceipt } from '../../contracts';

interface IReceiptListProps {
	addExpense: (receiptId: number) => void;
	handleInputChange: (receiptId: number, expenseId: number, value: number, fieldType: FIELD_TYPES) => void;
	handleDropChange: (receiptId: number, selection: string) => void;
	receipts: IReceipt[];
}

export const ReceiptList = (props: IReceiptListProps) => (
	<div className='overflow-y-auto'>
		{props.receipts.map((receipt) => (
			<Receipt
				key={receipt.id}
				receipt={receipt}
				handleDropChange={props.handleDropChange}
				addExpense={props.addExpense}
				handleInputChange={props.handleInputChange}
			/>
		))}
	</div>
);
