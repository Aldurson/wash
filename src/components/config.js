export const URL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
export const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const ZOOM = 9;
//should not hard code this key, should change this ? env variable?
export const revGeoApi = "3c9ef7c7a5494283b4ddc09b8465ed57";
export const COORDS = [-33.92, 18.42];
export const reverseGeocodingUrl = (lat, lng, revGeoApi) =>
  `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${revGeoApi}`;
export const clearWorkout = () => {
  return {
    city: "",
    country: "",
    country_code: "za",
    state: "",
    type: "running",
    id: "",
    flag: "",
    date: "",
    coords: [],
    distance: 0,
    duration: 0,
    speed: 0,
    pace: 0,
    elevation: 0,
    cadence: 0,
    description: "",
    shortDescription: "",
  };
};
export async function setName(lat, lng) {
  const url = reverseGeocodingUrl(lat, lng, revGeoApi);
  const resp = await fetch(url);
  const data = await resp.json();
  if (!resp.ok) return "Unknown";
  return data.features[0].properties.city;
}
