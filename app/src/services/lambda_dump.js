const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" }); // Replace with your AWS region

const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  let user = event.users; // Assuming you're sending an array of users from your React app
  let createdUsers = []; // To store the response of created users

  // for(let user of users) {
  let params = {
    UserPoolId: "us-east-1_fAUoEZrw3", // Replace with your User Pool ID
    Username: user.Username,
    TemporaryPassword: user.Password,
    UserAttributes: [
      {
        Name: "email",
        Value: user.Email,
      },
      // more user attributes here
    ],
  };

  try {
    let createdUser = await cognito.adminCreateUser(params).promise();
    // createdUsers.push({ username: user.Username, ...createdUser }); // Adding created user response to the array
    return {
      statusCode: 200,
      body: JSON.stringify({ user: createdUser }), // Return the array of created users
    };
  } catch (err) {
    console.log(err);
    // createdUsers.push({ username: user.Username, error: err }); // If error occurs, capture the error
    // return {
    //     statusCode: 400,
    //     body: JSON.stringify({users: createdUsers }) // Return the array of created users
    // };

    return {
      statusCode: 400,
      body: JSON.stringify({ username: user.Username, error: err }), // Return the array of created users
    };
  }
  // }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Zero users created" }), // Return the array of created users
  };
};
