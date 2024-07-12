import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

function Searchbar({filter,setFilter}) {
  return (
   <div className="flexCenter search-bar">
    <HiLocationMarker color="var(--blue)" size={25} />
    <input value={filter} onChange={(e)=>setFilter(e.target.value)} type="text" />
    <button className="button">Search</button>
   </div>
  )
}

export default Searchbar
