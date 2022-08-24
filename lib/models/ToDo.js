const pool = require('../utils/pool');

module.exports = class ToDo {
  id;
  user_id;
  task;
  completed;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.task = row.task;
    this.completed = row.completed;
  }
  static async insert({ task, completed, user_id }) {
    const { rows } = await pool.query(
      `
        INSERT INTO todos (task, completed, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [task, completed, user_id]
    );

    return new ToDo(rows[0]);
  }
};
