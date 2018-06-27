import React, { Component } from 'react';
import '../css/App.css';
import {
  Grid,
  Segment,
  Button,
  Header,
  Icon,
  Item,
  Label,
  List,
  Divider,
  Loader,
  Container
} from 'semantic-ui-react';

import {
    Link
  } from 'react-router-dom';

class SelectedIngredientsList extends Component {

    render() {
        const {ingredients} = this.props;
        return (
        <Segment >
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
            <Link to="/" style={{color: "#ffffff"}}>
                <Button fluid size='large' icon='left arrow' labelPosition='left' content='Change ingredients' /> 
            </Link>
          
        </Segment>
      );
    }
  }

const NoResults = () => (
    <Container text textAlign='center'>
        <Icon name='search' size='huge' color='grey'/>
        <Header as='h2'>Sorry... we haven't found any recipes for these ingredients.</Header>
    </Container>
)


class RecipesList extends Component {
    

    render() {
        const {recipes, loading} = this.props;
        const placeholder = loading ? <Loader active={loading} inline='centered'>Loading </Loader> : <NoResults/>;
        return recipes.length<=0 ? placeholder : (
            <div>
                <Header as='h2'>Found recipes</Header>
                <Item.Group divided>
                    {recipes.map(recipe => 
                    {
                        
                    const thumbnail = recipe.thumbnail.length>0 ? <Item.Image size='small'  as='a' href={recipe.href} style={{backgroundImage: `url(${recipe.thumbnail})`, backgroundSize: 'cover', display: 'block', width: '150px', height: '150px' }} /> : <Item.Image size='small' ><Segment disabled textAlign='center' style={{height: '150px', paddingTop: '2em'}}><Icon name='image' size='huge' /> <p>photo not available</p></Segment></Item.Image>;
                    function getArrayUniqueValues(array) {
                        const set = new Set(array);
                        return Array.from(set);
                    }
                    return (
                            <Item key={recipe.href}>
                                {thumbnail}
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='a' href={recipe.href}>{recipe.title}</Item.Header>
                                    <Item.Meta>
                                        <p><Icon name='tag' /> Ingredients:</p>
                                        <Label.Group>
                                            {getArrayUniqueValues(recipe.ingredients.split(', ')).map(ingredient => <Label key={ingredient}>{ingredient}</Label>)}
                                        </Label.Group>
                                    </Item.Meta>
                                    <Item.Extra>
                                        <Button primary basic floated='right' href={recipe.href}>
                                            Go to recipe's site
                                            <Icon name='right chevron' />
                                        </Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        )
                    })}
                </Item.Group>
            </div>
        );
    }
    
}

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            ingredients: []
        }
    }
    
    componentDidMount() {
        const {match} = this.props;
        const {ingredients} = match.params;
        this.setState({
            ingredients: ingredients.split(','),
            loading: true
        });
        const apiUrl = `http://www.recipepuppy.com/api/?i=${ingredients}&max=5`;
        console.log(apiUrl);
        fetch(apiUrl)
          .then(res => res.json())
          .then(data => {
            this.setState({
                recipes: data.results,
                loading: false
            })
          })
          
    }

    render() {
        return (
            <Grid stackable columns={2}>
            <Grid.Row>
            <Grid.Column width={11}>
                <RecipesList 
                recipes={this.state.recipes}
                loading={this.state.loading}/>
            </Grid.Column>
            <Grid.Column width={5}>
                <SelectedIngredientsList 
                ingredients={this.state.ingredients}/>
            </Grid.Column>
            
          </Grid.Row>
        </Grid>
        );
    }
    
}

export default Recipes