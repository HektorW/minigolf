import React from 'react'
import { classNames } from '../../utils/classNames'
import './surface.scss'

export default function Surface({
  withPadding = false,
  elementType: ElementType = 'div',

  className,
  children,

  ...elementProps
}) {
  return (
    <ElementType
      className={classNames(
        'surface',
        withPadding && 'surface--with-padding',
        className
      )}
      {...elementProps}
    >
      {children}
    </ElementType>
  )
}
