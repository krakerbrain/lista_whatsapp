//Vista admin - modificar status
const changeStatus = async (user) => {
  await axios.put("/status" + user);
};
