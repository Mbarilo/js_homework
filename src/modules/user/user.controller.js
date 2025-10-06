const userService = require("./user.service");

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },

  async getUserById(req, res) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json("ID має бути числом");

      const fields = req.query.fields ? req.query.fields.split(",") : null;
      const user = await userService.getById(id, fields);
      if (!user) return res.status(404).json("Юзера не знайдено");

      res.json(user);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },
};

module.exports = userController;