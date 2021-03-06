import React, {Component} from 'react';
import './QuizCreator.css';
import Button from '../../components/UI/Button/Button';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import {connect} from 'react-redux';
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create';

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
		option1: createOptionalControl(1),
		option2: createOptionalControl(2),
		option3: createOptionalControl(3),
		option4: createOptionalControl(4),
	};
}

class QuizCreator extends Component {
	state = {
		formControls: createFormControl(),
		isFormValid: false,
		rightAnswerId: 1,
	};

	submitHendler(event) {
		event.preventDefault();
	}

	createQuizHandler = event => {
		event.preventDefault();

		this.setState({
			formControls: createFormControl(),
			isFormValid: false,
			rightAnswerID: 1,
		});

		this.props.finishCreateQuiz();
	};

	changeHandler(value, controlName) {
		const formControls = {...this.state.formControls};
		const control = {...formControls[controlName]};

		control.touched = true;
		control.value = value;
		control.valid = validate(control.value, control.validation);

		formControls[controlName] = control;

		this.setState({formControls, isFormValid: validateForm(formControls)});
	}

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
					{index === 0 ? <hr /> : null}
				</Auxiliary>
			);
		});
	}
	addQuestionHandler = event => {
		event.preventDefault();

		const {
			option1,
			option2,
			option3,
			option4,
			question,
		} = this.state.formControls;
		console.log(this.state.formControls);

		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answer: [
				{
					text: option1.value,
					id: option1.id,
				},
				{
					text: option2.value,
					id: option2.id,
				},
				{
					text: option3.value,
					id: option3.id,
				},
				{
					text: option4.value,
					id: option4.id,
				},
			],
		};

		this.props.createQuizQuestion(questionItem);

		this.setState({
			formControls: createFormControl(),
			isFormValid: false,
			rightAnswerID: 1,
		});
	};

	selectChangeHandler = event => {
		const rightAnswerID = +event.target.value;
		this.setState({rightAnswerID});
	};

	render() {
		const select = (
			<Select
				label="Choose the correct answer"
				value={this.state.rightAnswerID}
				onChange={this.selectChangeHandler}
				option={[
					{value: 1, text: 1},
					{value: 2, text: 2},
					{value: 3, text: 3},
					{value: 4, text: 4},
				]}
			/>
		);

		return (
			<div className="QuizCreator">
				<div>
					<h1>Create Quiz</h1>
					<form onSubmit={this.submitHandler}>
						{this.renderInputs()}
						{select}
						<Button
							type="primery"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}
						>
							Add question
						</Button>
						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.props.quiz.length === 0}
						>
							Create Test
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		quiz: state.create.quiz,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
