import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck';
import useAddToFav from '../../hooks/Api/useAddToFav';
import useFavorites from '../../hooks/Api/useFavorites';
import { useProperties } from '../../hooks/Api/useProperties';
function Heart({ resdId }) {
 const [heartColor, setHeartColor] = useState('white');
 const { validateLogin } = useAuthCheck();
 const { likeProperty } = useAddToFav();
 const { allFavorites }=useFavorites();
 const {data}=useProperties()
 const handleLike = () => {
  if (validateLogin) {
   setHeartColor((prev) => (prev === 'white' ? '#fa3e5f' : 'white'));
   likeProperty(resdId);
  }
 }


 useEffect(() => {
  // if (allFavorites?.includes(resdId)) {
  //  setHeartColor('#fa3e5f');
  // } else {
  //  setHeartColor('white');
  // }


 }, [allFavorites, resdId, setHeartColor]);

 return (
  <div>
   <AiFillHeart color={heartColor} size={24} onClick={(e) => {
    e.stopPropagation();/*  top the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.    */
    handleLike();
   }} />
  </div>
 )
}

export default Heart
