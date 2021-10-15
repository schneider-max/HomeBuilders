module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "homebuildersdb",
  synchronize: true,
  logging: false,
  insecureAuth: true,
  entities: [
    "lib/db/entities/**/*.ts"
  ],
};