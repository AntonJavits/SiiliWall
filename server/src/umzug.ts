import {dbConfig as sequelize} from './database';
import {SequelizeStorage, Umzug} from "umzug";

const env = process.env.NODE_ENV || 'development'
const migrationsPath = env === 'production' ? 'migrations/*.js' : 'migrations/*.ts'

export const migrator = new Umzug({
  migrations: {
    glob: [migrationsPath, { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
})

export type Migration = typeof migrator._types.migration;
