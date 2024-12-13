const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/db");
const Registered_apk_key = require("./Registered_apk_key");
const Ad = require("./Ad_model");

const Running_ad = sequelize.define('Running_ads', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    app_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Registered_apk_key,
            key: 'app_id'
        }
    },
    ad_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Ad,
            key: 'id'
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    impression_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    click_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    custom: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'running_ads',
    indexes: [
        { unique: true, fields: ['id'] },
        { fields: ['app_id'] },
        { fields: ['ad_id'] }
    ]
});

// Define relationships
Running_ad.belongsTo(Registered_apk_key, { foreignKey: 'app_id' });
Running_ad.belongsTo(Ad, { foreignKey: 'ad_id' });

module.exports = Running_ad;
