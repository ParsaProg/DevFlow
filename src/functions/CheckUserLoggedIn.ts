const CheckUserLoggedIn = async ({
  fromAuthPage,
}: {
  fromAuthPage?: boolean;
}) => {
  let res = undefined;
  const response = await fetch("http://localhost:5500/api/v1/auth/verify", {
    method: "POST",
    credentials: "include", // Allow to browser send the cookie automaticaly
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken); // If user go to the sign-in page should redirect to dashboard.
    // if (fromAuthPage) navigator.push("/dashboard");
    // else res = true;
    res = true;
  } else res = false;
  return res;
};

export default CheckUserLoggedIn;
