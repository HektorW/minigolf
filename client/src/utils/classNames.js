export const classNames = (...classNameList) =>
  classNameList.filter(Boolean).join(' ')

export const addChildClassName = (baseClassName, childExtension) => {
  if (!baseClassName || !childExtension) return null
  const separator = baseClassName.indexOf('__') === -1 ? '__' : '-'
  return splitAndAddToClassName(baseClassName, separator + childExtension)
}

export const addStateClassName = (baseClassName, stateExtension) => {
  if (!baseClassName || !stateExtension) return null
  return splitAndAddToClassName(baseClassName, `--${stateExtension}`)
}

const splitAndAddToClassName = (baseClassName, extension) => {
  const splitClassNames = baseClassName.split(' ')
  return splitClassNames.map(className => className + extension).join(' ')
}
