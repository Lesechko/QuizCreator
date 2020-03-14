import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
	const succesCount = Object.keys(props.results).reduce(
		(succesAnswer, allAnswer) => {
			props.results[allAnswer] === 'success' && succesAnswer++;
			return succesAnswer;
		},
		0
	);
	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{props.quiz.map((quizItem, index) => {
					const slc = [
						'fa',
						props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
						classes[props.results[quizItem.id]],
					];
					return (
						<li key={index}>
							<strong>{index + 1}. </strong>
							{quizItem.question}
							<i className={slc.join(' ')} />
						</li>
					);
				})}
			</ul>
			<p>
				Rigth answer {succesCount} from {props.quiz.length}
			</p>
			<div>
				<Button onClick={props.onRetry} type="primery">
					Repead
				</Button>
				<Link to="/">
					<Button type="success">Go to question list</Button>
				</Link>
			</div>
		</div>
	);
};
export default FinishedQuiz;
