import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';

class QuizList extends Component {
	renderQuizList = () => {
		return [1, 2, 3].map((el, index) => (
			<li key={index}>
				<NavLink to={'/quiz/' + el}>Test {el}</NavLink>
			</li>
		));
	};

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Quiz List</h1>
					<ul>{this.renderQuizList()}</ul>
				</div>
			</div>
		);
	}
}

export default QuizList;
