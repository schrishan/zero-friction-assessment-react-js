import { Card, Form, Input, InputNumber } from "antd";
import { RuleObject } from "antd/es/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactDetailType } from "../../../../types/organisation-config";
import { updateContactDetails } from "../../../../store/slices/organizationConfigSlice";
import { RootState } from "../../../../store/store";

const ContactDetailsCard = () => {
  const [isValidWebsite, setIsValidWebsite] = useState(true);
  const dispatch = useDispatch();
  const contactDetails = useSelector(
    (state: RootState) => state.organizationConfig.data.contactDetails
  );

  const handleContactDetailsChange = (contactDetails: ContactDetailType) => {
    dispatch(updateContactDetails(contactDetails));
  };

  const onChangeValidateURL = async (e: any) => {
    handleContactDetailsChange({
      ...contactDetails,
      website: e.target.value,
    });
    await setIsValidWebsite(urlPatternValidation(e.target.value));
  };
  const urlPatternValidation = (URL: string) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  const urlValidation = (rule: RuleObject, value: any) => {
    return new Promise<void>((resolve, reject) => {
      if (isValidWebsite) {
        resolve();
      } else {
        reject("Please input valid website");
      }
    });
  };

  return (
    <Card title="Contact Details" bodyStyle={{ textAlign: "left" }}>
      <Form.Item
        label="Email address"
        name="emailAddress"
        rules={[
          {
            type: "email",
            message: "Email address is not validated",
          },
          {
            required: true,
            message: "Please input email address",
          },
        ]}
      >
        <Input
          onChange={(event) =>
            handleContactDetailsChange({
              ...contactDetails,
              emailAddress: event.target.value,
            })
          }
          value={contactDetails.emailAddress}
        />
      </Form.Item>

      <Form.Item
        label="Telephone"
        name="telephone"
        rules={[
          {type:'number',
            required: true,
            message: "Telephone number is not validated",
          },
        ]}
      >
        <InputNumber
          minLength={10}
          maxLength={11}
          onChange={(event:any) =>
            handleContactDetailsChange({
              ...contactDetails,
              telephone: event,
            })
          }
          style={{width:'100%'}}
          value={contactDetails.telephone}
        />
      </Form.Item>

      <Form.Item
        label="Website"
        name="website"
        rules={[
          { required: true,
            message: '',
          },{ validator: urlValidation }
        ]}
      >
        <Input onChange={onChangeValidateURL} value={contactDetails.website}/>
      </Form.Item>
    </Card>
  );
};

export default ContactDetailsCard;
