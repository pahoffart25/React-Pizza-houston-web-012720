import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  constructor(){
    super()
    this.state ={
      pizzas: [],
      pizzaToEdit: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => {
      this.setState({
        pizzas
      })
    })
  }

  editPizza = (p) => {
    // console.log(p) the single pizza that was clicked  then set it equal to pizza that I send through to the pizza form.
    this.setState({
      pizzaToEdit: p
    })
  }

  handleEdit = (event, field) => {
    let current = this.state.pizzaToEdit

    switch(field){
      case "Topping":
        this.setState({
          pizzaToEdit: {...current, topping: event.target.value}
        })
        break
        case "Size":
          this.setState({
            pizzaToEdit: {...current, size: event.target.value}
          })
          break
          case "Veg":
            this.setState({
              pizzaToEdit: {...current, vegetarian: true}
            })
            break
            case "Non-veg":
              this.setState({
                pizzaToEdit: {...current, vegetarian: false}
              })
          }

  }


  submit = () =>{
    let whatImAdding = this.state.pizzaToEdit
    fetch(`http://localhost:3000/pizzas/${whatImAdding.id}`, {
      method: 'PATCH',
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify( whatImAdding)
  })
      .then(res => res.json())
      .then(whatImAdding =>{
        let pizzaList = this.state.pizzas
        let newList = pizzaList.map (pizza => (
          pizza.id === whatImAdding.id 
          ? whatImAdding
          : pizza
        ))
        this.setState({
          pizzas: newList
        })
      })
  }


 



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizzaToEdit} handleEdit={this.handleEdit} submit={this.submit}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
