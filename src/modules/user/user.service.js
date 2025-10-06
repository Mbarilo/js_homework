const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../../data/users.json");

const userService = {
  async getAll() {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  },

  async getById(id, fields) {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) return null;

    if (!fields) return user;

    const filtered = {};
    fields.forEach((field) => {
      if (user[field] !== undefined) filtered[field] = user[field];
    });
    return filtered;
  },
};

module.exports = userService;