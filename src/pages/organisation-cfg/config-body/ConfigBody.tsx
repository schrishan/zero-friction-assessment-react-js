import { Col,Row } from 'antd';
import {AddressCard, ContactDetailsCard, OrganizationDetailsCard} from './cards'

const ConfigBody = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <OrganizationDetailsCard />
      </Col>
      <Col span={8}>
        <AddressCard />
      </Col>
      <Col span={8}>
        <ContactDetailsCard />
      </Col>
    </Row>
  )
};

export default ConfigBody;
