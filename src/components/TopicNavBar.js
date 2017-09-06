import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import './css/TopicNavBar.css';

const topics = [
    {
        '_id': '583412915905f02e4c8e6dfd',
        'title': 'Football',
        'slug': 'football',
        '__v': 0
    },
    {
        '_id': '583412915905f02e4c8e6dfe',
        'title': 'Cooking',
        'slug': 'cooking',
        '__v': 0
    },
    {
        '_id': '583412915905f02e4c8e6dff',
        'title': 'Coding',
        'slug': 'coding',
        '__v': 0
    }
];

class TopicNavBar extends Component {
    constructor (props) {
        super (props);
        this.state = {
            activeBurger: false
        };
        this.toggleBurger = this.toggleBurger.bind(this);
    }
    render() {
        let activeBurger = (this.state.activeBurger) ? 'is-active' : '';
        return (
            <nav className='navbar navbar-css'>
                <div className='navbar-brand'>
                    <span className='navbar-item' >
                        <Link to='#'>
                            <img className='logo' src='https://avatars3.githubusercontent.com/u/6791502?v=3&s=200' alt='Northcoders logo' />
                        </Link>
                    </span>
                    <div onClick={this.toggleBurger} className={`navbar-burger ${activeBurger}`}>
                        <div className="navbar-burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={`navbar-menu ${activeBurger}`}>
                    <div className='navbar-start'>
                        {topics.map((topic, i) => {
                            return (
                                <span className='navbar-item is-hoverable'>
                                    <NavLink className='navbar-text-css' to='#'>
                                        <span>{`< ${topic.title.toUpperCase()} />`}</span>
                                    </NavLink>
                                </span>
                            );
                        })}
                    </div>
                    <div className='navbar-end'>
                    </div>
                </div>
            </nav >
        );
    }
    toggleBurger () {
        this.setState({
            activeBurger: !this.state.activeBurger
        });
    }
}

export default TopicNavBar;