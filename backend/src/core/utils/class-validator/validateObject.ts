import { validateSync } from 'class-validator';

export const validateObject = <T extends object>(
  object: T,
  onInvalid: (err: string) => void,
): object is T => {
  const errors = validateSync(object);

  if (errors.length) {
    onInvalid(
      errors[0].constraints
        ? Object.values(errors[0].constraints)[0]
        : `${errors[0].property} is invalid`,
    );
    return false;
  }

  return true;
};
