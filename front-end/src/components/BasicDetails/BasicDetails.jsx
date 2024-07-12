import { useForm } from '@mantine/form'
import React from 'react'
import { validateString } from '../../utils/common';
import { Box, Button, Group, NumberInput, TextInput } from '@mantine/core';

function BasicDetails({ prevStep, propertyDetails, setPropertyDetails, nextStep }) {
 const form = useForm({
  initialValues:{
   price :propertyDetails.price,
   description:propertyDetails.description,
   title: propertyDetails.title
  },
  validate: {
   price: (value) => value <1000 ? "Must greater than 999 dollars" : null,
   description: (value) => validateString(value),
   title: (value) => validateString(value),
  }
 });
 const { price, description, title } = form.values;
 const handleSubmit = () =>{
  const { hasErrors } = form.validate();
  if(!hasErrors){
   setPropertyDetails((prev) => ({
    ...prev,
    price,
    description,
    title
   }))
  }
  nextStep();
 }

 return (
  <Box maw={'50%'} mx={'auto'} my='md'>
   <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
   }}>
    <TextInput 
    withAsterisk
    label='Title'
    placeholder='Title'
    {...form.getInputProps('title')}
    />
    <TextInput
    withAsterisk
    label='Description'
    placeholder='Description'
    {...form.getInputProps('description')}
    />
    <NumberInput
    withAsterisk
    label='Price'
    placeholder='1000'
    min={0}
    {...form.getInputProps('price')}
    />
    <Group position='center' mt='xl'>
     <Button variant='default' onClick={prevStep}>Previous Step </Button>
     <Button type='submit'>Next Step</Button>
    </Group>
   </form>
   </Box>
 )
}

export default BasicDetails
