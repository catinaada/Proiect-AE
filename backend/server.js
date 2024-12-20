const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

require('dotenv').config();

const app = express();     //creeaza app express
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173'   //Permite accesul doar de pe http..
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '200000mb' }));


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello' })
})


User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Rute
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Baza de date a pornit!');
        app.listen(PORT, () => console.log(`Serverul este pornit la http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Eroare sincronizare baza de date:', err));
