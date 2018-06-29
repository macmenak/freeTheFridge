import React, { Component } from 'react';
import '../css/App.css';
import {
  Segment,
  Button,
  Header,
  Icon,
  Item,
  Label,
  Loader,
  Container
} from 'semantic-ui-react';


const NoResults = () => (
    <Container text textAlign='center'>
        <Icon name='search' size='huge' color='grey'/>
        <Header as='h2'>Sorry... we haven't found any recipes.</Header>
    </Container>
)

class RecipesResults extends Component {
    

    render() {
        const {recipes, loading, ingredients, strictResults} = this.props;
        const placeholder = loading ? <Loader active={loading} inline='centered'>Loading </Loader> : <NoResults/>;
        const selectedIngredients = Array.from(ingredients);
        function getArrayUniqueValues(array) {
            const set = new Set(array);
            return Array.from(set);
        }
        let results = [];
        results = recipes.filter(recipe => {
            let notStrictIngredients = false;
            getArrayUniqueValues(recipe.ingredients.split(', ')).forEach(ingredient => {
                if (selectedIngredients.indexOf(ingredient)<0) notStrictIngredients = true;
            });
            return !(strictResults && notStrictIngredients);
        });        
        
        return (results && results.length<=0) ? placeholder : (
            <div>
                <Header as='h2'>Found recipes</Header>
                <Item.Group divided relaxed>
                    {results.map(recipe => 
                    {
                    const thumbnail = recipe.thumbnail.length>0 ? <Item.Image size='small'  as='a' href={recipe.href} style={{backgroundImage: `url(${recipe.thumbnail})`, backgroundSize: 'cover', display: 'block', width: '150px', height: '150px' }} /> : <Item.Image size='small' ><Segment disabled textAlign='center' style={{height: '150px', paddingTop: '2em'}}><Icon name='image' size='huge' /> <p>photo not available</p></Segment></Item.Image>;
                    
                    return (
                        
                            <Item key={recipe.href} >
                                
                                {thumbnail}
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='a' href={recipe.href}>{recipe.title}</Item.Header>
                                    <Item.Meta>
                                        <p><Icon name='tag' /> Ingredients:</p>
                                        <Label.Group>
                                            {getArrayUniqueValues(recipe.ingredients.split(', ')).map(ingredient => (
                                            selectedIngredients.indexOf(ingredient)>=0 ? <Label key={ingredient}>{ingredient}</Label> : <Label key={ingredient} basic >{ingredient}</Label>
                                            ))}
                                        </Label.Group>
                                    </Item.Meta>
                                    <Item.Extra>
                                        <Button primary floated='right' href={recipe.href} target='_blank' >
                                        <Icon name='external' /> View recipe
                                            
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

export default RecipesResults