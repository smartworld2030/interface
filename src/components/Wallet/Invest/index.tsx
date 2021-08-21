import Spin from 'antd/lib/spin'
import { Row, Col } from 'react-grid-system'
import WithdrawSection from './Withdraw'
import DepositSection from './Deposit'
import DetailSection from './Details'
import InvestUpdater from 'state/invest/updater'

interface InvestmentProps {
  isMobile: boolean
}

const Investment: React.FC<InvestmentProps> = ({ isMobile }) => {
  return (
    <Spin
      style={{
        textAlign: 'center',
        height: 150,
      }}
      spinning={false}
    >
      <InvestUpdater />
      <Row justify="between" style={{ height: isMobile ? 1200 : 300 }}>
        <Col md={12} lg={6}>
          <DepositSection isMobile={isMobile} />
        </Col>
        {/*
         <Col md={6} lg={3}>
          <WithdrawSection width={230} />
        </Col>
        <Col md={6} lg={3}>
          <DetailSection />
        </Col> 
      */}
      </Row>
    </Spin>
  )
}

export default Investment
