const BaseObject = require('./base');
const ProxyObject = require('./base').ProxyObject;
const bindings = require('./bindings');
const configmaps = require('./configmaps');
const endpoints = require('./endpoints');
const events = require('./events');
const limitranges = require('./limitranges');
const persistentvolumeclaims = require('./persistentvolumeclaims');
const pods = require('./pods');
const podtemplates = require('./podtemplates');
const replicationcontrollers = require('./replicationcontrollers');
const resourcequotas = require('./resourcequotas');
const secrets = require('./secrets');
const serviceaccounts = require('./serviceaccounts');
const services = require('./services');
const finalize = require('./finalize');

class namespaces extends BaseObject {
  constructor(options, name) {
    super(options);
    this.options = options;
    this.path = `${ options ? options.path : ''}/namespaces`;
    if (name) this.path = `${ this.path }/${ name }`;
  }

  bindings(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new bindings(options, name);
  }
  configmaps(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new configmaps(options, name);
  }
  cm(name) {
    return this.configmaps(name);
  }
  endpoints(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new endpoints(options, name);
  }
  ep(name) {
    return this.endpoints(name);
  }
  events(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new events(options, name);
  }
  ev(name) {
    return this.events(name);
  }
  limitranges(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new limitranges(options, name);
  }
  limits(name) {
    return this.limitranges(name);
  }
  persistentvolumeclaims(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new persistentvolumeclaims(options, name);
  }
  pvc(name) {
    return this.persistentvolumeclaims(name);
  }
  pods(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new pods(options, name);
  }
  po(name) {
    return this.pods(name);
  }
  podtemplates(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new podtemplates(options, name);
  }
  replicationcontrollers(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new replicationcontrollers(options, name);
  }
  rc(name) {
    return this.replicationcontrollers(name);
  }
  resourcequotas(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new resourcequotas(options, name);
  }
  quota(name) {
    return this.resourcequotas(name);
  }
  secrets(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new secrets(options, name);
  }
  serviceaccounts(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new serviceaccounts(options, name);
  }
  services(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new services(options, name);
  }
  svc(name) {
    return this.services(name);
  }
  finalize(name) {
    const options = Object.assign({}, this.options, { path: this.path });
    return new finalize(options, name);
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

module.exports = namespaces;
