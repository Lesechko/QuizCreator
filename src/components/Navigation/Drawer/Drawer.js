import React, {Component} from 'react';
import classes from './Drawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from 'react-router-dom';

class Drawer extends Component {
	renderLinks = links => {
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
		const links = [
			{
				to: '/',
				label: 'List',
				exact: true,
			},
		];
		if (this.props.isAuthenticated) {
			links.push({
				to: '/quiz-creator',
				label: 'Create quiz',
				exact: false,
			});
			links.push({
				to: '/logout',
				label: 'LogOut',
				exact: false,
			});
		} else {
			links.push({
				to: '/auth',
				label: 'Autorization',
				exact: false,
			});
		}

		return (
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks(links)}</ul>
				</nav>
				{this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
			</React.Fragment>
		);
	}
}

export default Drawer;
