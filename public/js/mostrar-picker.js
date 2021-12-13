//Vista admin - modificar status
const changeStatus = async (user) => {
  document.getElementById(user).style.display = "none";
  await axios.put("/status" + user);
};
