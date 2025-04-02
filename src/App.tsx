import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';
import Navbar from './components/layout/Navbar';
import './assets/styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/top-users" component={TopUsers} />
            <Route path="/trending-posts" component={TrendingPosts} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;