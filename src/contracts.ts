export interface IExpense {
	id: number;
	note: string;
	price: string;
}

export interface IReceipt {
	id: number;
	category: CATEGORY_TYPES;
	expenses: IExpense[];
	total: number;
}

export const enum FIELD_TYPES {
	note = 'note',
	price = 'price'
}

export const enum CATEGORY_TYPES {
	food = 'Food',
	houseware = 'Houseware',
	entertainment = 'Entertainment'
}
