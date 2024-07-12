import React from 'react'
import './Properties.css'
import Searchbar from '../../components/Searchbar/Searchbar'
import { useProperties } from '../../hooks/Api/useProperties';
import { toast } from 'react-toastify';
import { PuffLoader } from 'react-spinners'
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './Properties.css'
function Properties() {
  const [filter, setFilter] = React.useState('');
  const { data, isError, isLoading } = useProperties();
  if (isError) {
    toast.error('Something went wrong');
  }
  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader color="#4066ff"
          height={80}
          width={80}
          radius={1}
          aria-label='puff-loading'
        />
      </div>
    )
  }
  return (
    <div className='wrapper'>
      <div className="flexColCenter paddings innerWidth properties-container">
        <Searchbar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {
            // data.map((card, i) => (
            //   <PropertyCard card={card} key={i} />
            // ))
            data.filter((card) => card.title.toLowerCase().includes(filter.toLowerCase()) || card.city.toLowerCase().includes(filter.toLowerCase()) || card.country.toLowerCase().includes(filter.toLowerCase())).map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Properties
