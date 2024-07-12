import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import { useProperties } from '../../hooks/Api/useProperties';
import { toast } from 'react-toastify';
import { PuffLoader } from 'react-spinners';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import '../Properties/Properties.css';
import useFavorites from '../../hooks/Api/useFavorites';

function Favorites() {
 const [filter, setFilter] = useState('');
 const { data: properties, isError, isLoading: isLoadingProperties } = useProperties();
 const [favoritesData, setFavoritesData] = useState([]);
 const { allFavorites, isLoading: isLoadingFavorites, refetch } = useFavorites();

 useEffect(() => {
  refetch();
  if (allFavorites && !isLoadingFavorites) {
   setFavoritesData(allFavorites);
  }
 }, [allFavorites, setFavoritesData, isLoadingFavorites]);
console.log(favoritesData,'state')
console.log(allFavorites,'db')
 if (isError) {
  toast.error('Something went wrong');
  return null;
 }

 if (isLoadingProperties || isLoadingFavorites) {
  return (
   <div className="wrapper flexCenter" style={{ height: '60vh' }}>
    <PuffLoader
     color="#4066ff"
     height={80}
     width={80}
     radius={1}
     aria-label="puff-loading"
    />
    
   </div>
  );
 }

 return (
  <div className="wrapper">
   <div className="flexColCenter paddings innerWidth properties-container">
    <Searchbar filter={filter} setFilter={setFilter} />
    <div className="paddings flexCenter properties">
     {properties
      .filter((property) =>
       Array.isArray(favoritesData) && favoritesData.includes(property.id)
      )
      .filter(
       (card) =>
        card.title.toLowerCase().includes(filter.toLowerCase()) ||
        card.city.toLowerCase().includes(filter.toLowerCase()) ||
        card.country.toLowerCase().includes(filter.toLowerCase())
      )
      .map((card, i) => (
       <PropertyCard card={card} key={i} />
      ))}
    </div>
   </div>
  </div>
 );
}

export default Favorites;
