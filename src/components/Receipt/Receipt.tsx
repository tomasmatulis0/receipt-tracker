import * as React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import 'tachyons';
import { ExpenseList } from '../ExpenseList/ExpenseList';
import { Total } from '../Total/Total';
import { IReceipt, FIELD_TYPES, CATEGORY_TYPES } from '../../contracts';

interface IReceiptProps {
  addExpense: (receiptId: number) => void;
  handleInputChange: (receiptId: number, expenseId: number, value: number, fieldType: FIELD_TYPES) => void;
  handleDropChange: (receiptId: number, selection: string) => void;
  receipt: IReceipt;
}

export const Receipt = (props: IReceiptProps) => (
  <div className='flex flex-column ba ma2 bg-light-gray'>
    <div className='flex justify-between'>
      <div className='ma3'>
        <FormGroup controlId='formControlsSelect'>
          <FormControl
            componentClass='select'
            placeholder='select'
            onChange={(event: any) => props.handleDropChange(props.receipt.id, event.target.value)}
          >
            <option>{CATEGORY_TYPES.food}</option>
            <option>{CATEGORY_TYPES.houseware}</option>
            <option>{CATEGORY_TYPES.entertainment}</option>
          </FormControl>
        </FormGroup>
      </div>
      <div className='ma3'>
        <Button bsStyle='primary' onClick={() => props.addExpense(props.receipt.id)} >Add expense</Button>
      </div>
    </div>

    <div>
      <ExpenseList
        addExpense={props.addExpense}
        handleInputChange={props.handleInputChange}
        expenses={props.receipt.expenses}
        receiptId={props.receipt.id}
      />
    </div>
    <div>
      <Total isButtonNeeded={false} total={props.receipt.total} />
    </div>
  </div>
);
