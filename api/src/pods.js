const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;
const attach = require('./attach');
const binding = require('./binding');
const eviction = require('./eviction');
const exec = require('./exec');
const log = require('./log');
const portforward = require('./portforward');
const proxy = require('./proxy');

class pods extends BaseObject {
  constructor(options, name) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/pods`;
    if (name) this.path = `${ this.path }/${ name }`;
  }

  attach(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new attach(options, name);
  }
  binding(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new binding(options, name);
  }
  eviction(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new eviction(options, name);
  }
  exec(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new exec(options, name);
  }
  log(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new log(options, name);
  }
  portforward(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new portforward(options, name);
  }
  proxy(path) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new proxy(options, path);
  }

  get(optionsOrCb, cb) {
    super.get(optionsOrCb, cb);
  }
  put(optionsOrCb, cb) {
    super.put(optionsOrCb, cb);
  }
  post(optionsOrCb, cb) {
    super.post(optionsOrCb, cb);
  }
  delete(optionsOrCb, cb) {
    super.delete(optionsOrCb, cb);
  }
}

module.exports = pods;
