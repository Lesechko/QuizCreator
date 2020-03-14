import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ectiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component {
	state = {
		results: {},
		isFinished: false,
		activeQestion: 0,
		answerState: null,
		quiz: [
			{
				question: 'Whats color of sky?',
				id: 1,
				rigthAnswer: 1,
				answers: [
					{text: 'Вопрос 1', id: 1},
					{text: 'Вопрос 2', id: 2},
					{text: 'Вопрос 3', id: 3},
					{text: 'Вопрос 4', id: 4},
				],
			},
			{
				question: 'Whats is your name?',
				rigthAnswer: 1,
				id: 2,
				answers: [
					{text: 'Alex', id: 1},
					{text: 'Vladimir', id: 2},
					{text: 'Ivan', id: 3},
					{text: 'Martin', id: 4},
				],
			},
		],
	};

	onAnswerClickHandler = answerID => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0];
			if (this.state.answerState[key] === 'success') {
				return;
			}
		}

		const question = this.state.quiz[this.state.activeQestion];
		const results = this.state.results;

		if (question.rigthAnswer === answerID) {
			if (!results[question.id]) {
				results[question.id] = 'success';
			}
			this.setState({
				answerState: {[answerID]: 'success'},
				results,
			});
		} else {
			results[question.id] = 'error';
			this.setState({
				answerState: {[answerID]: 'error'},
				results,
			});
		}
		const timeaut = setTimeout(() => {
			if (this.isQuizFinished()) {
				this.setState({
					isFinished: true,
				});
			} else {
				this.setState({
					activeQestion: this.state.activeQestion + 1,
				});
			}
			this.setState({
				answerState: null,
			});
			clearTimeout(timeaut);
		}, 1000);
	};

	isQuizFinished = () => {
		return this.state.activeQestion + 1 === this.state.quiz.length;
	};

	retryHendler = () => {
		this.setState({
			activeQestion: 0,
			answerState: null,
			isFinished: false,
			results: {},
		});
	};

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					{this.state.isFinished ? (
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHendler}
						/>
					) : (
						<ActiveQuiz
							state={this.state.answerState}
							answerNumber={this.state.activeQestion + 1}
							quizLength={this.state.quiz.length}
							onAnswerClick={this.onAnswerClickHandler}
							answers={this.state.quiz[this.state.activeQestion].answers}
							question={this.state.quiz[this.state.activeQestion].question}
						/>
					)}
				</div>
			</div>
		);
	}
}
