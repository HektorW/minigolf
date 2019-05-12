import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
// import logoSrc from '../../res/logo.jpg'
import BullLogo from '../_svg/BullLogo'
import { classNames, addChildClassName } from '../../utils/classNames'
import './main-layout.scss'

const MainLayout = ({ children, className }) => (
  <div className={classNames('main-layout', className)}>
    <h1 className="main-layout__team-name">Partiet</h1>
    {/*<header className="main-layout__header">
      <Link to="/">
        <BullLogo className="main-layout__header-logo" />
      </Link>

      <h1 className="main-layout__header-title">Partiet</h1>
      </header>*/}

    <img className="main-layout__logo" src="/images/logo_text.png" />

    <main
      className={classNames(
        'main-layout__content',
        'slide-appear',
        addChildClassName(className, 'content')
      )}
    >
      {children}
    </main>

    <Navigation />
  </div>
)

export default MainLayout
