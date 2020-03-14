import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswerList from './AnswerList/AnswerList';

const ActiveQuiz = props => (
	<div className={classes.ActiveQuiz}>
		<p className={classes.Qestion}>
			<span>
				<strong>{props.answerNumber}. </strong>
				{props.question}
			</span>
			<small>
				{props.answerNumber} from {props.quizLength}
			</small>
		</p>

		<AnswerList
			onAnswerClick={props.onAnswerClick}
			answers={props.answers}
			state={props.state}
		/>
	</div>
);

export default ActiveQuiz;
