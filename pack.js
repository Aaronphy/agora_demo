const path = require('path');

module.exports = {
    tsx: true,
    less: true,
    https: true,
    extraBabelPlugins:[
       [
            require('@babel/plugin-proposal-decorators').default,
            {
                legacy: true
            }
        ],
        ["@babel/plugin-proposal-class-properties"]
    ],
    alias: {
        store: path.resolve(__dirname, 'src/store'),
        components: path.resolve(__dirname, 'src/components/'),
        utils: path.resolve(__dirname, 'src/utils'),
        views: path.resolve(__dirname, 'src/views'),
    },
};
