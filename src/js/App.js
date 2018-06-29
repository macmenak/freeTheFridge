import React, { Component } from 'react';
import '../css/App.css';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import {
  Container,
  Icon,
  Menu,
  Segment,
  Header,
} from 'semantic-ui-react';

import Ingredients from './Ingredients';
import Recipes from './Recipes';

import headerBackground from '../images/header_bg_1920.jpg';

const NoMatch = () => (
  <Container text textAlign='center'>
    <Icon name='bug' size='huge' color='grey' />
    <Header as='h2'>Woops... Something went wrong. We can't find such page.</Header>
    <p><Link to='/'>Ok, then take me to the home page</Link></p>
  </Container>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu fixed='top'>
            <Container>
              <Link to="/">
                <Menu.Item header>
                  <Icon name='food' size='large'/> freeTheFridge
                </Menu.Item>
              </Link>
            </Container>
          </Menu>
          <Container fluid style={{backgroundColor: '#2c2121', backgroundImage: `url(${headerBackground})`, backgroundSize: 'cover', backgroundPositionY: 'top'}}>
            <Container fluid textAlign='center' style={{ padding: '9em 0 7em 0', backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
              <Header inverted as='h1'>Find recipes for the food that's left in your fridge</Header>
            </Container>
          </Container>
          <Container style={{minHeight: '250px', padding: '2em 0' }}>
            <Switch>
                <Route exact path="/" component={Ingredients}/>
                <Route path="/recipes/:ingredients" component={Recipes}/>
                <Route component={NoMatch}/>
            </Switch>
          </Container>

          <Segment inverted vertical style={{ margin: '5em 0em 0em 0em', padding: '5em 0em', backgroundColor: '#2c2121' }}>
            <Container textAlign='center'>
              2018 freeTheFridge - created by Maciej Menakiewicz
            </Container>
          </Segment>
          
          </div>
        </Router>
      
    );
  }
}

export default App;
