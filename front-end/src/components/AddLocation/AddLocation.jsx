import React from 'react'
import { useForm } from '@mantine/form'
import { validateString } from '../../utils/common'
import { Button, Group, Select, TextInput } from '@mantine/core';
import useCountries from '../../hooks/useCountries';
import Map from '../Map/Map';
function AddLocation({ propertyDetails, setPropertyDetails, nextStep }) {
 const { getAll } = useCountries();
 const form = useForm({
  initialValues: {
   address: propertyDetails.address,
   country: propertyDetails.country,
   city: propertyDetails.city,
  },
  validate: {
   country: (value) => validateString(value),
   city: (value) => validateString(value),
   address: (value) => validateString(value),
  }
 })

 const { country, city, address } = form.values;
 const handleSubmit = () => {
  const { hasErrors } = form.validate();
  if (!hasErrors) {
   setPropertyDetails((prev) => ({
    ...prev,
    address,
    city,
    country
   }))
  } else {
   return
  }
  nextStep();
 }
 return (
  <form action=""

   onSubmit={(e) => {
    e.preventDefault()
    handleSubmit()
   }}
  >
   <div className="flexCenter" style={{ gap: "3rem", marginTop: "3rem", justifyContent: "space-between" }}>
    {/*left side */}
    {/*inputs*/}
    <div className="flexColStart">
     <Select
      w={'100%'}
      withAsterisk
      label="Country"
      clearable
      searchable
      data={getAll()}
      {
      ...form.getInputProps('country', { type: 'input' })
      }
     />
     <TextInput
      w={'100%'}
      withAsterisk
      label="City"
      clearable
      {
      ...form.getInputProps('city', { type: 'input' })
      } />

     <TextInput
      w={'100%'}
      withAsterisk
      label="Address"
      clearable
      {
      ...form.getInputProps('address', { type: 'input' })
      } />

    </div>




    {/*right side */}


    <div style={{ flex: 1 }}>
     <Map
      address={address}
      city={city}
      country={country}
     />
    </div>
   </div>

   <Group>
    <Button position='center' mt={"xl"} type='submit'>Next Step</Button>
   </Group>
  </form>
 )
}

export default AddLocation
