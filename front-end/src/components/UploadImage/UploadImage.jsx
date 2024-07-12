import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './UploadImage.css';
import { Button, Group } from '@mantine/core';

function UploadImage({ prevStep, propertyDetails, setPropertyDetails, nextStep }) {
  const [imageUrl, setImageUrl] = useState(propertyDetails.Image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({
      ...prev, image:imageUrl
    }));
    nextStep();
  }
  useEffect(() => {
    if (window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'dspbmuxcv',
          uploadPreset: 'lqydlhbx',
          maxFiles: 1,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            setImageUrl(result.info.secure_url);
            setPropertyDetails((prev) => ({
              ...prev,
              Image: result.info.secure_url,
            }));
          }
        }
      );
    }
  }, []);

  return (
    <div className='flexColCenter uploadWrapper'>
      {
        !imageUrl ? (
          <div className="flexCenter uploadZone"
            onClick={() => widgetRef.current.open()} // Open Cloudinary widget to upload files
          >
            <AiOutlineCloudUpload size={50} color="grey" />
            <span>Upload Image</span>
          </div>
        ) : (
          <>
            <span>click on image to change</span>
            <div className="uploadedImage" onClick={() => widgetRef.current.open()}>
              {/* selected image will be shown here*/}
              <img src={imageUrl} alt="uploaded" />
            </div>
          </>
        )
      }
      <Group pos={"center"} mt={"xl"}>
        <Button position='center' variant='default' onClick={prevStep} mt={"xl"} type='submit'>Previous Step</Button>
        <Button position='center' variant='default' onClick={handleNext} disabled={!imageUrl} mt={"xl"} type='submit'>Next Step</Button>
      </Group>
    </div>
  );
}

export default UploadImage;
