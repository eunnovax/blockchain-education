import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    width: 100,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

export default withStyles(styles)(
  class Block extends Component {
    render() {
      const { classes } = this.props;
      const {
        blockNumber,
        data,
        nonce,
        previousBlockHash,
        timestamp,
        hash
      } = this.props.block;
      const chainID = this.props.chainID;
      // console.log('hash', hash, 'nonce', nonce);
      return (
        <ProductConsumer>
          {value => {
            return (
              <BlockContainer >
                <div className='col-md-3'>
                    <form className={hash.substring(0,value.difficulty) === value.pattern ? 'well-success' : 'well-error' }>
                      <br />
                      <TextField
                        id="blockN"
                        label="block #"
                        name="Block Number"
                        value={blockNumber}
                        // onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="nonce"
                        label="Nonce"
                        name="Nonce"
                        value={nonce}
                        onChange={e => value.changeNonce(e, blockNumber-1, chainID-1)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="data"
                        label="Data"
                        name="data"
                        value={data}
                        onChange={e => value.changeData(e, blockNumber-1, chainID-1)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="prevBHash"
                        label="prevBlockHash"
                        name="prevBlockHash"
                        value={previousBlockHash}
                        // onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="hash"
                        label="hash"
                        name="Hash"
                        value={hash}
                        // onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={e=>{
                          value.mine(blockNumber-1, chainID-1);
                        }}
                        className={classes.button} 
                        
                      >
                        Mine
                      </Button>
                    </form>
                    <br />
                  </div>
              </BlockContainer>
            );
          }}
        </ProductConsumer>
      );
    }
  }
);

const BlockContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 1rem;
  
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
// background: rgba(255, 255, 255, 1);