import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../../utils/classNames'
import './checkbox.scss'

const Checkbox = ({ isChecked, disabled, className, children, onChange }) => (
  <label
    className={classNames(
      'checkbox',
      disabled && 'checkbox--is-disabled',
      className
    )}
  >
    <input
      className="checkbox__box"
      type="checkbox"
      checked={isChecked}
      disabled={disabled === true}
      onChange={event => onChange(event.target.checked)}
    />
    <span className="checkbox__children">{children}</span>
  </label>
)

Checkbox.propTypes = {}

export default Checkbox
