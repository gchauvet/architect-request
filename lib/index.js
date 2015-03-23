/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
/* 
 * Copyright 2015 Guillaume Chauvet.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var request = require('request');
var _ = require('lodash');

module.exports = function startup(options, imports, register) {

    var requests = {};
    
    _.forIn(options.domains, function (value, key) {
        requests[key] = request.defaults(_.merge({
            protocol: value.endpoint.protocol,
            hostname: value.endpoint.hostname,
            port: value.endpoint.port
        }, value.settings));
    });
    
    register(undefined, {
        domains: requests
    });

};