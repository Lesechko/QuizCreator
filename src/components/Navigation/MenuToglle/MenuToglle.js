import React from 'react';
import classes from './MenuToglle.module.css';

const MenuToglle = props => {
	const cls = [classes.MenuToglle, 'fa'];
	if (props.isOpen) {
		cls.push('fa-times');
		cls.push(classes.open);
	} else {
		cls.push('fa-bars');
	}

	return <i className={cls.join(' ')} onClick={props.onToggle}></i>;
};

export default MenuToglle;
