var config = {
    user: 'sean',
    password: 'sean',
    database: 'BrooklynDB',
    server: 'DESKTOP-7IMBLDM',

    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

module.exports = config; 