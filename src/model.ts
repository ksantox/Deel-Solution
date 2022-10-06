import { Sequelize, Model, DataTypes, Association } from "sequelize";

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite3'
// });

const sequelize = new Sequelize({ dialect: "sqlite", storage: "database.sqlite3" });

class Profile extends Model {
  declare id: number;
  declare type: string;
}
Profile.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance:{
      type:DataTypes.DECIMAL(12,2)
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor')
    }
  },
  {
    sequelize,
    modelName: 'Profile'
  }
);

class Contract extends Model {
  declare ClientId?: number;
  declare ContractorId?: number;
}
Contract.init(
  {
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('new','in_progress','terminated')
    }
  },
  {
    sequelize,
    modelName: 'Contract'
  }
);

class Job extends Model {}
Job.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price:{
      type: DataTypes.DECIMAL(12,2),
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      // default:false
    },
    paymentDate:{
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'Job'
  }
);

Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)

export {
  sequelize,
  Profile,
  Contract,
  Job
};
