'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
      // BASE_URL: '"http://192.168.31.132:9083"',//伟标
    // BASE_URL: '"https://factory.myjuniu.com/yyzx/"',
    // BASE_URL: '"https://factory-beta.juniusoft.com/hiho/"',
    BASE_URL: '"http://factory-alpha.juniusoft.com/yyzx/"',
    RongYunKey: '"qd46yzrfqhb0f"'
})
