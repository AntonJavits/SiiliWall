import {dbConfig as sequelize} from './database';
import {SequelizeStorage, Umzug} from "umzug";

const env = process.env.NODE_ENV || 'development'
const seedersPath = env === 'production' ? 'seeders/*.js' : 'seeders/*.ts'

export const seeders = new Umzug({
  migrations: {
    glob: [seedersPath, { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
})

export type Seeders = typeof seeders._types.migration;
