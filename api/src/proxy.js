const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;

class proxy extends BaseObject {
  constructor(options, path) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/proxy`;
    if (path) this.path = `${ this.path }/${ path }`;
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

module.exports = proxy;
