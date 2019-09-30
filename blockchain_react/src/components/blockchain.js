import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import Block from "./Block";
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


class Blockchain extends Component {
  
  render() {

    const blockchain = this.props.blockchain;
    const { title, nodes, chain } = blockchain;
    const chainID = this.props.chainID;
    return (
      <ProductConsumer>
        {value=> {
          return (
      <React.Fragment>
          <div className="chain-header d-flex align-self-center">
            <h5 className="align-self-center mb-0"> {title} </h5>
          </div>
          
          <div className="chain-header d-flex align-self-center">
            <h5 className="text-blue mb-0">{nodes} Nodes</h5>
          </div>
          <div className="row my-5">
          {chain.map(block => {
            return (
                <Block 
                key={chain.indexOf(block) + 1} block={block}
                chainID={chainID}
                />                
            );
          })}
              <div 
              className='buttonspace' 
              onClick = {e=>{
                  value.addBlock(chain.length, chainID);
                }}
              >
                <SampleFab/>
              </div>

          </div>
        </React.Fragment>
        );
        }}
      </ProductConsumer>
    );
  }
}

export default Blockchain;

const ProductWrapper = styled.div`
  .chain {
    border-color: transparent;
    transition: all 0.2s linear;
  }
  .chain-header {
    background: transparent;
    border-top: transparent;
    transition: all 0.2s linear;
  }
  &:hover {
    .chain {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .chain-header {
      background: rgba(247, 247, 247);
    }
  }
`;
