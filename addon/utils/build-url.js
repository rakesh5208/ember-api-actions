import { assert } from '@ember/debug';

export function buildOperationUrl(record, opPath, urlType, instance = true) {
  assert('You must provide a path for instanceOp', opPath);
  let modelName = record.constructor.modelName || record.constructor.typeKey;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let snapshot = record._createSnapshot();
  let baseUrl = adapter.buildURL(modelName, instance ? record.get('id') : null, snapshot, urlType);
  let queryParamsIndex = baseUrl.indexOf('?');
  let queryParams = '';
  if (queryParamsIndex != -1) {
    queryParams = baseUrl.substring(queryParamsIndex);
    baseUrl = baseUrl.substring(0, queryParamsIndex)
  }
  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    return `${baseUrl}${path}${queryParams}`;
  } else {
    return `${baseUrl}/${path}${queryParams}`;
  }
}

export default buildOperationUrl;
