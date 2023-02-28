import { Alert, Button, Form, Space } from "antd";
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
    <Space direction="horizontal">
      <Space direction="horizontal">
        {formStatus.isInvalid && (
          <Alert
            message="Form invalid, please fill the required field"
            type="error"
          />
        )}
        {!formStatus.isValuesEmpty && (
          <Alert
            message="The form has been successfully submitted"
            type="success"
          />
        )}
      </Space>
      <Space direction="horizontal">
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
    </Space>
  );
};

export default TopSection;
