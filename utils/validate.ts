import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import some from 'lodash/some';
export class ValidateUtils {
  static hasEmptyOrNull(value: any): boolean {
    if (typeof value === 'object') {
      return some(value, (v) => v === '' || isNull(v));
    }

    return isEmpty(value);
  }
}
