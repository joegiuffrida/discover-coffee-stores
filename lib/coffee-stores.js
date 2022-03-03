// initialize unsplash api and grab list of coffee shop photos from unsplash
import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40,
  });

  const unsplashResults = photos.response.results;
  // we only care about the urls property of each object because that is what holds the small image that we need for our coffee app so we will map over the unsplashResults and pick that out.
  const photosResponse = unsplashResults.map((result) => result.urls.small);

  return photosResponse;
};

// foursquare API
const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}&v=20220228`;
};

export const fetchCoffeeStores = async (
  latLong = '38.57,-121.47',
  limit = 6
) => {
  const coffeePhotos = await getListOfCoffeeStorePhotos();

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  // sacramento is the default lat long: '38.57%2C-121.47'
  const response = await fetch(
    getUrlForCoffeeStores(latLong, 'coffee store', limit),
    options
  );

  const data = await response.json();

  const transformedData =
    data?.results?.map((venue, index) => {
      return {
        id: venue.fsq_id,
        ...venue,
        address: venue.location.formatted_address,
        neighborhood: venue.location.neighborhood,
        imgUrl: coffeePhotos[index],
      };
    }) || [];
  console.log({ transformedData });
  return transformedData;
};
