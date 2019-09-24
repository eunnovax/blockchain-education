import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { SHA256 } from "./SHA256";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { flexbox } from "@material-ui/system";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
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
    marginTop: theme.spacing.unit * 3,
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
      return (
        <ProductConsumer>
          {value => {
            return (
              <BlockContainer className={value.hash.substring(0,value.difficulty) === value.pattern ? 'well-success' : 'well-error' }>
                <div className='col-md-3'>
                    <form >
                      <br />
                      <TextField
                        id="blockN"
                        label="block #"
                        name="Block Number"
                        value={blockNumber}
                        onChange={e => value.change(e)}
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
                        onChange={e => value.change(e)}
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
                        onChange={e => value.change(e)}
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
                        onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={e => {
                          value.onSubmit(e);
                          //closeFormal();
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
  background: rgba(255, 255, 255, 1);
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
