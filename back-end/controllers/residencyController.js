import prisma from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    userEmail,
    phone,
    image,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        phone,
        image,
        //connect userEmail to owner so we type userEmail and not owner
        owner: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    res.send(residency);
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Residency already exists");
    }
    throw new Error(err.message);
  }
  res.json(newResidency);
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  const allResidencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(allResidencies);
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const residency = await prisma.residency.findUnique({
      where: {
        id,
      },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
