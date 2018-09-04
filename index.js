/**
 Copyright © Oleg Bogdanov
 Developer: Oleg Bogdanov
 Contacts: olegbogdanov86@gmail.com
 ---------------------------------------------
 */

"use strict";

const request = require('request');

class Kladr {

  constructor(opts) {

    this.isFree = true;
    this.token = null;

    if (isObject(opts)) {
      if (opts.token) {
        this.isFree = false;
        this.token = opts.token;
      }
    }

  }

  /**
   * Формирование query string
   * @param json
   * @returns {*}
   */
  param(json) {
    if (Object.keys(json).length === 0) {
      return '';
    } else {
      return '?' +
        Object.keys(json).map((key) => {
          return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
        }).join('&');
    }
  }

  buildQuery(query) {

    let queryString = {};

    if (query.ParentType && query.ParentId) {
      queryString[query.ParentType + 'Id'] = query.ParentId;
    }

    for (let key in query) {
      if (key.includes('ParentType') || key.includes('ParentId')) {
        continue;
      }
      queryString[key] = query[key];
    }

    // токен только для платной версии
    if (!this.isFree) {
      queryString.token = this.token;
    }

    return this.param(queryString)
  }

  getData(query, cb) {
    if (!query) {
      cb(new Error('Запрос не может быть пустым', 'emptyQuery'), null);
    } else if (!isObject(query)) {
      cb(new Error('Параметры должны иметь тип Object', 'notObject'), null);
    } else if (!query.contentType) {
      cb(new Error('Не указан обязательный параметр contentType', 'notСontentType'), null);
    }

    else {

      let url = `http://${this.isFree ? 'kladr-api.ru' : 'kladr-api.com'}/api.php` + this.buildQuery(query);
      let opts = {
        method: 'GET',
        url: url,
        json: true
      };

      request(opts, (error, response, body) => {
        if (typeof body === 'string') {
          cb(new Error(body), null);
        } else {
          cb(error, body);
        }
      });
    }
  }
}

module.exports = module.exports['default'] = Kladr;

function isObject(arg) {
  return arg !== null && typeof arg === 'object';
}