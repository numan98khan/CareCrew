import { Auth, API } from "aws-amplify";

export const createBulkUsers = async (users) => {
  const user = await Auth.currentAuthenticatedUser();
  const action = "create";

  if (!user) {
    console.log("User is not authenticated!");
    return;
  }

  users.action = "create";

  const apiName = "ic-services";
  const path = "/create-user/";
  const myInit = {
    body: { user: users },
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  const result = await API.post(apiName, path, myInit);
  console.log(
    "🚀 ~ file: bulkUserCreation.js:26 ~ createBulkUsers ~ result:",
    result
  );

  const parsedBody = JSON.parse(result.body);
  return { result, parsedBody };

  // if (result?.statusCode === 400) {
  //   console.error(
  //     "AdminCreateUser (ic-user-create):",
  //     parsedBody?.error?.message
  //   );
  // } else {
  //   return { result, parsedBody };
  // }
};

export const deleteBulkUsers = async (users) => {
  const user = await Auth.currentAuthenticatedUser();

  if (!user) {
    console.log("User is not authenticated!");
    return;
  }

  users.action = "delete";

  const apiName = "ic-services";
  const path = "/create-user/";
  const myInit = {
    body: { user: users },
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  const result = await API.post(apiName, path, myInit);

  const parsedBody = JSON.parse(result.body);
  return { result, parsedBody };

  // if (result?.statusCode === 400) {
  //   console.error(
  //     "AdminCreateUser (ic-user-create):",
  //     parsedBody?.error?.message
  //   );
  // } else {
  //   return { result, parsedBody };
  // }
};

export const createBulkShifts = async (payload) => {
  const user = await Auth.currentAuthenticatedUser();

  if (!user) {
    console.log("User is not authenticated!");
    return;
  }

  const apiName = "ic-services";
  const path = "/bulk-shifts/";
  const myInit = {
    body: payload,
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getIdToken()
        .getJwtToken()}`,
    },
  };

  const result = await API.post(apiName, path, myInit);

  const parsedBody = JSON.parse(result.body);
  return { result, parsedBody };
};

// User: arn:aws:sts::078950192077:assumed-role/ic-user-create-role-bmy7hfcg/ic-user-create is not authorized to perform: cognito-idp:AdminCreateUser on resource: arn:aws:cognito-idp:us-east-1:078950192077:userpool/us-east-1_a7xpMUB3P because no identity-based policy allows the cognito-idp:AdminCreateUser action
