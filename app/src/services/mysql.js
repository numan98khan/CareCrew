import { Auth, API } from "aws-amplify";

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
