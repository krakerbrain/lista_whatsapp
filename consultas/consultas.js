const PoolSingleton = require("../config/poolbd");
const pool = PoolSingleton.getInstance();

const getName = async (number) => {
  try {
    const result = await pool.query(`SELECT nombre FROM pickers WHERE telefono = ${number}`);
    return result.rows;
  } catch (error) {
    return error;
  }
};

const agregaTurno = async (telefono_lista, nombre) => {
  const consulta = {
    text: `INSERT INTO lista (telefono_lista, nombre, estado) VALUES ($1,$2, FALSE) RETURNING *;`,
    values: [telefono_lista, nombre],
  };
  try {
    const result = await pool.query(consulta);
    return result.rows;
  } catch (error) {
    return error;
  }
};

const agregaChofer = async (telefono, nombre) => {
  const consulta = {
    text: `INSERT INTO pickers (telefono, nombre) VALUES ($1,$2) RETURNING *;`,
    values: [telefono, nombre],
  };
  try {
    const result = await pool.query(consulta);
    return result.rows;
  } catch (error) {
    return error;
  }
};

const getList = async () => {
  try {
    const result = await pool.query("SELECT * FROM lista order by fecha");
    return result.rows;
  } catch (error) {
    return error;
  }
};
const getListAdmin = async () => {
  try {
    const result = await pool.query("SELECT * FROM lista  WHERE estado = false ORDER BY fecha");
    return result.rows;
  } catch (error) {
    return error;
  }
};

const cambioStatus = async (id) => {
  const result = await pool.query(`UPDATE lista SET estado = true WHERE id = ${id} RETURNING *;`);
  const usuario = result.rows[0];
  return usuario;
};

module.exports = {
  getName,
  agregaTurno,
  agregaChofer,
  getList,
  cambioStatus,
  getListAdmin,
};
