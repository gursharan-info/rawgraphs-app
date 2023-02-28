import { flatMap, omit, map } from 'lodash'

export function stackData(data: any, column: any) {
  return flatMap(data, (record: any) => {
    const key = record[column]
    const others = omit(record, column)
    return map(others, (value: any, prop: any) => {
      return {
        [column]: key,
        column: prop,
        value,
      }
    });
  });
}
