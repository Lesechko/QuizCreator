import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import classes from './AnswerList.module.css';

const AnswerList = props => {
	return (
		<ul className={classes.AnswerList}>
			{props.answers.map((answer, index) => {
				return (
					<AnswerItem
						state={props.state ? props.state[answer.id] : null}
						answer={answer}
						key={index}
						onAnswerClick={props.onAnswerClick}
					/>
				);
			})}
		</ul>
	);
};
export default AnswerList;
