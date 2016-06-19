"use strict";

var links = require('docker-links').parseLinks(process.env)

links.postgres = links.postgres || {hostname: 'localhost', port: 5432}
links.redis = links.redis || {hostname: 'localhost', port: 6379}
links.queue = links.queue || {hostname: 'localhost', port: 11300}

module.exports = {
  db: links.postgres,
  cache: links.redis,
  queue: links.queue
}