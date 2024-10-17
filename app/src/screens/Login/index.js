import React, { useEffect, useState } from "react";

import theme from "../../styles/theme.styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Check from "../../components/Check";

// import Logo from "../../assets/logo/carecrew";
import Logo from "../../assets/logo/aptcare";
import TagLine from "../../assets/logo/tagline";

import Loading from "../Loading";

import splashLogo from "../../assets/logo/login_splash.png";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { useAuth, useAdmin } from "../../context";

import { getPeople, getFacility } from "../../graphql/queries";
import { ADMIN, FACILITY, EMPLOYEE } from "../../constants/userTypes";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ErrorToast, SuccessToast } from "../../services/micro";
import { useApolloClient } from "@apollo/client";
import { onUpdateFacility, onUpdatePeople } from "../../graphql/subscriptions";
import { GET_PEOPLE } from "../../apolloql/queries";
import themeStyles from "../../styles/theme.styles";
import Footer from "../../components/Footer";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerification, setNewPasswordVerification] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
  const [localUser, setLocalUser] = useState(null);

  // const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [email, setEmail] = useState("numan98khan@gmail.com");
  // const [email, setEmail] = useState("hassan@instacare.com");
  // const [email, setEmail] = useState("admin@instacarenursing.com");
  // const [email, setEmail] = useState("matthew@instacarenursing.com");

  // const [password, setPassword] = useState("Rentto@123");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  async function rememberDevice() {
    try {
      const result = await Auth.rememberDevice();
      console.log("remembered device", result);
    } catch (error) {
      console.log("Error remembering device", error);
    }
  }

  // const { user, signIn } = useAuth();
  const { loadType, loadIsSuperAdmin, myFacility, personalData } = useAuth();

  function validatePassword(password) {
    // Check if password is empty
    if (!password || password.length === 0) {
      return { isValid: false, message: "Password cannot be empty" };
    }

    // Check if password is at least 8 characters long
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long",
      };
    }

    // Check if password contains at least one number
    if (!/\d/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one number",
      };
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter",
      };
    }

    // Check if password contains only the allowed special characters
    if (/[^A-Za-z0-9!@#$%&*?_]/.test(password)) {
      return {
        isValid: false,
        message:
          "Password contains invalid special characters. Allowed: ! @ # $ % & * ? _",
      };
    }

    return { isValid: true, message: "Password is valid" };
  }

  const handleLogin = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!email) {
      ErrorToast("Enter Email");
      return;
    } else if (reg.test(email) === false) {
      ErrorToast("Enter a valid email address");
      return false;
    } else if (!password) {
      ErrorToast("Enter password");
      return false;
    }

    try {
      setLoading(true);
      // await delay(1000);
      // Select no-mfa

      console.log("ATTEMPT LOGIN");

      const local_user = await Auth.signIn(email, password);
      console.log(local_user);

      setLocalUser(local_user);
      loadType(null);

      if (local_user.challengeName === "NEW_PASSWORD_REQUIRED") {
        // Required attributes are OPTIONAL, but if they were configured
        // you need to get these in addition to new password from UI inputs
        const { requiredAttributes } = local_user.challengeParam;

        console.log("NEED NEW PASSWORD");

        // handleResetPassword();
        setIsFirstLogin(true);
      } else {
        // signIn(local_user);
        navigate("/");
        window.location.reload();
      }

      setLoading(false);
      // navigate("/");
    } catch (error_) {
      console.log("error signing in", error_);
      ErrorToast(error_.message || "An error occurred");

      setLocalUser(null);
      loadType(null);

      setLoading(false);
    } finally {
      // navigate("/");
      // window.location.reload();
    }
  };

  const handleResetPassword = async () => {
    try {
      // setLoading(true);
      await Auth.forgotPassword(email);
      setIsResettingPassword(false);
      setIsSettingNewPassword(true);
      // setLoading(false);
    } catch (error) {
      console.log("Error resetting password", error);
      ErrorToast(
        error?.message || "User either does't exist or isn't verified"
      );
      setLoading(false);
    }
  };

  const handleSetNewPassword = async () => {
    if (newPassword !== newPasswordVerification) {
      ErrorToast("Passwords don't match");
      return;
    }

    // Check if the verification code is a 6-digit number
    if (!/^\d{6}$/.test(verificationCode)) {
      ErrorToast("Verification code must be a 6-digit number");
      return;
    }

    const validation = validatePassword(newPassword);

    if (!validation.isValid) {
      ErrorToast(validation.message);
      return;
    }

    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(email, verificationCode, newPassword);

      // Sign in the user automatically after setting the new password
      // const user = await Auth.signIn(email, newPassword);
      // signIn(user); // Using your signIn function to update local state/context
      navigate("/"); // Redirect to dashboard or main page

      SuccessToast("Password updated and logged in successfully");
      setIsSettingNewPassword(false);
      setLoading(false);
    } catch (error) {
      console.log("Error setting new password", error);
      ErrorToast(error.message || "Error setting new password");
      setLoading(false);
    }
  };

  // Add this function for setting the new password
  const handleFirstLogin = async () => {
    if (newPassword !== newPasswordVerification) {
      ErrorToast("Passwords don't match");
    }

    try {
      setLoading(true);

      const loggedUser = await Auth.completeNewPassword(
        localUser, // the Cognito User Object
        newPassword // the new password
        // OPTIONAL, the required attributes
      );
      setIsFirstLogin(false);
      setLoading(false);
    } catch (error) {
      ErrorToast(error.message);
      // console.log(error.message);
      // console.log("Error setting new password", error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LoginLayout>
          {isSettingNewPassword ? (
            <SetNewPasswordForm
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              newPasswordVerification={newPasswordVerification}
              setNewPasswordVerification={setNewPasswordVerification}
              handleSetNewPassword={handleSetNewPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : isFirstLogin ? (
            <FirstLoginForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              newPasswordVerification={newPasswordVerification}
              setNewPasswordVerification={setNewPasswordVerification}
              handleFirstLogin={handleFirstLogin}
            />
          ) : (
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleResetPassword={handleResetPassword}
            />
          )}
        </LoginLayout>
      )}
    </>
  );
};

