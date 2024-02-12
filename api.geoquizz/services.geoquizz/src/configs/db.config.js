export default {
    client: 'mysql',
    connection: {
        host: 'geoquizz.services.db',
        port: 45050,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
};
