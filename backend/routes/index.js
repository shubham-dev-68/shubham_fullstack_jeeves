const propertyRoutes = require("./property.route.js");

module.exports = (app) => {
    app.use("/api/property", propertyRoutes);
};