// const LoginLayout = ({ children }) => (
//   <div className="flex flex-row w-full h-screen">
//     <div className="absolute top-5 left-5">
//       <Logo size={3} className="mb-14" />
//     </div>
//     <div className="flex justify-center items-center w-full bg-gray-50">
//       <div className="items-center border border-gray-200 rounded-lg shadow w-1/4">
//         {children}
//       </div>
//     </div>
//     <Footer />
//   </div>
// );

const LoginLayout = ({ children }) => (
  <div className="flex flex-col justify-between w-full h-screen">
    <div className="h-full">
      <div className="absolute top-5 left-5">
        <Logo size={2} className="mb-14" />
      </div>
      <div className="flex justify-center items-center w-full bg-gray-50 h-full">
        <div className="items-center border border-gray-200 rounded-lg shadow w-1/4">
          {children}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

const RightPane = () => (
  <div
    className="flex-1 flex flex-col items-center justify-center"
    style={{ backgroundColor: theme.PRIMARY_NEUTRAL_COLOR }}
  >
    <TagLine />
    <div className="mb-12" />
    <img
      style={{ width: "500px", height: "auto" }}
      src={splashLogo}
      alt="Logo"
    />
  </div>
);

const SignInForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  showPassword,
  setShowPassword,
  handleResetPassword,
}) => (
  <form
    onSubmit={handleLogin}
    className="w-full bg-white rounded px-8 pt-6 pb-8"
  >
    <label className="text-lg font-bold" htmlFor="email">
      Sign In
    </label>
    <div className="mb-5" />
    <div className="mb-2">
      <label className="text-sm text-gray-500" htmlFor="email">
        Username or e-mail
      </label>
      <div className="mb-2" />
      <Input
        id="email"
        type="email"
        placeholder="example@hotmail.com"
        value={email}
        setValue={setEmail}
      />
    </div>
    <div className="mb-6">
      <label className="text-sm text-gray-500" htmlFor="password">
        Password
      </label>
      <div className="mb-2" />
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="*****"
        value={password}
        setValue={setPassword}
      />
    </div>
    <div className="flex flex-col space-y-2">
      <Check
        label={"Show password"}
        value={showPassword}
        onChange={(e) => setShowPassword(e.target.checked)}
      />
    </div>
    <div className="mb-6" />
    <div className="flex flex-col items-center justify-between">
      <Button
        type="submit"
        onClick={handleLogin}
        color={themeStyles?.PRIMARY_COLOR}
      >
        Sign In
      </Button>
      <div className="mb-4" />
      <label
        className="text-sm text-gray-500"
        htmlFor="password"
        style={{ color: theme.PRIMARY_COLOR }}
        onClick={handleResetPassword}
      >
        Forgot password?
      </label>
    </div>
    {/* <div className="mb-40" /> */}
  </form>
);

