import React, { Component } from 'react';
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { SHA256 } from "./SHA256";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

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
      margin: theme.spacing.unit
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
        return ( 
            <ProductConsumer>
                {value => {
                    return (
                        <BlockContainer>
                            <div>
                                <div>
                                <form className="verspace">
                      <br />
                      <TextField
                        id="standard-name"
                        label="Имя"
                        name="firstName"
                        value={value.firstName}
                        onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="standard-lastname"
                        label="Фамилия"
                        name="lastName"
                        value={value.lastName}
                        onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="standard-email"
                        label="Email"
                        name="email"
                        value={value.email}
                        onChange={e => value.change(e)}
                        margin="normal"
                        variant="outlined"
                        className={classes.textField}
                      />
                      <br />
                      <TextField
                        id="standard-phone"
                        label="Телефон"
                        name="phone"
                        value={value.phone}
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
                        Заказать
                      </Button>
                    </form>
                    <br />
                                </div>
                            </div>
                        </BlockContainer>
                    );
                }}
            </ProductConsumer>
         );
    }
}
);
 
