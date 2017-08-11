const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;

class portforward extends BaseObject {
  constructor(options) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/portforward`;
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

module.exports = portforward;