const FirstLoginForm = ({
  newPassword,
  setNewPassword,
  newPasswordVerification,
  setNewPasswordVerification,
  showPassword,
  setShowPassword,
  handleFirstLogin,
}) => (
  <form
    onSubmit={handleFirstLogin}
    className="w-full bg-white rounded px-8 pt-6 pb-8"
  >
    <label className="text-lg font-bold" htmlFor="email">
      Setup new password
    </label>
    <div className="mb-6">
      <label className="text-sm text-gray-500" htmlFor="password">
        Password
      </label>
      <div className="mb-2" />
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={newPassword}
        setValue={setNewPassword}
      />
    </div>
    <div className="mb-6">
      <label className="text-sm text-gray-500" htmlFor="password">
        Confirm Password
      </label>
      <div className="mb-2" />
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={newPasswordVerification}
        setValue={setNewPasswordVerification}
      />
    </div>
    <Check
      label={"Show password"}
      value={showPassword}
      onChange={(e) => setShowPassword(e.target.checked)}
    />
    <div className="mb-6" />
    <div className="flex flex-col items-center justify-between">
      <Button
        type="submit"
        onClick={handleFirstLogin}
        color={themeStyles?.PRIMARY_COLOR}
      >
        Setup
      </Button>
    </div>
    {/* <div className="mb-40" /> */}
  </form>
);

const SetNewPasswordForm = ({
  verificationCode,
  setVerificationCode,
  newPassword,
  setNewPassword,
  showPassword,
  setShowPassword,
  newPasswordVerification,
  setNewPasswordVerification,
  handleSetNewPassword,
}) => (
  <form
    // onSubmit={handleSetNewPassword}
    className="w-full bg-white rounded px-8 pt-6 pb-8"
  >
    <label className="text-lg font-bold" htmlFor="email">
      Setup new password
    </label>
    <div className="mb-6">
      <label className="text-sm text-gray-500" htmlFor="password">
        Verification code
      </label>
      <div className="mb-2" />
      <Input
        placeholder="Code"
        value={verificationCode}
        setValue={setVerificationCode}
      />
    </div>
    <div className="mb-6">
      <label className="text-sm text-gray-500" htmlFor="password">
        Password
      </label>
      <div className="mb-2" />
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={newPassword}
        setValue={setNewPassword}
      />
    </div>
    <div className="mb-6">
      <label className="text-sm text-gray-500" htmlFor="password">
        Confirm Password
      </label>
      <div className="mb-2" />
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={newPasswordVerification}
        setValue={setNewPasswordVerification}
      />
    </div>
    <Check
      label={"Show password"}
      value={showPassword}
      onChange={(e) => setShowPassword(e.target.checked)}
    />
    <div className="mb-6" />
    <div className="flex flex-col items-center justify-between">
      <Button
        type="button"
        onClick={handleSetNewPassword}
        color={themeStyles?.PRIMARY_COLOR}
      >
        Reset
      </Button>
    </div>
  </form>
);

export default Login;
