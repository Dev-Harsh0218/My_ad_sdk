const {sequelize} = require("./db");

const syncDB = async() => {
    try {
        await sequelize.sync({force: false});
        console.log("Database Synced Successfully");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

syncDB();