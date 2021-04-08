module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        client: 'mongo',
        host: env('DATABASE_HOST', 'mongo.default.svc.cluster.local'),
        srv: env.bool('DATABASE_SRV', false),
        port: env.int('DATABASE_PORT', 30144),
        database: env('DATABASE_NAME', 'strapi-mongo'),
        username: env('DATABASE_USERNAME', null),
        password: env('DATABASE_PASSWORD', null),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  },
});