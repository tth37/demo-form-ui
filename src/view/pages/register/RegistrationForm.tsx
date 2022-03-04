import React, { useState } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { observer } from "mobx-react-lite";
import { CreateUserDtoWithConfirm } from "../../../common/schema/user";
import { mergeObject } from "../../../common/utils/merge";
import {
  CreateUserDtoWithConfirmErrors,
  userService,
} from "../../../controller/user";
import { NavLink, useNavigate } from "react-router-dom";
import Notice from "../notice/Notice";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

let RegistrationForm = () => {
  const [formData, setFormData] = useState<CreateUserDtoWithConfirm>({
    name: "",
    password: "",
    email: "",
    confirm: "",
    tags: ["dd"],
  });

  const [formErrors, setFormErrors] = useState<CreateUserDtoWithConfirmErrors>(
    {}
  );

  const HandleFormDataSubmit = async () => {
    console.log(formData);
    const res = await userService.createUser(formData);
    if (res.status === "rejected") {
      setFormErrors(res.errors);
    } else {
      alert("注册成功");
      setTimeout(() => {
        window.location.replace("/Homepage");
      }, 1000);
    }
  };

  const [form] = Form.useForm();

  const onValuesChange = (e: any) => {
    //let a=Object.getOwnPropertyNames(values)[0];
    setFormData(
      mergeObject(
        formData,
        Object.getOwnPropertyNames(e)[0],
        String(Object.values(e)[0])
      )
    );
  };

  return (
    <div id="container">
      <Form
        {...formItemLayout}
        form={form}
        layout={"horizontal"}
        name="register"
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          help={!!formErrors.email ? formErrors.email[0] : null}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          help={!!formErrors.password ? formErrors.password[0] : null}
          rules={[
            {
              required: true,
              message: true ? "password wrong" : "",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          help={!!formErrors.name ? formErrors.name[0] : null}
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the
            <Notice />
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={HandleFormDataSubmit}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

RegistrationForm = observer(RegistrationForm);
export default RegistrationForm;
