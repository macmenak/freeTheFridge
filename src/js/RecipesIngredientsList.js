import React, { Component } from 'react';
import '../css/App.css';
import {
    Button,
    Checkbox,
    Divider,
    Header,
    Icon,
    List,
    Segment,
} from 'semantic-ui-react';

import {
    Link
} from 'react-router-dom';

class RecipesIngredientsList extends Component {

    render() {
        const {ingredients} = this.props;
        return (
        <Segment raised>
            <Link to="/" style={{color: "#ffffff"}}>
                <Button 
                    fluid 
                    size='large' 
                    icon='left arrow' 
                    labelPosition='left' 
                    content='Change ingredients' 
                /> 
            </Link>
            <Divider />
            <Header as='h2'>Selected ingredients</Header>
            <List relaxed verticalAlign='middle' size='big'>
                {Array.from(ingredients).map(ingredient => (
                    <List.Item key={ingredient}>
                        <Icon name='check circle' color='green' />
                        <List.Content>
                            {ingredient}
                        </List.Content>
                    </List.Item>
                ))}
            </List>
            <Divider />
            <Checkbox onChange={this.props.toggleStrictResults} toggle defaultChecked label='recipes with ingredients not on the list'/>
        </Segment>
      );
    }
  }

export default RecipesIngredientsList;