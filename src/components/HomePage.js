import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import async from 'async';

import Pokedex from '../Pokedex';
import PokemonCard from './PokemonCard';



class HomePage extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {pokemonList: []};

    Pokedex.getPokemonsList().then(ress => {
      return ress.results.slice(0, 10);
    }).then(pokemons => {
      async.forEachOf(pokemons, (pokemon) => {
        Pokedex.getPokemonByName(pokemon.name, pokemon => {
          this.state.pokemonList.push(pokemon);
          this.setState({pokemonList: this.state.pokemonList});
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render(){
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    return(
      <div style={styles.root}>

      <Card>
        <CardHeader title={"Pokedex"} />
          <GridList cellHeight={200} style={styles.gridList}>
            {this.state.pokemonList.map(pokemon => {
              return(
                <GridTile key={pokemon.name} title={pokemon.name} subtitle={<span>{pokemon.types.map(type => {return type.type.name + " ";})}</span>}>
                  <img src={pokemon.sprites.front_default}></img>
                </GridTile>
              );
            })}
          </GridList>
        </Card>
      </div>
    );
  }
}

export default HomePage;
