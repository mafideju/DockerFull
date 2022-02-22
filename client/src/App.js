import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <header className="App-header">
          
          <div>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          </div>
          
          <div>
            <Link style={{ color: 'orange', paddingRight: '16px' }} to="/">Home</Link>
            <Link style={{ color: 'orange' }} to="/OtherPage">Learn React</Link>
          </div>

          <div>
            <Route style={{ color: 'orange' }} exact path="/" component={Fib} />
            <Route style={{ color: 'orange' }} path="/OtherPage" component={OtherPage} />
          </div>

        </header>
      </div>
      </Router>
    );
  }
}

export default App;
