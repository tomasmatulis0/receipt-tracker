import * as React from 'react';
import './App.css';
import { ReceiptList } from './components/ReceiptList/ReceiptList';
import { Total } from './components/Total/Total';
import 'tachyons';
import { Expense } from './components/Expense/Expense';
import { IReceipt, FIELD_TYPES, CATEGORY_TYPES } from './contracts';

interface IAppState {
  receipts: IReceipt[];
  total: number;
}

export class App extends React.Component<{}, IAppState> {
  state = {
    receipts: [],
    total: 0
  }

  addReceipt = () => {
    const updatedReceipts = [...this.state.receipts];
    const blankReceipt: IReceipt = {
      id: updatedReceipts.length,
      category: CATEGORY_TYPES.food,
      expenses: [],
      total: 0
    }
    updatedReceipts.push(blankReceipt);
    this.setState({ receipts: updatedReceipts });
  }

  handleDropChange = (receiptId: number, selection: string) => {
    const updatedReceipts = [...this.state.receipts];
    updatedReceipts[receiptId].type = selection;
    this.setState({ receipts: updatedReceipts });
  }

  addExpense = (receiptId: number) => {
    const updatedReceipts = [...this.state.receipts];
    const blankExpense = {
      id: updatedReceipts[receiptId].expenses.length,
      expense: '',
      price: ''
    }
    updatedReceipts[receiptId].expenses.push(blankExpense);
    this.setState({ receipts: updatedReceipts });
  }

  handleInputChange = (receiptId: number, expenseId: number, value: number, fieldType: FIELD_TYPES) => {
    const updatedReceipts = [...this.state.receipts];

    switch (fieldType) {
      case FIELD_TYPES.note:
        updatedReceipts[receiptId].expenses[expenseId].expense = value;
        this.setState({ receipts: updatedReceipts });
        break;
      case FIELD_TYPES.price:
        updatedReceipts[receiptId].expenses[expenseId].price = value;
        this.setState({ receipts: updatedReceipts }, () => this.updateReceiptTotal(receiptId));
        break;
    }
  }

  updateReceiptTotal = (receiptId: number) => {
    const updatedReceipts = [...this.state.receipts];
    const receipt: IReceipt = updatedReceipts[receiptId];
    let total = 0;

    receipt.expenses.forEach(expense => {
      const parsedValue = parseFloat(expense.price);
      total += !isNaN(parsedValue) ? parsedValue : 0;
    });
    receipt.total = Math.round(total * 100) / 100;
    this.setState({ receipts: updatedReceipts }, () => this.updateGrandTotal());
  }

  updateGrandTotal = () => {
    const receipts: IReceipt[] = this.state.receipts;
    let grandTotal = 0;
    receipts.forEach(receipt => {
      grandTotal += receipt.total;
    });
    this.setState({ total: Math.round(grandTotal * 100) / 100 });
  }

  render() {
    return (
      <div className='App flex w-30'>
        <div className='w-100 bg-white ba flex flex-column justify-between'>
          <ReceiptList
            receipts={this.state.receipts}
            handleDropChange={this.handleDropChange}
            addExpense={this.addExpense}
            handleInputChange={this.handleInputChange}
          />
          <div className='bt'>
            <Total
              addReceipt={this.addReceipt}
              isButtonNeeded={true}
              total={this.state.total}
            />
          </div>
        </div>
      </div>
    );
  }
}
