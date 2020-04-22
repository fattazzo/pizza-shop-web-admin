module.exports = function () {
  return {
    companies: require("./json/companies.json"),

    users: require("./json/users.json"),
    users_details: require("./json/users-details.json"),

    groups: require("./json/groups.json"),

    branches: require("./json/branches.json"),
    branches_details: require("./json/branches-details.json"),

    shippingmethods: require("./json/shipping-methods.json"),
  };
};

function requireMany(folder) {
  var fs = require("fs");
  var files = fs.readdirSync(folder).filter(function (file) {
    if (file.indexOf(".json") > -1) return file;
  });

  return files.map(function (value) {
    try {
      return require(folder + "/" + value);
    } catch (event) {
      return console.log(event);
    }
  });
}
