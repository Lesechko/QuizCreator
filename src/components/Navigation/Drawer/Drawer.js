import React, {Component} from 'react';
import classes from './Drawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from 'react-router-dom';

const links = [
	{
		to: '/',
		label: 'List',
		exact: true,
	},
	{
		to: '/auth',
		label: 'Autorization',
		exact: false,
	},
	{
		to: '/quiz-creator',
		label: 'Create quiz',
		exact: false,
	},
];

class Drawer extends Component {
	renderLinks = () => {
		return links.map((el, ind) => {
			return (
				<li key={ind}>
					<NavLink
						to={el.to}
						exact={el.exact}
						activeClassName={classes.active}
						onClick={this.clickHendler}
					>
						{el.label}
					</NavLink>
				</li>
			);
		});
	};

	clickHendler = () => {
		this.props.onClose();
	};

	render() {
		const cls = [classes.Drawer];
		if (!this.props.isOpen) {
			cls.push(classes.close);
		}
		return (
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks()}</ul>
				</nav>
				{this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
			</React.Fragment>
		);
	}
}

export default Drawer;
