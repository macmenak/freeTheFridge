import React, { Component } from 'react';
import '../css/App.css';
import {
  Grid,
  Button,
  Form,
  Input,
  Header,
  Label,
  Icon,
  Card,
  Image,
  Dimmer,
  Responsive,
  Divider
} from 'semantic-ui-react';


import tomato from '../images/tomato.jpg';
import onion from '../images/onion.jpg';
import pasta from '../images/pasta.jpg';
import rice from '../images/rice.jpg';
import potato from '../images/potato.jpg';

const images = {tomato: tomato, onion: onion, pasta: pasta,rice: rice,potato: potato};


class PopularIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    
    handleOnUpdate = (e, { width }) => this.setState({ width })

    render() {
        const { width } = this.state;
        const columns = width >= Responsive.onlyComputer.minWidth ? 5 : 3;
            return (
                <div>
                    <Header as='h3'>or choose from the most popular food products</Header>
                    <Responsive as={Grid} columns={columns} fireOnMount onUpdate={this.handleOnUpdate}>
                        <PopularIngredient name="tomatos" image={images.tomato} addIngredient={this.props.addIngredient}/>
                        <PopularIngredient name="potatos" image={images.potato} addIngredient={this.props.addIngredient}/>
                        <PopularIngredient name="onions" image={images.onion} addIngredient={this.props.addIngredient}/>
                        <PopularIngredient name="pasta" image={images.pasta} addIngredient={this.props.addIngredient}/>
                        <PopularIngredient name="rice" image={images.rice} addIngredient={this.props.addIngredient}/>
                    </Responsive>
                </div>
            );
        }
    
}

class PopularIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }
    

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
        const {active} = this.state;
        const {name, image} = this.props;
        return (
            <Grid.Column >
                <Card link 
                onClick={()=>this.props.addIngredient(name)}
                onMouseEnter={this.handleShow}
                onMouseLeave={this.handleHide}>
                <Dimmer.Dimmable as={Image} dimmed={active} >
                    <Image src={image} />
                    <Dimmer active={active}>
                    <Icon name='plus' /> Add
                </Dimmer>
                </Dimmer.Dimmable>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                    </Card.Content>
                </Card>
            </Grid.Column>
        );
    }
    
    
}
  
class IngredientsAdder extends Component {
    
    
    render() {
        const validationTooltip = this.props.inputIngredientError && <Label  pointing >Please enter a value</Label>;
      return (
        <div>
            <Form>
            <Form.Field>
                <Input 
                onKeyPress={e => {if(e.key === 'Enter') this.props.addIngredient()}} 
                value={this.props.inputIngredient} 
                onChange={this.props.changeHandler} 
                fluid size='huge' 
                placeholder='Type in the name of the product you have...' 
                action
                list='suggestions'>
                    <input />
                    <Button onClick={() => this.props.addIngredient()}><Icon name='add'/> Add</Button>
                    <datalist id='suggestions'>
                        {this.props.suggestions.map(suggestion => (
                            <option key={suggestion} value={suggestion} />
                        ))}
                    </datalist>
                </Input>
                {validationTooltip}
                </Form.Field>
            </Form>
            <Divider hidden />
            <PopularIngredients addIngredient={this.props.addIngredient}/>
        </div>
      );
    }
  }


  export default IngredientsAdder