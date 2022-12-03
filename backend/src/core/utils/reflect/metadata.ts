export const getMetadata = <T>(
  metadataKey: any,
  target: any,
  propertyKey?: string | symbol,
): T | undefined => {
  const args = [metadataKey, target];

  if (propertyKey) args.push(propertyKey);

  return Reflect.getMetadata.call(this, ...args);
};

export function SetMetadata<T extends object | string | boolean>(
  metadataKey: string,
  metadataValue: T,
) {
  return function (target: any, key?: string) {
    const args = [metadataKey, metadataValue, target];

    if (key) args.push(key);

    Reflect.defineMetadata.call(this, ...args);
  };
}
