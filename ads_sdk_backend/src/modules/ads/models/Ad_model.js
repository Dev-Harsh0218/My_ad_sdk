// importing Data-types from the actual Sequelize package
const { DataTypes } = require("sequelize");
//importing the sequelize object created during db connnection here
const { sequelize } = require("../../../config/db");

const Ad = sequelize.define('Ad',{
    id:{type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,primaryKey: true,unique: true},
    ad_asset_path: {type: DataTypes.STRING,allowNull: false,validate:{notEmpty:true}},
    app_link:{type:DataTypes.STRING,allowNull:false,validate:{notEmpty:true,isUrl:true}},
    is_banner: {type:DataTypes.BOOLEAN,defaultValue: false},
    impression_count:{type:DataTypes.INTEGER,defaultValue: 0},
    click_count:{type:DataTypes.INTEGER,defaultValue:0},
    custom:{type:DataTypes.JSON,defaultValue:{}},
},{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'ads',
    indexes: [{unique: true, fields: ['id']}]
});

module.exports = Ad;