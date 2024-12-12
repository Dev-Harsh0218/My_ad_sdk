//import Data-types from the actual Sequelize package
const { DataTypes } = require("sequelize");
//importing the sequelize object created during db connnection here
const { sequelize } = require("../../../config/db");

const Registered_apk_key = sequelize.define('Registered_apk_key',{
    app_id:{type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,primaryKey: true,unique: true,allowNull: false,validate:{notEmpty:true,notNull:true}},
    app_name: {type: DataTypes.STRING,allowNull: false,validate:{notEmpty:true,notNull:true}},
    app_apk_key:{type: DataTypes.STRING,allowNull: false,validate:{notEmpty:true,notNull:true}},
    app_package_name:{type: DataTypes.STRING,allowNull: false,validate:{notEmpty:true,notNull:true}},
    app_version:{type: DataTypes.STRING,allowNull: false,validate:{notEmpty:true,notNull:true}},
    ad_count:{type:DataTypes.INTEGER,defaultValue: 0},
    app_impressions:{type:DataTypes.INTEGER,defaultValue: 0},
    app_clicks:{type:DataTypes.INTEGER,defaultValue:0},
    custom:{type:DataTypes.JSON,defaultValue:{}},
},{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'registered_apk_keys',
    indexes: [{unique: true, fields: ['app_id']}]
});

module.exports = Registered_apk_key;