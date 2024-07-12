import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useAddProperty } from "../../hooks/Api/useAddProperty";

const Facilities = ({
 prevStep,
 propertyDetails,
 setOpened,
 setActiveStep,
 setPropertyDetails
}) => {
 const { addProperty, isLoading } = useAddProperty();
 const form = useForm({
  initialValues: {
   bedrooms: propertyDetails.facilities.bedrooms,
   parkings: propertyDetails.facilities.parkings,
   bathrooms: propertyDetails.facilities.bathrooms,

  },
  validate: {
   bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
   bathrooms: (value) =>
    value < 1 ? "Must have at least one bathroom" : null,
  },
 });


 const { bedrooms, parkings, bathrooms } = form.values;

 const { user } = useAuth0();
 const email = user?.email;
 const handleSubmit = () => {
  const { hasErrors } = form.validate();

  if (!hasErrors) {
   addProperty({
    ...propertyDetails,
    userEmail: email,
    facilities: {
     ...propertyDetails.facilities,
     bedrooms,
     parkings,
     bathrooms,
    },
   });
   setActiveStep(0);
   setOpened(false);
   setPropertyDetails({
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
    userEmail: email,
   });
  }
 }

 return (
  <Box maw="30%" mx="auto" my="sm">
   <form
    onSubmit={(e) => {
     e.preventDefault();
     handleSubmit();
    }}
   >
    <NumberInput
     withAsterisk
     label="No of Bedrooms"
     min={0}
     {...form.getInputProps("bedrooms")}
    />
    <NumberInput
     label="No of Parkings"
     min={0}
     {...form.getInputProps("parkings")}
    />
    <NumberInput
     withAsterisk
     label="No of Bathrooms"
     min={0}
     {...form.getInputProps("bathrooms")}
    />
    <Group position="center" mt="xl">
     <Button variant="default" onClick={prevStep}>
      Back
     </Button>
     <Button type="submit" color="green" disabled={isLoading}>
      {isLoading ? "Submitting" : "Add Property"}
     </Button>
    </Group>
   </form>
  </Box>
 );
};

export default Facilities;