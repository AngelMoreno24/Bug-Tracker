

export const createProject = async (title, description) => {


    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/create`,
        { title, description },
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);

      // redirect after successful login
      navigate("/accounts/dashboard", { replace: true });

      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }


}