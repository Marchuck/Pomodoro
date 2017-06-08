//FlexButton.js

import React, { Component } from 'react';
import './App.css';

import { Flex, Box } from 'reflexbox';

function FlexButton(props){
 
  return (
      <Box align="center" >
        <button className="App-button" onClick={props.onClick}>
          { props.name }
        </button>
      </Box>
      );
  
}
export default FlexButton;
