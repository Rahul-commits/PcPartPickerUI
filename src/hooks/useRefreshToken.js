import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log("about ot call");
    const response = await axios.post(
      "/api/auth/refreshtoken",
      JSON.stringify({ refreshToken: auth.refreshToken }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
