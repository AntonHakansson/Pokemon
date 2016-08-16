import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import PokedexViewer from './PokedexViewer'

class HomePage extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render(){
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }
    };

    return(
      <div style={styles.root}>
        <Card>
          <CardHeader title={"Pokedex"} />
          <PokedexViewer />
        </Card>
      </div>
    );
  }
}

export default HomePage;
