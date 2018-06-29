import React, { Component } from 'react';
import '../css/App.css';
import {
  Grid,
} from 'semantic-ui-react';


import RecipesResults from './RecipesResults';
import RecipesIngredientsList from './RecipesIngredientsList';


class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            ingredients: [],
            strictResults: false
        }
        this.toggleStrictResults = this.toggleStrictResults.bind(this);
    }
    
    componentDidMount() {
        const {match} = this.props;
        const {ingredients} = match.params;
        this.setState({
            ingredients: ingredients.split(','),
            loading: true
        });
        const apiUrl = `http://www.recipepuppy.com/api/?i=${ingredients.replace(' ', '+')}`;
        
        fetch(apiUrl)
          .then(res => res.json())
          .then(data => {
            this.setState({
                recipes: data.results,
                loading: false
            })
          })
          
    }

    toggleStrictResults () {
        this.setState({
            strictResults: !this.state.strictResults
        })
    }

    render() {
        return (
            <Grid stackable columns={2}>
            <Grid.Row>
            <Grid.Column width={11}>
                <RecipesResults 
                recipes={this.state.recipes}
                loading={this.state.loading}
                strictResults={this.state.strictResults}
                ingredients={this.state.ingredients}/>
            </Grid.Column>
            <Grid.Column width={5}>
                <RecipesIngredientsList 
                ingredients={this.state.ingredients}
                toggleStrictResults={this.toggleStrictResults}
                />
            </Grid.Column>
            
          </Grid.Row>
        </Grid>
        );
    }
    
}

export default Recipes