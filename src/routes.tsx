import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Feed from './pages/Feed';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Feed} />
                <Route path="/top-users" component={TopUsers} />
                <Route path="/trending-posts" component={TrendingPosts} />
            </Switch>
        </Router>
    );
};

export default Routes;