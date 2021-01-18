const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");

sequelize.sync();
const Todo = sequelize.define('Todo', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
});

module.exports = Todo;
