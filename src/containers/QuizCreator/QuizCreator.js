import React, {Component} from 'react';
import './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import {createControl} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
function createOptionalControl(num) {
	return createControl(
		{
			label: 'Variant' + num,
			errorMassage: 'This string is can`t be empty',
			id: num,
		},
		{required: true}
	);
}

function createFormControl() {
	return {
		question: createControl(
			{
				label: 'Enter your question',
				errorMassage: 'Question is can`t be empty',
			},
			{required: true}
		),
		optional1: createOptionalControl(1),
		optional2: createOptionalControl(2),
		optional3: createOptionalControl(3),
		optiona4: createOptionalControl(4),
	};
}

class QuizCreator extends Component {
	state = {
		quiz: [],
		formControls: createFormControl(),
	};

	submitHendler(event) {
		event.preventDefault();
	}

	changeHandler(value, controlName) {}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Auxiliary key={controlName + index}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMassage={control.errorMassage}
						onChange={event =>
							this.changeHandler(event.target.value, controlName)
						}
					/>
					{index == 0 ? <hr /> : null}
				</Auxiliary>
			);
		});
	}
	addQuestionHandler = () => {};
	createTestHandler = () => {};
	render() {
		return (
			<div className="QuizCreator">
				<div>
					<h1>Create Quiz</h1>
					<form onSubmit={this.submitHandler}>
						{this.renderInputs()}
						<select></select>
						<Button type="primery" onClick={this.addQuestionHandler}>
							Add question
						</Button>
						<Button type="success" onClick={this.createTestHandler}>
							{' '}
							Create Test{' '}
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default QuizCreator;
