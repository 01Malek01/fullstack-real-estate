import {
 Container, Modal, Stepper

} from '@mantine/core'
import React, { useState } from 'react'
import AddLocation from '../AddLocation/AddLocation'
import { useAuth0 } from '@auth0/auth0-react'
import UploadImage from '../UploadImage/UploadImage';
import BasicDetails from '../BasicDetails/BasicDetails';
import Facilities from '../Facilities/Facilities';

function AddPropertyModal({ modalOpened, setModalOpened }) {
 const { user } = useAuth0();
 const [propertyDetails, setPropertyDetails] = useState({
  title: "",
  description: "",
  price: "",
  country: "",
  city: "",
  Image: "",
  address: "",
  facilities: {
   bedrooms: 0,
   bathrooms: 0,
   parkings: 0,
  },
  userEmail: user?.email,
 });
 const [active, setActive] = useState(0)

 const nextStep = () => {
  setActive((current) => current < 4 ? current + 1 : current)
 }
 const prevStep = () => {
  setActive((current) => current > 0 ? current - 1 : current)
 }
 return (
  <Modal
   opened={modalOpened}
   onClose={() => setModalOpened(false)}
   closeOnClickOutside
   size={"90rem"}
  >

   <Container
    h={"40rem"}
    w={"100%"}
   >

    <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
     <Stepper.Step label="Location" description="Address">
      Step 1 : Set Location
      <AddLocation nextStep={nextStep}
       propertyDetails={propertyDetails}
       setPropertyDetails={setPropertyDetails}
      />

     </Stepper.Step>
     <Stepper.Step label="Image" description="Upload Image">
      Step 2 : Upload Image
      <UploadImage
       prevStep={prevStep}
       propertyDetails={propertyDetails}
       setPropertyDetails={setPropertyDetails}
       nextStep={nextStep}
      />
     </Stepper.Step>
     <Stepper.Step label="Basic Details" description="Basic Details">
      <BasicDetails propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} nextStep={nextStep} prevStep={prevStep} />
     </Stepper.Step>
     <Stepper.Step label="Facilities" description="Facilities">
      <Facilities setOpened={setModalOpened} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} setActiveStep={setActive} />
     </Stepper.Step>
     <Stepper.Completed>
      Completed!
     </Stepper.Completed>
    </Stepper>
   </Container>
  </Modal>
 )
}

export default AddPropertyModal
