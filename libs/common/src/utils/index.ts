type DeepObject = Record<string, unknown>;

export function deepObjectIdToString(params: unknown): unknown {
  if (typeof params === 'string') {
    return params.toString();
  }

  if (Array.isArray(params)) {
    return params.map(deepObjectIdToString) as unknown[];
  }

  if (params !== null && typeof params === 'object') {
    return Object.entries(params).reduce<DeepObject>(
      (acc, [innerKey, innerValue]) => ({
        ...acc,
        [innerKey]: deepObjectIdToString(innerValue),
      }),
      {},
    );
  }

  return params;
}
