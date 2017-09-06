import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
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
    render () {
        return (
            <nav className='navbar navbar-css'>
                <div className='navbar-start'>
                    {topics.map((topic, i) => {
                        return (
                            <span className='navbar-item'>
                                <NavLink className='navbar-text-css' to='#'>
                                    <span>{`< ${topic.title.toUpperCase()} />`}</span>
                                </NavLink>
                                {i !== topics.length - 1 &&
                                    <span className='navbar-item'>&nbsp;&nbsp;</span>
                                }
                            </span>
                        );
                    })}
                </div>
            </nav>
        );
    }
}

export default TopicNavBar;