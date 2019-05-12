import { connect } from 'react-redux'
import Navigation from './Navigation'

const mapStateToProps = state => ({
  links: [
    {
      href: '/',
      text: 'Tabell'
    },
    {
      href: '/matches',
      text: 'Matcher'
    },
    {
      href: '/settings',
      text: 'Inställningar'
    }
  ]
})

export default connect(mapStateToProps)(Navigation)
