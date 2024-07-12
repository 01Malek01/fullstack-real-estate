import React, { useContext, useEffect, useState } from 'react';
import './Property.css';
import { useParams } from 'react-router-dom';
import { useProperty } from '../../hooks/Api/useProperty';
import { PuffLoader } from 'react-spinners';
import './Property.css';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import { FaShower } from 'react-icons/fa';
import { MdMeetingRoom, MdLocationPin } from 'react-icons/md';
import Map from '../../components/Map/Map';
import useAuthCheck from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../../components/BookingModal/BookingModal';
import UserContext from '../../Context/UserContext';
import { Button } from '@mantine/core';
import { useCancelBooking } from '../../hooks/Api/useCancelBooking';
import Heart from '../../components/Heart/Heart';
function Property() {
  // const {data,isError,isLoading} = useProperty()
  const { userDetails: { bookings } } = useContext(UserContext);
  const { propertyId } = useParams();
  const { data, isError, isLoading } = useProperty(propertyId);
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const { cancelBooking, isLoading: cancelling } = useCancelBooking();
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    if (bookings) {
      setBooked(bookings.bookVisits?.some((booking) => booking.resdId === propertyId));
    }
  }, [bookings, propertyId]);
  if (isError) {
    return <div>Something went wrong</div>
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
      <div className="flexColStart paddings innerWidth property-container ">
        {/* <div className="like ">
          <Heart resdId={propertyId} />
        </div> */}
        {/**image */}
        <img src={data?.image} alt="property" />


        <div className="flexCenter property-details">
          {/*left side */}
          <div className="flexColStart left">
            {/*head */}
            <div className="flexStart head">
              <span className='primaryText'>
                {data?.title}</span>
              <span className='orangeText ' style={{ fontSize: '1.5rem' }}>{data?.price}$</span>
            </div>
            {/*facilities */}
            <div className="facilities flexStart">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e72" />
                <span>{data?.facilities?.parking} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1f3e72" />
                <span>{data?.facilities?.bedrooms} Room</span>
              </div>


            </div>
            {/*details */}

            <div className="secondary-text" style={{ textAlign: 'justify' }}>
              {data?.description}
            </div>

            <div className="flexStart address" style={{ gap: '1rem' }}>
              <MdLocationPin size={25} color="#1f3e72" />
              <span className="secondaryText">{data?.address}{" "}{data?.city}{" - "}{data?.country}</span>
            </div>

            {booked ?
              <>
                <Button
                  disabled={cancelling}
                  onClick={async () => {
                    cancelBooking({ email: user?.email, propertyId });
                    setBooked(false);
                  }}
                  variant='outline' w={"100%"} color='red'  >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  Your visit has been already booked at {bookings?.bookVisits?.filter((booking) => booking?.resdId?.includes(propertyId))[0]?.date}
                </span>
              </>
              :
              <div className="button "
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book Your Visit
              </div>}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={propertyId}
              email={user?.email}
              setBooked={setBooked}
            />

          </div>


          {/*right side */}
          <div className="map">
            <Map address={data?.address} city={data?.city} country={data?.country} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Property
