// Code to create a dropdown component in React using Flowbite
import React from 'react'
import { Dropdown, Avatar } from "flowbite-react";
import imgMe from "../assets/me.jpg";


const DropDown = () => {
  return (
    <div>
     <Dropdown
      label={<Avatar alt="User settings" img= {imgMe} rounded />}
      arrowIcon={false}
      inline
    >
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
    </div>
  )
}

export default DropDown

