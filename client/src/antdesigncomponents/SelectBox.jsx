import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
  
};
const SelectBox = ({optionsToSelect}) => (
  <>
    <Select
      defaultValue="Select Category"
      style = {{height : "3.5rem" , width : "20rem"}}
      onChange={handleChange}
      options={optionsToSelect}
    />
  </>  
);
  
export default SelectBox;