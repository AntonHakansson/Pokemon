import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


import async from 'async';

import Pokedex from '../Pokedex';
import PokemonCard from './PokemonCard';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const idSortIcon = {index: 0, div: <FontIcon className="material-icons">history</FontIcon>};
const alphaSortIcon = {index: 1, div: <FontIcon className="material-icons">sort_by_alpha</FontIcon>};
const xpSortIcon = {index: 2, div: <FontIcon className="material-icons">trending_up</FontIcon>};
const favoritesIcon = {index: 3, div: <FontIcon className="material-icons">favorite</FontIcon>};

class PokedexViewer extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {selectedFilter: 0, pokemonList: []};
    this.fetchPokemons();
  }

  selectFilter(index){
    this.setState({selectedFilter: index}, () => {
        this.updatePokemons();
      });
  }

  fetchPokemons(){
    let newPokemonList =  Array(20).fill(undefined); // Fake loading
    this.forceUpdate();
    Pokedex.getPokemonsList().then(ress => {
      let pokemons = ress.results.slice(0, 15);
      newPokemonList = Array(pokemons.length).fill(undefined);
      this.setState({pokemonList: this.state.pokemonList});
      return pokemons;
    }).then(pokemons => {
      async.forEachOf(pokemons, (pokemon, ind) => {
        Pokedex.getPokemonByName(pokemon.name, pokemon => {
          newPokemonList[ind] = pokemon;
          newPokemonList[ind] = {...newPokemonList[ind], dialogOpen: false};
          this.setState({pokemonList: newPokemonList});
        });
      });
    }).catch(err => {
      console.log(err);
    });
    this.updatePokemons();
  }

  updatePokemons(){
    if(this.state.selectedFilter == idSortIcon.index)
    {
      this.state.pokemonList.sort(function (a, b) {
        return a.id-b.id;
      });
    }
    if(this.state.selectedFilter == xpSortIcon.index)
    {
      this.state.pokemonList.sort(function (a, b) {
        return b.base_experience-a.base_experience;
      });
    }
    if(this.state.selectedFilter == alphaSortIcon.index)
    {
      this.state.pokemonList.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }

    this.setState({pokemonList: this.state.pokemonList});
  }

  getPokemonDOM(){
    const dialogDivider = <Divider style={{marginTop: 3, marginBottom: 3}}/>


    let PokeDOM = this.state.pokemonList.map((pokemon, ind) => {
      if (pokemon){
        return(
          <GridTile key={pokemon.name}
                     title={pokemon.name}
                      subtitle={<span>{pokemon.base_experience} Base XP<br/>{pokemon.types.map(type => {return type.type.name + " ";})}</span>}
                       actionIcon={<FontIcon style={{cursor: 'pointer', marginRight: 20}} className="material-icons" onClick={() => {pokemon.dialogOpen = true; this.forceUpdate();}}>info</FontIcon>}
                       >
            <img src={pokemon.sprites.front_default}></img>
            <Dialog
              title={pokemon.name}
              modal={false}
              open={pokemon.dialogOpen}
              onRequestClose={() => {pokemon.dialogOpen = false; this.forceUpdate();}} >
                <div>
                  {Object.keys(pokemon.sprites).reverse().map((name, index) => {return <img key={index} src={pokemon.sprites[name]}></img>;})}
                </div>
                <span>Name: {pokemon.name}</span>
                {dialogDivider}
                <span>Base XP: {pokemon.base_experience}</span>
                {dialogDivider}
                <span>Species: {pokemon.pokemon_species.map((specie) => {return (<span>{specie.name}</span>);})}</span>
                {dialogDivider}
                <span>Base type: {pokemon.types.map(type => {return type.type.name + " ";})}</span>
                {dialogDivider}
                <span>Base CP: </span>
                {dialogDivider}
                <span>Base CP: </span>
                {dialogDivider}
            </Dialog>

          </GridTile>
        );
      }else{
        return (<div key={ind}><CircularProgress /></div>);
      }
      });
    return PokeDOM;
  }

  render(){
    const styles = {
      gridList: {
        width: 600,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24,
      },
      PokeCard: {
        hover: 2
      }
    };

    return(
      <div>
        <BottomNavigation selectedIndex={this.state.selectedFilter}>
          <BottomNavigationItem
            label="Default"
            icon={idSortIcon.div}
            onTouchTap={() => this.selectFilter(idSortIcon.index)}
          />
          <BottomNavigationItem
            label="Alphabetical"
            icon={alphaSortIcon.div}
            onTouchTap={() => this.selectFilter(alphaSortIcon.index)}
          />
          <BottomNavigationItem
            label="XP"
            icon={xpSortIcon.div}
            onTouchTap={() => this.selectFilter(xpSortIcon.index)}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoritesIcon.div}
            onTouchTap={() => this.selectFilter(favoritesIcon.index)}
          />
        </BottomNavigation>
        <GridList cols={3} style={styles.gridList}>
          {this.getPokemonDOM()}
        </GridList>
        </div>
    );
  }
}

export default PokedexViewer;
