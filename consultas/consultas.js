const PoolSingleton = require("../config/poolbd");
const pool = PoolSingleton.getInstance();

const getUser = async (number) => {
  try {
    const result = await pool.query(`SELECT nombre FROM pickers WHERE telefono = ${number}`);
    return result.rows;
  } catch (error) {
    return error;
  }
};

module.exports = { getUser };
