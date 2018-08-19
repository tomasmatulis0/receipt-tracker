import * as React from 'react';
import { Button } from 'react-bootstrap';
import 'tachyons';
import { IReceipt } from '../../contracts';

interface ITotalProps {
	addReceipt?: () => void;
	isButtonNeeded: boolean;
	total: number;
}

export const Total = (props: ITotalProps) => (
	<div className='flex justify-between items-center'>
		<div className='mh4 mv3'>
			<p className='ma0'>Total</p>
		</div>
		<div className='mh4 mv3'>
			<p className='ma0 underline totalPrice'>{props.total} &euro;</p>
		</div>
		{props.isButtonNeeded &&
			<div className='ma3'>
				<Button bsStyle='primary' onClick={props.addReceipt} >Add receipt</Button>
			</div>
		}
	</div>
);
