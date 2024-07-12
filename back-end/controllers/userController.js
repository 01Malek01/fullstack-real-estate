import prisma from "../config/prismaConfig.js";
import asyncHandler from "express-async-handler";
export const createUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return
  } else {
    const user = await prisma.user.create({
      data: {
        email,
      },
    });
    res.json(user);
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { resdId } = req.params;
  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        bookVisits: true,
      },
    });

    //you can't book 2 times for a single residency
    if (alreadyBooked.bookVisits.some((visit) => visit.resdId === resdId)) {
      res.status(400).json("Already booked");
    } else {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          bookVisits: {
            push: {
              resdId,
              date,
            },
          },
        },
      });

      res.send("Booked");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const allBookings = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        bookVisits: true,
      },
    });

    res.send(allBookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { resdId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        bookVisits: true,
      },
    });
    const index = user.bookVisits.findIndex((visit) => visit.resdId === resdId);
    if (index === -1) {
      res.status(404).json("No booking found");
    } else {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          bookVisits: {
            set: user.bookVisits.filter((visit) => visit.resdId !== resdId),
          },
        },
      });
      res.send("Canceled");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { resdId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user.favResidencesId.includes(resdId)) {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          favResidencesId: user.favResidencesId.filter((id) => id !== resdId),
        },
      });
      res.status(201).json({
        message: "Removed from favorites",
        updatedUser,
        
      });
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          favResidencesId: {
            push: resdId,
          },
        },
      });
      res.status(201).json({
        message: "Added to favorites",
        updatedUser,
        resdId,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

export const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const resdIds = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        favResidencesId: true,
      },
    });
    res.status(200).json(resdIds);
  } catch (err) {
    throw new Error(err.message);
  }
});
