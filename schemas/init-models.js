var DataTypes = require("sequelize").DataTypes;
var _account_payment = require("./account_payment");
var _address = require("./address");
var _bank = require("./bank");
var _bank_account = require("./bank_account");
var _orders = require("./orders");
var _payment_transaction = require("./payment_transaction");
var _users = require("./users");
var _wedding_category = require("./wedding_category");
var _wedding_gallery = require("./wedding_gallery");
var _wedding_package = require("./wedding_package");
var _wedding_reserve = require("./wedding_reserve");
var _wedding_reserve_lines = require("./wedding_reserve_lines");
var _wedding_vendor = require("./wedding_vendor");

function initModels(sequelize) {
  var account_payment = _account_payment(sequelize, DataTypes);
  var address = _address(sequelize, DataTypes);
  var bank = _bank(sequelize, DataTypes);
  var bank_account = _bank_account(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment_transaction = _payment_transaction(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var wedding_category = _wedding_category(sequelize, DataTypes);
  var wedding_gallery = _wedding_gallery(sequelize, DataTypes);
  var wedding_package = _wedding_package(sequelize, DataTypes);
  var wedding_reserve = _wedding_reserve(sequelize, DataTypes);
  var wedding_reserve_lines = _wedding_reserve_lines(sequelize, DataTypes);
  var wedding_vendor = _wedding_vendor(sequelize, DataTypes);

  payment_transaction.belongsTo(account_payment, { as: "payt_acc_number_account_payment", foreignKey: "payt_acc_number"});
  account_payment.hasMany(payment_transaction, { as: "payment_transactions", foreignKey: "payt_acc_number"});
  bank_account.belongsTo(bank, { as: "baac_bank", foreignKey: "baac_bank_id"});
  bank.hasMany(bank_account, { as: "bank_accounts", foreignKey: "baac_bank_id"});
  payment_transaction.belongsTo(bank_account, { as: "payt_baac_acc_bank_bank_account", foreignKey: "payt_baac_acc_bank"});
  bank_account.hasMany(payment_transaction, { as: "payment_transactions", foreignKey: "payt_baac_acc_bank"});
  wedding_reserve_lines.belongsTo(orders, { as: "writ_order_name_order", foreignKey: "writ_order_name"});
  orders.hasMany(wedding_reserve_lines, { as: "wedding_reserve_lines", foreignKey: "writ_order_name"});
  account_payment.belongsTo(users, { as: "acc_user", foreignKey: "acc_user_id"});
  users.hasMany(account_payment, { as: "account_payments", foreignKey: "acc_user_id"});
  address.belongsTo(users, { as: "addr_user", foreignKey: "addr_user_id"});
  users.hasMany(address, { as: "addresses", foreignKey: "addr_user_id"});
  bank_account.belongsTo(users, { as: "baac_user", foreignKey: "baac_user_id"});
  users.hasMany(bank_account, { as: "bank_accounts", foreignKey: "baac_user_id"});
  orders.belongsTo(users, { as: "order_user", foreignKey: "order_user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "order_user_id"});
  wedding_reserve.belongsTo(users, { as: "were_user", foreignKey: "were_user_id"});
  users.hasMany(wedding_reserve, { as: "wedding_reserves", foreignKey: "were_user_id"});
  wedding_vendor.belongsTo(wedding_category, { as: "weve_weca", foreignKey: "weve_weca_id"});
  wedding_category.hasMany(wedding_vendor, { as: "wedding_vendors", foreignKey: "weve_weca_id"});
  wedding_reserve_lines.belongsTo(wedding_package, { as: "writ_wepa", foreignKey: "writ_wepa_id"});
  wedding_package.hasMany(wedding_reserve_lines, { as: "wedding_reserve_lines", foreignKey: "writ_wepa_id"});
  wedding_reserve_lines.belongsTo(wedding_reserve, { as: "writ_were", foreignKey: "writ_were_id"});
  wedding_reserve.hasMany(wedding_reserve_lines, { as: "wedding_reserve_lines", foreignKey: "writ_were_id"});
  wedding_gallery.belongsTo(wedding_vendor, { as: "wega_weve", foreignKey: "wega_weve_id"});
  wedding_vendor.hasMany(wedding_gallery, { as: "wedding_galleries", foreignKey: "wega_weve_id"});
  wedding_package.belongsTo(wedding_vendor, { as: "wepa_weve", foreignKey: "wepa_weve_id"});
  wedding_vendor.hasMany(wedding_package, { as: "wedding_packages", foreignKey: "wepa_weve_id"});
  wedding_reserve_lines.belongsTo(wedding_vendor, { as: "writ_weve", foreignKey: "writ_weve_id"});
  wedding_vendor.hasMany(wedding_reserve_lines, { as: "wedding_reserve_lines", foreignKey: "writ_weve_id"});

  return {
    account_payment,
    address,
    bank,
    bank_account,
    orders,
    payment_transaction,
    users,
    wedding_category,
    wedding_gallery,
    wedding_package,
    wedding_reserve,
    wedding_reserve_lines,
    wedding_vendor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
