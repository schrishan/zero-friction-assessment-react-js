import { Form, FormInstance, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetOrganizationConfig } from "../../store/slices/organizationConfigSlice";
import { RootState } from "../../store/store";
import ConfigBody from "./config-body/ConfigBody";
import css from "./organisation-configuration.module.css";
import TopSection from "./top-section/TopSection";

const OrganisationConfiguration = () => {
  const [orgConfigForm] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  const dispatch = useDispatch();

  const headerStyle: React.CSSProperties = {
    height: 'auto',
  };

  const [formStatus, setFormStatus] = useState({
    isTouched: false,
    isInvalid: false,
    isValuesEmpty:true
  });
  const handleFormChange = (allValues: any) => {
    setFormStatus((prevData) => ({
      ...prevData,
      isTouched: allValues.some(
        (obj: { touched: boolean | any[] }) => obj.touched
      ),
      isInvalid: allValues.some(
        (obj: { errors: string | any[] }) => obj.errors.length > 0
      )
    }));
  };

  const onSave = () => {
  formRef.current
  ?.validateFields()
  .then(() => {
    formRef.current?.resetFields();
    setFormStatus((prevData) => ({
      ...prevData,
      isTouched: false,
      isInvalid: false,
      isValuesEmpty:false
    }));
    dispatch(resetOrganizationConfig);
    setTimeout(() => {
      setFormStatus((prevData) => ({
        ...prevData, isValuesEmpty:true
      }));
    }, 1000);
  })
  .catch(() => {
    setFormStatus((prevData) => ({
      ...prevData,
      isTouched: true,
      isInvalid: true,
      isValuesEmpty:true
    }));
  });

  };

  const onReset = () => {
    formRef.current?.resetFields();
    setFormStatus((prevData) => ({
      ...prevData,
      isTouched: false,
      isInvalid: false,
      isValuesEmpty:true
    }));
    dispatch(resetOrganizationConfig)
  };

  const organizationConfig = useSelector(
    (state: RootState) => state.organizationConfig.data
  );
 
  const initialValues = {
    ...organizationConfig.organizationDetail,
    ...organizationConfig.contactDetails,
    ...organizationConfig.address
  };

  return (
    <Layout className={css["layout"]}>
      <Form
        initialValues={initialValues}
        form={orgConfigForm}
        ref={formRef}
        layout="vertical"
        onFieldsChange={handleFormChange}
      >
        <Header className={css["header"]} style={headerStyle}>
          <TopSection
            onCancelClick={onReset}
            onSaveClick={onSave}
            formStatus={formStatus}
          />
        </Header>
        <Content className={css["content"]}>
          <ConfigBody />
        </Content>
      </Form>
    </Layout>
  );
};

export default OrganisationConfiguration;
