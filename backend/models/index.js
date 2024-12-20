const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',             // Specifică utilizarea SQLite.
    storage: 'database.db',  // Locația fișierului bazei de date.
    logging: false,
    define: {
        timestamps: false
    }
});

sequelize
    .sync()     // Creează/actualizeaza tabelele 
    .then(() => {
        console.log('Models sucessfully (re)created.');
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = { sequelize };