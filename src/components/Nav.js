import React, { Component } from 'react';
import {Link} from "react-router";
import AppBar from 'material-ui/AppBar';


class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<div className="header">
				<AppBar
					title="PoKéMoN"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
				</div>
				<div className="link">
					<Link to="/">Home</Link>
					<Link to="/pokedex">Pokédex</Link>
					<Link to="/about">About</Link>
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default Nav;
