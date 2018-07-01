import React, { Component } from 'react';
import '../css/App.css';
import {
    Grid,
    Responsive,
    Sticky,
} from 'semantic-ui-react';

import RecipesResults from './RecipesResults';
import RecipesIngredientsList from './RecipesIngredientsList';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            resultsPage: 1,
            ingredients: [],
            strictResults: false,
            bestMatchFirst: true
        };
        this.getResults = this.getResults.bind(this);
        this.toggleStrictResults = this.toggleStrictResults.bind(this);
        this.toggleBestMatch = this.toggleBestMatch.bind(this);
    }
    
    componentDidMount() {
        this.getResults(1);
    }

    getResults() {
        function getArrayUniqueValues(array) {
            const set = new Set(array);
            return Array.from(set);
        }
        const {ingredients} = this.props.match.params;
        const {resultsPage} = this.state;
        this.setState({
            ingredients: ingredients.split(','),
            loading: true
        });
        const apiUrl = `http://www.recipepuppy.com/api/?i=${ingredients.replace(' ', '+')}&p=${resultsPage}`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data && data.results){
                    const selectedIngredients = this.state.ingredients;
                    
                    const newRecipes = data.results.map(recipe => {
                        const recipeIngredients = getArrayUniqueValues(recipe.ingredients.split(', '));
                        const fittingIngredients = selectedIngredients.filter(ingredient => recipeIngredients.includes(ingredient));
                        const fit = fittingIngredients.length / recipeIngredients.length * 100;
                        return {
                            ...recipe,
                            fit
                        };
                    });
                    this.setState({
                        recipes: [...this.state.recipes, ...newRecipes],
                        loading: false,
                        resultsPage: resultsPage + 1
                    })
                }
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            });
    }

    toggleStrictResults () {
        this.setState({
            strictResults: !this.state.strictResults
        })
    }

    toggleBestMatch () {
        this.setState({
            bestMatchFirst: !this.state.bestMatchFirst
        })
    }


    filterResults () {
        
        let recipes = [...this.state.recipes];
        recipes = this.state.bestMatchFirst ? recipes.sort((a,b)=>{return b.fit - a.fit}) : this.state.recipes;
        
        return recipes.filter(recipe => {
            const recipeIngredients = recipe.ingredients.split(', ');
            const selectedIngredients = this.state.ingredients;
            const filterFunction = (ingridient) => selectedIngredients.includes(ingridient);
            
            return this.state.strictResults ? recipeIngredients.every(filterFunction) : recipeIngredients.some(filterFunction);
        });
    }
    

    handleContextRef = contextRef => this.setState({ contextRef })

    handleOnUpdate = (e, { width }) => {this.setState({ width });}

    render() {
        const { width } = this.state;
        const isMobile = width <= Responsive.onlyMobile.maxWidth;
        const { contextRef } = this.state;
        const results = this.filterResults();
        const isSticky = results.length>0 && !isMobile;

        return (
            <Responsive as={Grid} stackable columns={2} fireOnMount onUpdate={this.handleOnUpdate}>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <div ref={this.handleContextRef}>
                            <RecipesResults 
                                results={results}
                                loading={this.state.loading}
                                strictResults={this.state.strictResults}
                                ingredients={this.state.ingredients}
                                getResults={this.getResults}
                            />
                        </div>
                    </Grid.Column>
                <Grid.Column width={5}>
                    <Sticky active={isSticky} context={contextRef} offset={80}>
                        <RecipesIngredientsList 
                            ingredients={this.state.ingredients}
                            toggleStrictResults={this.toggleStrictResults}
                            toggleBestMatch={this.toggleBestMatch}
                            isSticky={isSticky}
                        />
                    </Sticky>
                </Grid.Column>
            </Grid.Row>
        </Responsive>
        );
    }
}

export default Recipes