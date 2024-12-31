return (
  <>
    {loading ? (
      <Loading />
    ) : (
      <div className="flex flex-row w-full h-screen">
        <div className="flex-1 flex justify-center items-center">
          <div>
            <Logo className="mb-14" />
            {isSettingNewPassword ? (
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white  rounded px-8 pt-6 pb-8"
              >
                <label className="text-lg font-bold " htmlFor="email">
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
                {/* <div className="mb-5" /> */}

                <div className="mb-6">
                  <label className="text-sm text-gray-500" htmlFor="password">
                    Password
                  </label>
                  <div className="mb-2" />
                  <Input
                    id="password"
                    type="password"
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
                    type="password"
                    placeholder="Confirm Password"
                    value={newPasswordVerification}
                    setValue={setNewPasswordVerification}
                  />
                </div>

                <div className="mb-6" />

                <div className="flex flex-col items-center justify-between">
                  <Button type="submit" onClick={handleLogin} color="#123456">
                    Setup
                  </Button>
                </div>

                <div className="mb-40" />
              </form>
            ) : isFirstLogin ? (
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white  rounded px-8 pt-6 pb-8"
              >
                <label className="text-lg font-bold " htmlFor="email">
                  Setup new password
                </label>

                {/* <div className="mb-5" /> */}

                <div className="mb-6">
                  <label className="text-sm text-gray-500" htmlFor="password">
                    Password
                  </label>
                  <div className="mb-2" />
                  <Input
                    id="password"
                    // type="password"
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
                    // type="password"
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
                    color="#123456"
                  >
                    Setup
                  </Button>
                </div>

                <div className="mb-40" />
              </form>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white  rounded px-8 pt-6 pb-8"
              >
                <label className="text-lg font-bold " htmlFor="email">
                  Welcome Back!
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
                    // type="password"
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

                  {/* <Check
                    label={"Remember me"}
                    value={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  /> */}
                </div>

                <div className="mb-6" />

                <div className="flex flex-col items-center justify-between">
                  <Button type="submit" onClick={handleLogin} color="#123456">
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

                <div className="mb-40" />
              </form>
            )}
          </div>
        </div>

        <div
          className="flex-1 flex flex-col items-center justify-center"
          style={{ backgroundColor: theme.PRIMARY_NEUTRAL_COLOR }}
        >
          <TagLine />
          <div className="mb-12" />
          {/* <img src={splashLogo} alt="Logo" /> */}
          <img
            style={{ width: "500px", height: "auto" }}
            src={splashLogo}
            alt="Logo"
          />

          {/* <label className="text-lg font-bold" htmlFor="email">
        NURSING
      </label> */}
        </div>
      </div>
    )}
  </>
);
