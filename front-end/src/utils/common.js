export const getMenuStyles = (menuOpened) => {
  if (document.documentElement.clientWidth <= 800) {
    return { right: !menuOpened && "-100%" };
  }
};

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavorites = (id, favorites) => {
  console.log("from func", id, ...favorites);
  if (Array.isArray(favorites) && favorites?.includes(id)) {
    return favorites.filter((fav) => fav !== id);
  }
  return [...favorites, id];
};

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have at least 3 characters"
    : null;
};
