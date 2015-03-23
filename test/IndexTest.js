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

var test = require('unit.js');
var plugin = require('../lib/index');
var http = require('http');

describe('[ARCHITECT][REQUEST]', function () {

    var server;

    before(function () {
        server = http.createServer(function (req, resp) {
            if (req.url === '/foo') {
                resp.send(200);
            } else if (req.url === '/bar') {
                resp.send(201);
            } else {
                resp.send(501);
            }
            resp.end();
        });

        server.listen(0);
    });

    after(function () {
        if (server) {
            server.close();
        }
    });

    it('Test path "foo"', function (done) {
        var connection = server.address();
        plugin({
            domains: {
                'localhost': {
                    lazy: false,
                    endpoint: {
                        protocol: 'http',
                        hostname: connection.address,
                        port: connection.port
                    },
                    settings: {
                        json: true
                    }
                }
            }
        }, {}, function (err, res) {
            test.assert.ifError(err);
            test.object(res).isNotEmpty();
            res = res.domains.localhost;
            res.get('foo', function (err, res) {
                test.assert.ifError(err);
                test.number(res.statusCode).is(200);
                done();
            });
            done();
        });
    });

});