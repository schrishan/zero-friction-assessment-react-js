import { Card, Form, Input, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddressType } from "../../../../types/organisation-config";
import { updateAddress } from "../../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../../store/store";

const AddressCard = () => {
  const dispatch = useDispatch();
  const address = useSelector(
    (state: RootState) => state.organizationConfig.data.address
  );
  const handleAddressChange = (address: AddressType) => {
    dispatch(updateAddress(address));
  };

  return (
    <Card title="Address" bodyStyle={{ textAlign: "left" }}>
      <Form.Item
        label="Street name"
        name="streetName"
        rules={[
          {
            required: true,
            message: "Please input street name",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleAddressChange({
              ...address,
              streetName: event.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item
        label="Street number"
        name="streetNumber"
        rules={[
          {
            type: 'number',
            required: true,
            message: "Please input street number",
          },
        ]}
      >
        <InputNumber
          onChange={(event:any) => {
            handleAddressChange({
              ...address,
              streetNumber: event,
            });
          }}
          style={{width:'100%'}}
        />
      </Form.Item>

      <Form.Item
        label="Postal code"
        name="postalCode"
        rules={[
          { type: 'number', required: true, message: "Please input postal code" },
        ]}
      >
        <InputNumber
          onChange={(event:any) => {
            handleAddressChange({
              ...address,
              postalCode: event,
            });
          }}
          style={{width:'100%'}}
        />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Please input city",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleAddressChange({
              ...address,
              city: event.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[
          {
            required: true,
            message: "Please input country",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleAddressChange({
              ...address,
              country: event.target.value,
            })
          }
        />
      </Form.Item>
    </Card>
  );
};

export default AddressCard;
