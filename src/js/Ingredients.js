import React, { Component } from 'react';
import '../css/App.css';
import {
    Grid
} from 'semantic-ui-react';

import IngredientsList from './IngredientsList';
import IngredientsAdder from './IngredientsAdder';
  
class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: new Set(),
            inputIngredient: '',
            inputIngredientError: false,
            suggestions: [],
            recipes: []
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.findRecipies = this.findRecipies.bind(this);
    }

    componentDidMount() {
        if (localStorage && localStorage.getItem("ingredients")){
            const ingredients = new Set(JSON.parse(localStorage.getItem("ingredients")).ingridients);
            this.setState({
                ingredients
            })
        }
    }
    
    addIngredient (ingredient=this.state.inputIngredient) {
        if (ingredient && ingredient.trim()){
            this.setState({
                ingredients: this.state.ingredients.add(ingredient),
                inputIngredient: '',
                suggestions: []
            }, ()=> {
                localStorage.setItem("ingredients", JSON.stringify({ingridients: Array.from(this.state.ingredients)}));
            });
            this.setState({
            inputIngredientError: false
            })
        } else {
            this.setState({
                inputIngredientError: true
            })
        }
    }

    removeIngredient (ingredient) {
        function removeFromSet(set, itemToDelete) {
            var newSet = new Set(set);
            newSet.delete(itemToDelete);
            return newSet;
        }

        this.setState({
            ingredients: removeFromSet(this.state.ingredients,ingredient),
            inputIngredient: ''
          }, ()=> {
            localStorage.setItem("ingredients", JSON.stringify({ingridients: Array.from(this.state.ingredients)}));
          })
    }
  
    inputChangeHandler (event) {
        const inputText = event.currentTarget.value;
        this.setState({
            inputIngredient: inputText,
            suggestions: []
        })
        if(inputText.length > 2) {
            
        const timestamp = Date.now();
        fetch(`http://www.recipepuppy.com/ing.php?q=${inputText}&limit=10&timestamp=${timestamp}`)
        .then(res => res.text())
        .then(data => {
            this.setState({
                suggestions: data.split('\n')
            });
        })
        }
    }

    findRecipies () {
        const ingredients = Array.from(this.state.ingredients).join(',');
        const apiUrl = `http://www.recipepuppy.com/api/?i=${ingredients}&max=5`;
        console.log(apiUrl);
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    recipes: data.results
                })
            })
      }
  
    render() {
        return (
            <Grid stackable columns={2}>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <IngredientsAdder 
                            ingredients={this.state.ingredients} 
                            inputIngredient={this.state.inputIngredient}
                            inputIngredientError={this.state.inputIngredientError}
                            changeHandler={this.inputChangeHandler} 
                            addIngredient={this.addIngredient}
                            suggestions={this.state.suggestions}
                        />
                    </Grid.Column>
                <Grid.Column width={5}>
                    <IngredientsList 
                        ingredients={this.state.ingredients}
                        removeIngredient={this.removeIngredient}
                        findRecipies={this.findRecipies}
                    />
                </Grid.Column>
            </Grid.Row>
            </Grid>
        );
    }
}

export default Ingredients