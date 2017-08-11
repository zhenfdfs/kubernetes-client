const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;
const v1 = require('./v1');

class api extends BaseObject {
  constructor(options) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/api`;
  }

  v1() {
    const options = Object.assign({}, this.options, { path: this.path });
    return new v1(options);
  }

}

module.exports = api;
