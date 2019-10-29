import React, { Component } from "react";
import { ProductConsumer } from "../context";
import Blockchain from "./Blockchain";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SampleFab = () => {
  const classes = useStyles();
  return  <Fab 
          color="primary" 
          aria-label="Add" 
          className={classes.fab}
          >
            <AddIcon />
          </Fab>
}

class Network extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <ProductConsumer>
              {value => {
                return (
                  <React.Fragment>
                {value.network.map(blockchain => {
                  return (
                      <Blockchain
                        key={value.network.indexOf(blockchain) + 1}
                        blockchain={blockchain}
                        chainID={value.network.indexOf(blockchain)+1}
                      />
                  );
                })}
                <div 
                  onClick = {e=>{
                    value.addChain();
                  }}
                >
                  <SampleFab/>
                </div>
              </React.Fragment>
                );
              }}
            </ProductConsumer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Network;
