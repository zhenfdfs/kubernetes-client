const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;
const namespaces = require('./namespaces');

class v1 extends BaseObject {
  constructor(options) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/v1`;
  }

  namespaces(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new namespaces(options, name);
  }
  ns(name) {
    return this.namespaces(name);
  }

}

module.exports = v1;
