import React, { Component } from 'react';
import '../css/App.css';
import {
  Segment,
  Divider,
  Button,
  Header,
  Icon,
  List
} from 'semantic-ui-react';

import {
    Link
  } from 'react-router-dom';


class IngredientsList extends Component {

    render() {
        const {ingredients} = this.props;
        const disabled = Array.from(ingredients).length===0;
        return (
            
        
            <Segment>
                <Header as='h2'>
                    <Header.Content>Selected ingredients</Header.Content>
                </Header>
            
                <List selection verticalAlign='middle' size='big'>
                    {Array.from(ingredients).map(ingredient => (
                    <List.Item key={ingredient} onClick={() => this.props.removeIngredient(ingredient)}>
                        <Icon name='remove circle' color='red' link/>
                        <List.Content>
                            {ingredient}
                        </List.Content>
                    </List.Item>
                    ))}
                </List>
                
                <Divider  />
                <Link to={!disabled ? `/recipes/${Array.from(ingredients).join(",")}` : ""} style={{color: "#ffffff"}}>
                    <Button primary fluid size='large' icon='right arrow' labelPosition='right' content='Find recipes'
                    disabled={disabled} />
                </Link>
                
                
            </Segment>
        
        
          
          
      );
    }
  }

  export default IngredientsList