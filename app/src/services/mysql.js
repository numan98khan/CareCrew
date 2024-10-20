import { Auth, API } from "aws-amplify";
import axios from "axios"; // Assuming you're using axios for HTTP requests

export const fetchPostgresData = async (params) => {
  const user = await Auth.currentAuthenticatedUser();

  if (!user) {
    console.log("User is not authenticated!");
    return;
  }

  const apiName = "ic-services";
  const path = "/cc-postgres-api/";
  const myInit = {
    body: params,
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  const result = await API.post(apiName, path, myInit);
  console.log("🚀 ~ fetchApiData ~ result:", result);

  try {
    const parsedBody = JSON.parse(result.body);
    return { result, parsedBody };
  } catch (error) {
    const parsedBody = []; //JSON.parse("{}");
    return { result, parsedBody };
  }
};

export const fetchApiData = async (params) => {
  const user = await Auth.currentAuthenticatedUser();

  if (!user) {
    console.log("User is not authenticated!");
    return;
  }

  const apiName = "ic-services";
  const path = "/api/";
  const myInit = {
    body: params,
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  const result = await API.post(apiName, path, myInit);
  console.log("🚀 ~ fetchApiData ~ result:", result);

  try {
    const parsedBody = JSON.parse(result.body);
    return { result, parsedBody };
  } catch (error) {
    const parsedBody = []; //JSON.parse("{}");
    return { result, parsedBody };
  }
};

export const fetchSnowflakeData = async (params) => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    if (!user) {
      console.log("User is not authenticated!");
      return;
    }

    const apiName = "ic-services";
    const path = "/cc-snowflake-connector/";
    const myInit = {
      body: params,
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
    };

    const result = await API.get(apiName, path, myInit);
    console.log("🚀 ~ fetchApiData ~ result:", result);
    const parsedBody = JSON.parse(result.body);
    return parsedBody;

    try {
      console.log("🚀 ~ fetchSnowflakeData ~ parsedBody:", parsedBody);
      return { result, parsedBody };
    } catch (error) {
      const parsedBody = []; //JSON.parse("{}");
      return { result, parsedBody };
    }
  } catch (error) {
    console.error("Error fetching data from Snowflake:", error);
    return { success: false, data: [], error: error.toString() };
  }
};
