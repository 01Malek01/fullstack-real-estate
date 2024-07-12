import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BookingModal.css';
import { Button, Modal } from '@mantine/core';
import '@mantine/dates/styles.css';
import { useBookVisit } from '../../hooks/Api/useBookVisit';
import { DateInput } from '@mantine/dates';


function BookingModal({ opened, setOpened, email, propertyId,setBooked }) {
  const [date, setDate] = useState(null);

  const onSettled = () => {
    setOpened(false);
    setBooked(true);
  };

  const { bookVisit, isLoading } = useBookVisit(onSettled);

  const handleBookVisit = () => {
    if (date) {
      bookVisit({ email, propertyId, date });
    }
  };

  return (
    <Modal
      opened={opened} // Determines if the modal is open or not
      onClose={() => setOpened(false)} // To close the modal
      title="Select the date of the visit"
      centered
    >
      <div className='flexColCenter'>
        <DateInput
          value={date}
          onChange={setDate}
          label=" Pick a date"
          placeholder="Click here to select a date"
        />
        <Button
          disabled={!date || isLoading}
          onClick={handleBookVisit}
        >
          Book Visit
        </Button>
      </div>
    </Modal>
  );
}

BookingModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  propertyId: PropTypes.string.isRequired,
};

export default BookingModal;
