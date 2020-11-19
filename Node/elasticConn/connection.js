//var elasticsearch = require('elasticsearch');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://10.9.32.17:19300/' })

module.exports = client

//var client = new elasticsearch.Client( {
//    hosts:[
//        'http://10.9.32.17:19300/'
//    ]
//});

//var client= elasticsearch;
