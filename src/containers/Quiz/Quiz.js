import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ectiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {
	fetchQuizesById,
	quizAnswerClick,
	retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
	componentDidMount() {
		this.props.fetchQuizesById(this.props.match.params.id);
	}

	UNSAFEcomponentWillMount() {
		this.props.retryQuiz();
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					{this.props.loading || !this.props.quiz ? (
						<Loader />
					) : this.props.isFinished ? (
						<FinishedQuiz
							results={this.props.results}
							quiz={this.props.quiz}
							onRetry={this.props.retryQuiz}
						/>
					) : (
						<ActiveQuiz
							state={this.props.answerState}
							answerNumber={this.props.activeQestion + 1}
							quizLength={this.props.quiz.length}
							onAnswerClick={this.props.quizAnswerClick}
							answers={this.props.quiz[this.props.activeQestion].answer}
							question={this.props.quiz[this.props.activeQestion].question}
						/>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loading: state.quiz.loading,
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		activeQestion: state.quiz.activeQestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizesById: id => dispatch(fetchQuizesById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
