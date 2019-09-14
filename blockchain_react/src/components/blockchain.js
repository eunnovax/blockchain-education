import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import Block from "./Block";

class Blockchain extends Component {
  render() {
    const blockchain = this.props.blockchain;
    const { title, nodes, chain } = blockchain;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-4 my-3">
        <div className="chain">
          <div className="chain-header d-flex align-self-center">
            <h5 className="align-self-center mb-0"> {title} </h5>
          </div>
          <div className="chain-header d-flex align-self-center">
            <h5 className="text-blue mb-0">{nodes} Nodes</h5>
          </div>

          {chain.map(block => {
            return (
              <div className="col-3">
                <Block key={chain.indexOf(block) + 1} block={block} />
              </div>
            );
          })}
        </div>
      </ProductWrapper>
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
