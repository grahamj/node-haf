let connection;

const get = () => connection;

const set = (conn) => {
  connection = conn;
};

export default {
  get,
  set,
};
