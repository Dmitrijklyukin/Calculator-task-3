import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const ARITHMETIC_OPERATORS = ['C', '-', '+', '='];

	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState('');

	function reset(zero) {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult('');
	}

	if (operator === 'C') {
		reset();
	}

	function numberEntryButton({ target }) {
		if (operator === '+' || operator === '-') {
			if (operand2 === '0') {
				setOperand2(target.textContent);
			} else if (operand2.length < 10) {
				setOperand2(operand2 + target.textContent);
			}
		} else if (operand1 === '0') {
			setOperand1(target.textContent);
		} else if (operand1.length < 10) {
			setOperand1(operand1 + target.textContent);
		} else if (operator === '=') {
			if (operand1 === '0') {
				setOperand1(target.textContent);
			} else {
				setOperand1(operand1 + target.textContent);
			}
		}
	}

	function arithmeticOperatorsButton({ target }) {
		if (target.textContent === '=' && !operand2) {
			setResult(operand1);
		} else if (target.textContent === '=' && operator === '-') {
			setResult(+operand1 - +operand2);
		} else if (target.textContent === '=' && operator === '+') {
			setResult(+operand1 + +operand2);
		}

		if (
			operator === '=' &&
			(target.textContent === '-' || target.textContent === '+')
		) {
			reset();
			setOperand1(result);
			setOperator(target.textContent);
		} else {
			setOperator(target.textContent);
		}
	}

	return (
		<div className={styles['container']}>
			<div className={styles['output']}>
				{operator !== '=' ? (
					<input type="text" value={`${operand1} ${operator} ${operand2}`} />
				) : (
					<input
						type="text"
						value={`${result}`}
						className={styles['input-green']}
					/>
				)}
			</div>
			<div className={styles['buttons']}>
				{NUMS.map((item) => (
					<button key={item} onClick={numberEntryButton}>
						{item}
					</button>
				))}
			</div>
			<div className={styles['buttons']}>
				{ARITHMETIC_OPERATORS.map((item) => (
					<button key={item} onClick={arithmeticOperatorsButton}>
						{item}
					</button>
				))}
			</div>
		</div>
	);
};
