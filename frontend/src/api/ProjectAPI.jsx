

export const createProject = async (title, description) => {


    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/`,
        { title, description },
        { withCredentials: true }
      );


      // redirect after successful login
      navigate("/accounts/dashboard", { replace: true });

      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }


}

export const getProject = async () => {


    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/`,
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);


      return res.data;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }


}