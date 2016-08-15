import async from 'async';
import React from 'react';

class PokemonCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {pokemon: {}, sprite: "", focused: false};
    this.fetchPokemon();
  }

  fetchPokemon()
  {

  }


  render(){
    return(<a>HELLO</a>);

			return(
          <img role="presentation" className='PokemonCard' src={this.state.sprite}/>
      );

      return(<Spinner className='PokemonCard' size="lg" />);

  }

}

export default PokemonCard;
