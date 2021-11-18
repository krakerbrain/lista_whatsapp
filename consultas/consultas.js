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

const cambioStatus = async (id, estado) => {
  const result = await pool.query(`UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *;`);
  const usuario = result.rows[0];
  return usuario;
};

module.exports = {
  getUser,
  cambioStatus,
};
