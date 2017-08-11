const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;
const status = require('./status');

class persistentvolumeclaims extends BaseObject {
  constructor(options, name) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/persistentvolumeclaims`;
    if (name) this.path = `${ this.path }/${ name }`;
  }

  status(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new status(options, name);
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

module.exports = persistentvolumeclaims;
