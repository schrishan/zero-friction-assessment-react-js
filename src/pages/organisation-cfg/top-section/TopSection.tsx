import { Alert, Button, Col, Form, Row, Space } from "antd";
import { FC } from "react";

interface Props {
  onCancelClick: () => void;
  onSaveClick: () => void;
  formStatus: {
    isTouched: boolean;
    isInvalid: boolean;
    isValuesEmpty: boolean;
  };
}

const TopSection: FC<Props> = ({ onCancelClick, onSaveClick, formStatus }) => {
  return (
    <Row justify="end" className="top-row">
      {formStatus.isInvalid && (
        <Col xs={24} sm={12}  className="col-alert">
          <Space direction="horizontal" align="baseline">
            <Alert
              message="Form invalid, please fill the required field"
              type="error"
            />
          </Space>
        </Col>
      )}

      {!formStatus.isValuesEmpty && (
        <Col xs={24} sm={12} className="col-alert">
          <Space direction="horizontal" align="baseline">
            <Alert
              message="The form has been successfully submitted"
              type="success"
            />
          </Space>
        </Col>
      )}

      <Col xs={24} sm={12}  className="col-btn">
        <Space direction="horizontal" align="baseline">
          {formStatus.isTouched && (
            <Form.Item>
              <Button onClick={onCancelClick} type="text">
                Cancel
              </Button>
            </Form.Item>
          )}
          <Form.Item>
            <Button
              onClick={onSaveClick}
              type="primary"
              disabled={formStatus.isInvalid || !formStatus.isTouched}
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Space>
      </Col>
    </Row>
  );
};

export default TopSection;
