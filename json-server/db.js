module.exports = function() {
  return {
    companies: require("./json/companies.json"),

    // Company 1
    users_c1: require("./json/c1-users.json"),
    users_details_c1: require("./json/c1-users-details.json"),

    groups_c1: require("./json/c1-groups.json"),

    branches_c1: require("./json/c1-branches.json"),
    branches_details_c1: require("./json/c1-branches-details.json"),

    shippingmethods_c1: require("./json/c1-shipping-methods.json"),

    // Company 2
    users_c2: require("./json/c2-users.json"),
    users_details_c2: require("./json/c2-users-details.json"),

    groups_c2: require("./json/c2-groups.json"),

    branches_c2: require("./json/c2-branches.json"),
    branches_details_c2: require("./json/c2-branches-details.json"),

    shippingmethods_c2: require("./json/c2-shipping-methods.json")
  };
};

function requireMany(folder) {
  var fs = require("fs");
  var files = fs.readdirSync(folder).filter(function(file) {
    if (file.indexOf(".json") > -1) return file;
  });

  return files.map(function(value) {
    try {
      return require(folder + "/" + value);
    } catch (event) {
      return console.log(event);
    }
  });
}
