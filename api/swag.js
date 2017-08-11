/* eslint-disable no-sync */

const swagger = require('swagger-client');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

const api = JSON.parse(fs.readFileSync('./swagger.json'));

function parseApiPaths(apiPaths) {
  const apiObjects = {};
  const resourceAliases = {
    // We support the full names and all the abbbreviated aliases:
    //   http://kubernetes.io/docs/user-guide/kubectl-overview/
    // and anything else we think is useful.
    clusterroles: [],
    clusterrolebindings: [],
    componentstatuses: ['cs'],
    configmaps: ['cm'],
    cronjobs: [],
    daemonsets: ['ds'],
    deployments: ['deploy'],
    events: ['ev'],
    endpoints: ['ep'],
    horizontalpodautoscalers: ['hpa'],
    ingresses: ['ing'],
    jobs: [],
    limitranges: ['limits'],
    namespaces: ['ns'],
    nodes: ['no'],
    persistentvolumes: ['pv'],
    persistentvolumeclaims: ['pvc'],
    // Deprecated name of statefulsets in kubernetes 1.4
    petsets: [],
    pods: ['po'],
    replicationcontrollers: ['rc'],
    replicasets: ['rs'],
    resourcequotas: ['quota'],
    roles: [],
    rolebindings: [],
    // Deprecated name of cronjobs in kubernetes 1.4
    scheduledjobs: [],
    secrets: [],
    serviceaccounts: [],
    services: ['svc'],
    statefulsets: [],
    thirdpartyresources: []
  };

  apiPaths.forEach(apiFullPath => {
    // const path = api.paths[apiFullPath];
    const pathNodes = apiFullPath.slice(1).split('/');
    let prevApiNode;
    pathNodes.forEach(className  => {
      if (className.startsWith('{')) {
        prevApiNode.parameter = className.slice(1, -1);
        return;
      }
      let classObject = apiObjects[className];
      if (!classObject) {
        classObject = { className: className, children: [], methods: [], parameterMethods: [] };
        classObject.resourceAliases = resourceAliases[className] || [];
        apiObjects[className] = classObject;
        if (prevApiNode && !prevApiNode.children.includes(className)) {
          prevApiNode.children.push(classObject);
        }
      }
      prevApiNode = classObject;
    });

    const parameterMethods = pathNodes.pop().startsWith('{');

    if (prevApiNode) {
      ['get', 'put', 'post', 'delete'].forEach(method => {
        const methods = parameterMethods ? prevApiNode.parameterMethods : prevApiNode.methods;
        if (!methods.includes(method)) {
          methods.push(method);
        }
      });
    }
  });
  return apiObjects;
}

function generateClasses(apiObjects) {
  const template = fs.readFileSync(path.join(__dirname, 'apiClass.mustache')).toString();
  Object.keys(apiObjects).forEach(className => {
    const apiObject = apiObjects[className];
    const classDef = mustache.render(template, apiObject);
    const pathToOutput = path.join(__dirname, 'src', `${ className }.js`);
    fs.writeFileSync(pathToOutput, classDef);
    // console.log(classDef);
  });
}

swagger({ spec: api }).then((jx) => {
  // console.log(jx.spec)
  const nsApi = Object.keys(jx.spec.paths).filter(path => path.startsWith('/api/v1/namespaces'));

  const apiObjects = parseApiPaths(nsApi);

  generateClasses(apiObjects);
});
