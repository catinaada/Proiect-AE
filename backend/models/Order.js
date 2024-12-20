const sequelize = require('./index').sequelize;
const { DataTypes } = require('sequelize');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: sequelize.User,
      key: 'id',
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 

  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,  


  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,  

  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'canceled'),
    defaultValue: 'pending',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

module.exports = Order;