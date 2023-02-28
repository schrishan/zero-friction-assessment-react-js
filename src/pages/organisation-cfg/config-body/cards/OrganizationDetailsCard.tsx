import { Card, Checkbox, Form, Input } from "antd";
import { RuleObject } from "antd/es/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrganizationDetailType } from "../../../../types/organisation-config";
import { updateOrganizationDetails } from "../../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../../store/store";

const OrganizationDetailsCard = () => {
  const [migrationMode, setMigrationMode] = useState(false);

  const onMigrationModeChange = async (e: any) => {
    handleOrganizationDetailsChange({
      ...organizationDetail,
      migrationMode: e.target.checked,
    });
    await setMigrationMode(e.target.checked);
  };

  const migrationModeValidation = (rule: RuleObject, value: any) => {
    return new Promise<void>((resolve, reject) => {
      if (migrationMode) {
        resolve();
      } else {
        reject("Please select migration mode");
      }
    });
  };

  const dispatch = useDispatch();
  const organizationDetail = useSelector(
    (state: RootState) => state.organizationConfig.data.organizationDetail
  );

  const handleOrganizationDetailsChange = (
    organizationDetail: OrganizationDetailType
  ) => {
    dispatch(updateOrganizationDetails(organizationDetail));
  };

  return (
    <Card title="Organization Details" bodyStyle={{ textAlign: "left" }}>
      <Form.Item
        name="migrationMode"
        valuePropName="checked"
        rules={[{ required: true }, { validator: migrationModeValidation }]}
      >
        <Checkbox checked={migrationMode} onChange={onMigrationModeChange}>
          Migration mode
        </Checkbox>
      </Form.Item>

      <Form.Item
        label="Code"
        name="code"
        rules={[
          {
            required: true,
            message: "Please input your code",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleOrganizationDetailsChange({
              ...organizationDetail,
              code: event.target.value,
            })
          }
          value={organizationDetail.code}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input description",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleOrganizationDetailsChange({
              ...organizationDetail,
              description: event.target.value,
            })
          }
          value={organizationDetail.description}
        />
      </Form.Item>

      <Form.Item
        label="Bank account"
        name="bankAccount"
        rules={[
          {
            required: true,
            message: "Please input bank account",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleOrganizationDetailsChange({
              ...organizationDetail,
              bankAccount: event.target.value,
            })
          }
          value={organizationDetail.bankAccount}
        />
      </Form.Item>

      <Form.Item
        label="Vat account number"
        name="vatAccountNumber"
        rules={[
          {
            required: true,
            message: "Please input vat account number",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleOrganizationDetailsChange({
              ...organizationDetail,
              vatAccountNumber: event.target.value,
            })
          }
          value={organizationDetail.vatAccountNumber}
        />
      </Form.Item>

      <Form.Item
        label="Company account number"
        name="companyAccountNumber"
        rules={[
          {
            required: true,
            message: "Please input company account number",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleOrganizationDetailsChange({
              ...organizationDetail,
              companyAccountNumber: event.target.value,
            })
          }
          value={organizationDetail.companyAccountNumber}
        />
      </Form.Item>
    </Card>
  );
};

export default OrganizationDetailsCard;
