'use strict';
const assign = require('assign-deep');
const request = require('request');

// const matchExpression = require('./match-expression');

// function cb200(cb) {
//   return function (err, result) {
//     if (err) return cb(err);
//     if (result.statusCode < 200 || result.statusCode > 299) {
//       const error = new Error(result.body.message || result.body);
//       error.code = result.body.code || result.statusCode;
//       return cb(error);
//     }
//     cb(null, result.body);
//   };
// }

class BaseObject {
  /**
   * Create generic Kubernetes API object. The object is callable (e.g., pod('foo')),
   * which by default returns a new object of the same type with the parent path
   * extended by the argument too the function
   * (e.g., '/api/v1/namespace/default/pods/foo'). Users customize the callable
   * behavior by passing an optional function to this constructor.
   *
   * @param {object} options - Options object
   * @param {string} options.api - Kubernetes API URL
   * @param {string} options.name - kubernetes resource name
   * @param {string} options.parentPath - Kubernetes resource paprent path
   * @param {string} options.fn - Optional function to invoke when object is
   * called
   * @param {string} options.qs - Optional query string object
   */
  constructor(options) {
    this.requestOptions = options.request || {};

    this.requestOptions.ca = options.ca;
    this.requestOptions.cert = options.cert;
    this.requestOptions.key = options.key;

    if ('insecureSkipTlsVerify' in options) {
      this.requestOptions.strictSSL = !options.insecureSkipTlsVerify;
    }

    if (options.auth) {
      this.requestOptions.auth = options.auth;
    }
    this.path = options.path;
  }
  // constructor(options) {
    // const api = options.api;
    // const path = `${ options.parentPath }/${ options.name }`;
    //
    // let fn = options.fn;
    // if (!fn) {
    //   fn = name => {
    //     return new this.constructor({
    //       api: api,
    //       name: name,
    //       parentPath: path
    //     });
    //   };
    // }

    // this.api = api;
    // this._name = options.name;
    // this.parentPath = options.parentPath;
    // this.fn = options.fn;
    // this.qs = options.qs || {};
    //
    // this.path = path;
  // }

  /**
   * Invoke a REST request against the Kubernetes API server
   * @param {string} method - HTTP method, passed directly to `request`
   * @param {ApiRequestOptions} options - Options object
   * @param {callback} cb - The callback that handles the response
   * @returns {Stream} If cb is falsy, return a stream
   */
  _request(method, options, cb) {
    const requestOptions = Object.assign({
      method: method || 'GET',
      // uri: this._url(options.path),
      uri: this.path,
      body: options.body,
      json: true,
      qs: options.qs,
      headers: options.headers
    }, this.requestOptions);

    // if (typeof cb !== 'function') return request(requestOptions, options);
    if (typeof cb !== 'function') cb = options;

    return request(requestOptions, (err, res, body) => {
      if (err) return cb(err);
      cb(null, { statusCode: res.statusCode, body: body });
    });
  }

  /**
   * Invoke a GET request against the Kubernetes API server
   * @param {ApiRequestOptions} options - Options object.
   * @param {callback} cb - The callback that handles the response
   * @returns {Stream} If cb is falsy, return a stream
   */
  get(options, cb) {
    return this._request('GET', options, cb);
  }

  /**
   * Invoke a DELETE request against the Kubernetes API server
   * @param {ApiRequestOptions} options - Options object.
   * @param {callback} cb - The callback that handles the response
   */
  delete(options, cb) {
    this._request('DELETE', options, cb);
  }

  /**
   * Invoke a PATCH request against the Kubernetes API server
   * @param {ApiRequestOptions} options - Options object.
   * @param {callback} cb - The callback that handles the response
   */
  patch(options, cb) {
    this._request('PATCH', assign({
      headers: { 'content-type': 'application/strategic-merge-patch+json' }
    }, options), cb);
  }

  /**
   * Invoke a POST request against the Kubernetes API server
   * @param {ApiRequestOptions} options - Options object.
   * @param {callback} cb - The callback that handles the response
   */
  post(options, cb) {
    this._request('POST', assign({
      headers: { 'content-type': 'application/json' }
    }, options), cb);
  }

  /**
   * Invoke a PUT request against the Kubernetes API server
   * @param {ApiRequestOptions} options - Options object.
   * @param {callback} cb - The callback that handles the response
   */
  put(options, cb) {
    this._request('PUT', assign({
      headers: { 'content-type': 'application/json' }
    }, options), cb);
  }

  //
  // Higher-level porcelain methods
  //

  /**
   * Return resources matching an array Match Expressions
   * @param {MatchExpression[]} expressions - Array of expressions to match
   * @returns {object} API object
   */
  // match(expressions) {
  //   const qs = Object.assign({}, this.qs, {
  //     labelSelector: matchExpression.stringify(expressions)
  //   });
  //   return new this.constructor({
  //     api: this.api,
  //     name: this._name,
  //     parentPath: this.parentPath,
  //     fn: this.fn,
  //     qs
  //   });
  // }

  /**
   * Return resources matching labels
   * @param {object} labels - Object of label keys and values
   * @returns {object} API object
   */
  // matchLabels(labels) {
  //   return this.match(Object.keys(labels).map(key => ({
  //     key: key,
  //     operator: 'In',
  //     values: [labels[key]]
  //   })));
  // }
}

module.exports = BaseObject;
