import React from 'react'
import './ProfileMenu.css'
import {Avatar, Menu} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
function ProfileMenu({user,logout }) {
  const Navigate = useNavigate()
  return (
<Menu >
<Menu.Target>
 <Avatar src={user?.picture} alt="avatar" radius="xl" />
</Menu.Target>
<Menu.Dropdown>
{/* <Menu.Item onClick={() => Navigate('/favorites',{replace: true})} >Favorites</Menu.Item> */}
<Menu.Item onClick={() => Navigate('/bookings',{replace: true})} >Bookings</Menu.Item>
<Menu.Item onClick={() => {
 localStorage.clear();
 logout({ returnTo: window.location.origin });
}} >Logout</Menu.Item>
</Menu.Dropdown>


</Menu>
  )
}

export default ProfileMenu
