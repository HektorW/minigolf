import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './navigation.scss'

const Navigation = ({ links }) => (
  <nav className="navigation">
    <ul className="navigation__list">
      {links.map(link => (
        <li key={link.href} className="navigation__item">
          <Link className="navigation__item-link" to={link.href}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

Navigation.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  )
}

export default Navigation
