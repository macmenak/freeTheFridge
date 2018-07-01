import React, { Component } from 'react';
import '../css/App.css';
import {
    Button,
    Divider,
    Header,
    Icon,
    List,
    Segment,
} from 'semantic-ui-react';

import {
    Link
} from 'react-router-dom';


class IngredientsList extends Component {

    render() {
        const {ingredients} = this.props;
        const disabled = Array.from(ingredients).length===0;
        return (
            <Segment raised>
                <Link to={!disabled ? `/recipes/${Array.from(ingredients).join(",")}` : ""} style={{color: "#ffffff"}}>
                    <Button 
                        primary 
                        fluid 
                        size='large' 
                        icon='right arrow' 
                        labelPosition='right' 
                        content='Find recipes'
                        disabled={disabled} 
                    />
                </Link>
                <Divider  />
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
            </Segment>
        )
    }
}

export default IngredientsList