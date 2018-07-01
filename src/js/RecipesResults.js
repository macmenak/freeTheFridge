import React, { Component } from 'react';
import '../css/App.css';
import {
    Button,
    Divider,
    Header,
    Icon,
    Item,
    Label,
    Loader,
    Progress,
    Segment,
} from 'semantic-ui-react';


const NoResults = () => (
    <Segment basic textAlign='center'>
        <Icon name='search' size='huge' color='grey'/>
        <Header as='h2'>Sorry... we haven't found any recipes.</Header>
        <p>Try removing some ingredients or adding more if you added only 1 or check the "recipes with ingredients not on the list" option.</p>
    </Segment>
)

class RecipesResults extends Component {

    render() {
        const {results, loading, ingredients} = this.props;
        const placeholder = loading ? <Loader active={loading} inline='centered'>Loading </Loader> : <NoResults/>;
        const selectedIngredients = Array.from(ingredients);
        function getArrayUniqueValues(array) {
            const set = new Set(array);
            return Array.from(set);
        }
        
        return (results && results.length<=0) ? placeholder : (
            <div>
                <Header as='h2'>Found recipes</Header>
                <Item.Group divided relaxed>
                    {results.map(recipe => {
                        const thumbnail = recipe.thumbnail.length>0 ? <Segment basic as='a' href={recipe.href} style={{backgroundImage: `url(${recipe.thumbnail})`, backgroundSize: 'cover', display: 'block', width: '150px', minWidth: '150px', height: '150px', marginRight: '15px' }} /> : <Segment as='a' href={recipe.href} disabled textAlign='center' style={{width: '150px', minWidth: '150px', height: '150px', marginRight: '15px', paddingTop: '2em'}}><Icon name='image' size='huge' /> <p>photo not available</p></Segment>;
                        let fitColor;
                        const recipeIngredients = getArrayUniqueValues(recipe.ingredients.split(', '));
                        if (recipe.fit>90) {
                            fitColor='green';
                        } else if (recipe.fit>70) {
                            fitColor='olive';
                        } else if (recipe.fit>60) {
                            fitColor='yellow';
                        } else if (recipe.fit>40) {
                            fitColor='orange';
                        } else {
                            fitColor='red';
                        };
                        return (
                            <Item key={recipe.href} >
                                
                                {thumbnail}
                                
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header as='a' href={recipe.href}>{recipe.title}</Item.Header>
                                    <Item.Meta>
                                        <p><Icon name='tag' /> Ingredients:</p>
                                        <Label.Group>
                                            {recipeIngredients.map(ingredient => (
                                                selectedIngredients.indexOf(ingredient)>=0 ? <Label key={ingredient}>{ingredient}</Label> : <Label key={ingredient} basic >{ingredient}</Label>
                                            ))}
                                        </Label.Group>
                                        <p>You have <strong>{Math.round((recipe.fit * recipeIngredients.length)/100)} out of {recipeIngredients.length}</strong> ingredients</p>
                                        <Progress percent={recipe.fit} size='small' color={fitColor}/>
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
                <Divider />
                <Button fluid onClick={this.props.getResults} content='Load more' icon='chevron down' loading={loading}/>
            </div>
        );
    }
}

export default RecipesResults