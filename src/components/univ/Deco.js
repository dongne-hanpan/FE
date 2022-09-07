import React from 'react';
import styled from 'styled-components';

const Deco = () => {
  return(
    <DecoComp>
      <div className="barcode1"></div>
      <div className="barcode2"></div>
      <div className="barcode3"></div>
      <div className="barcode4"></div>
      <div className="barcode5"></div>
      <div className="barcode6"></div>
      <div className="barcode7"></div>
      <div className="barcode8"></div>
      <div className="barcode9"></div>
    </DecoComp>
  )
};

export default Deco;


const DecoComp = styled.div`
position: absolute;
top: 50px;
right: 0px;
width: 20px;
.barcode1{
  height: 4px;
  margin-bottom: 2px;
  background-color: black;
}
.barcode2{
  height: 8px;
  margin-bottom: 1px;
  background-color: black;
}
.barcode3{
  height: 2px;
  margin-bottom: 2px;
  background-color: black;
}
.barcode4{
  height: 8px;
  margin-bottom: 1px;
  background-color: black;
}
.barcode5{
  height: 4px;
  margin-bottom: 2px;
  background-color: black;
}
.barcode6{
  height: 8px;
  margin-bottom: 2px;
  background-color: black;
}
.barcode7{
  height: 4px;
  margin-bottom: 2px;
  background-color: black;
}
.barcode8{
  height: 8px;
  margin-bottom: 1px;
  background-color: black;
}
.barcode9{
  height: 2px;
  background-color: black;
}
`