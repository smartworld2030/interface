import Game from 'components/Wallet/Game'
import Land from 'components/Wallet/Land'
import NFT from 'components/Wallet/NFT'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { landInformation } from '_actions/land.actions'
import { AbsoluteBody } from '../components/Layout/divs/Divs'
import Info from '../components/Wallet/Info'
import Investment from '../components/Wallet/Invest'
import Investment02 from '../components/Wallet/Invest02'
import Swap from '../components/Wallet/Swap'
import { accountTokenBalances } from '../_actions/account.actions'
import { tokenPrices } from '../_actions/bank.actions'
import { invest02Information } from '../_actions/invest02.actions'
import { poolInformation } from '../_actions/pool.actions'
import { stockInformation } from '../_actions/stock.actions'
import {
  initialization,
  invest02Contract,
  landContract,
  stockContract,
} from '../_actions/wallet.actions'
import { AppActions, AppState } from '../_types'
import ProtectedRoute from './ProtectedRoute'
import RouteHeader from './RouteHeader'

interface IProps {
  isMobile: boolean
  height: number
  width: number
  detailHandler: () => void
}

type AppRouterProps = IProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const priceDelay = 10
const detailsDelay = 30
let timer
let routeTimer

export const AppRouter: React.FC<AppRouterProps> = ({
  detailHandler,
  isMobile,
  address,
  height,
  width,
  active,
  init,
  tokenPrices,
  poolInformation,
  landInformation,
  stockInformation,
  invest02Information,
}) => {
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    setTimeout(() => {
      console.log('initialization')
      init()
    }, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    clearInterval(timer)
    if (active) {
      tokenPrices()
      timer = setInterval(() => {
        tokenPrices()
      }, priceDelay * 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [active, tokenPrices])

  useEffect(() => {
    const switcher = () => {
      switch (pathname.toLocaleLowerCase()) {
        case '/land':
          if (landContract) landInformation()
          break
        case '/nft':
          if (landContract) landInformation()
          break
        case '/invest02':
          if (invest02Contract) invest02Information()
          break
        case '/game':
          if (stockContract) stockInformation()
          break
        case '/swap':
          break
        default:
          break
      }
    }
    clearInterval(routeTimer)
    if (address) {
      switcher()
      routeTimer = setInterval(() => {
        switcher()
      }, detailsDelay * 1000)
    }
    return () => {
      clearInterval(routeTimer)
    }
  }, [
    pathname,
    address,
    poolInformation,
    invest02Information,
    stockInformation,
    landInformation,
  ])

  const transitions = useTransition(location, {
    key: pathname,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return (
    <Container
      fluid
      style={{
        width,
        height,
        transition: 'all 1s',
        background: `url(${require('../assets/c.jpg').default})`,
      }}
    >
      <Row justify="center" align="center">
        <Col>
          <RouteHeader width={width} detailHandler={detailHandler} />
        </Col>
        <Col
          xs={12}
          style={{
            position: 'relative',
            height: height - 20,
            padding: 0,
          }}
        >
          {transitions((style, item, _, key) => (
            <AbsoluteBody
              height={
                isMobile ? undefined : pathname === '/land' ? height * 0.2 : 300
              }
              width={width - 32}
              minheight={pathname === '/land' ? height * 0.2 : 300}
              style={{
                marginTop: pathname === '/land' ? '10px' : undefined,
              }}
            >
              <animated.div key={key} style={style}>
                <Switch location={item}>
                  <Route exact path="/invest">
                    <ProtectedRoute
                      isMobile={isMobile}
                      height={height}
                      needLogin
                    >
                      <Investment isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path="/invest02">
                    <ProtectedRoute
                      isMobile={isMobile}
                      height={height}
                      needLogin
                    >
                      <Investment02 isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path={['/pool', '/land', '/freeze']}>
                    <Land isMobile={isMobile} />
                  </Route>
                  <Route exact path="/nft">
                    <NFT isMobile={isMobile} />
                  </Route>
                  <Route exact path="/game">
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <Game isMobile={isMobile} width={width} />
                    </ProtectedRoute>
                  </Route>
                  <Route exact path="/info">
                    <Info isMobile={isMobile} />
                  </Route>
                  <Route exact path="/swap">
                    <ProtectedRoute isMobile={isMobile} height={height}>
                      <Swap isMobile={isMobile} />
                    </ProtectedRoute>
                  </Route>
                  <Route path="/">
                    <Redirect to="/land" />
                  </Route>
                </Switch>
              </animated.div>
            </AbsoluteBody>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state: AppState) => {
  const { active } = state.wallet
  const { address } = state.account
  const { totalSupply } = state.bank
  return {
    active,
    address,
    totalSupply,
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  init: bindActionCreators(initialization, dispatch),
  tokenPrices: bindActionCreators(tokenPrices, dispatch),
  poolInformation: bindActionCreators(poolInformation, dispatch),
  landInformation: bindActionCreators(landInformation, dispatch),
  stockInformation: bindActionCreators(stockInformation, dispatch),
  invest02Information: bindActionCreators(invest02Information, dispatch),
  accountTokenBalances: bindActionCreators(accountTokenBalances, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
