import MetaApi from "metaapi.cloud-sdk";
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

export async function metaConnection(setAccount, setConnection) {
  const token =
    "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5YThjNmFmZTI4MmQ2YTM1NmJhYTA5OWY0MTc3NzdkZCIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7ImlkIjoidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJ0cmFkaW5nLWFjY291bnQtbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ZTMwNGE4MDAtNTFlNC00MTYzLTkxZTYtZjE4NzIxOWEyMDczIl19LHsiaWQiOiJtZXRhYXBpLXJlc3QtYXBpIiwibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDplMzA0YTgwMC01MWU0LTQxNjMtOTFlNi1mMTg3MjE5YTIwNzMiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOmUzMDRhODAwLTUxZTQtNDE2My05MWU2LWYxODcyMTlhMjA3MyJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOmUzMDRhODAwLTUxZTQtNDE2My05MWU2LWYxODcyMTlhMjA3MyJdfSx7ImlkIjoibWV0YXN0YXRzLWFwaSIsIm1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDplMzA0YTgwMC01MWU0LTQxNjMtOTFlNi1mMTg3MjE5YTIwNzMiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6ZTMwNGE4MDAtNTFlNC00MTYzLTkxZTYtZjE4NzIxOWEyMDczIl19XSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6IjlhOGM2YWZlMjgyZDZhMzU2YmFhMDk5ZjQxNzc3N2RkIiwiaWF0IjoxNjk5NjI5MjQ5LCJleHAiOjE3MDc0MDUyNDl9.FeFSnRFktB_Hb1FrcSVAeKm0yjc_c-0oivACo_1Gq4c7k8fNdmE9c6od2dxInZP75xmxulb8ALQAMtQqiEJbpN4E36plrgqo9hSQQcsfBeNMVo_YLww2dHBPT-9HX9rHVmhVtvwxy1lIF80K9sBC4Rq1lgt00ymNhHcVFozao43SuwtIyMGkoB22hcfa5spx3GW-1wnboFToLfow4QTDfHsc6kZqTOxyWDmQfps2Tx_OAXQSvpiE-kRDm_nh6_QaRzpXD3c5xFVB-iGsqyrpplg8TmBCH9OLzIp0MRkye_4disasPwVFBDjKT3B5ejwXVHFlOKZUp5UP8JwcSRN8Ex2KkFH7rBzvsrAnv6d_3YJ17AlzbzExMXxUOORLgLhSdvYz7xDcXQ1nUprkYJWUKglvpuxHW_mXgV0VZNNH_FfD-mRMYwRlPBKFykoE14BWwlAy4yy1tQMhh8NfkLy_qTMgfvlayoOo-BTidGEujg0QcSdS2Q01jIUmccGmX0KQT9G_w5FO5qPfKk_WtNAfo8pVekXWpFhNpKEPSELncRVodAcJKuSAKPH-EvfLCX_teO8FUqTyN9F0AHSibBjbU1d1iE-w2TgJpA7Iyq44uS6vFbcY21zPwpqMDDC_JVS5-ckMIsc8kY6WNF6AWOc_XLXfui8fPcqSd5Hg5DOxWh4";
  const accountId = "e304a800-51e4-4163-91e6-f187219a2073";
  const api = new MetaApi(token);
  const account = await api.metatraderAccountApi.getAccount(accountId);

  const initialState = account.state;
  const deployedStates = ["DEPLOYING", "DEPLOYED"];

  if (!deployedStates.includes(initialState)) {
    // wait until account is deployed and connected to broker
    console.log("Deploying account");
    await account.deploy();
  }

  console.log(
    "Waiting for API server to connect to broker (may take couple of minutes)"
  );
  await account.waitConnected();

  // connect to MetaApi API
  const connection = account.getRPCConnection();
  await connection.connect();
  setAccount(account);
  setConnection(connection);

  // wait until terminal state synchronized to the local state
  console.log(
    "Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)"
  );
  await connection.waitSynchronized();
}
