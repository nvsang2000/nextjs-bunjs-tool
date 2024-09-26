"use client";

import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { FormLabel } from "..";
import { FormProps } from "@/interfaces";

export default function UserForm({
  id,
  loading = false,
  initialValues = {},
  onSubmit = () => {},
  onRemove = () => {},
}: FormProps) {
  const [form] = Form.useForm();
  const [displayPasswordForm, setDisplayPasswordForm] = useState(false);

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  const renderPasswordForm = () => {
    return (
      <>
        <FormLabel label={`${id ? "New" : ""} Password`} require />
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please Enter password!" }]}
        >
          <Input.Password
            size="large"
            placeholder={"Enter password"}
            autoComplete={undefined}
          />
        </Form.Item>

        {id && (
          <>
            <FormLabel label={"Confirm password"} require />
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please Enter password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Password does not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder={"Enter password"}
                autoComplete={undefined}
              />
            </Form.Item>
          </>
        )}
      </>
    );
  };

  return (
    <Form
      layout={"vertical"}
      colon={false}
      form={form}
      initialValues={initialValues}
      onFinishFailed={(e) => console.log(e)}
      onFinish={onSubmit}
    >
      <Row gutter={20}>
        <Col xs={24} lg={12}>
          <FormLabel label={"Full name"} require />
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Please enter full name!" }]}
          >
            <Input size="large" placeholder={"Enter full name"} />
          </Form.Item>

          <FormLabel label={"Phone"} require />
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter phone!" }]}
          >
            <Input
              disabled={!!(id && id !== "create")}
              size="large"
              placeholder={"Enter phone"}
            />
          </Form.Item>

          <FormLabel label={"Email"} require />
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter email!" }]}
          >
            <Input
              size="large"
              disabled={!!(id && id !== "create")}
              placeholder={"Please enter email"}
              autoComplete={undefined}
            />
            
          </Form.Item>

          <FormLabel label={"Username"} require />
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter username!" }]}
          >
            <Input
              size="large"
              disabled={!!(id && id !== "create")}
              placeholder={"Please enter username"}
              autoComplete={undefined}
            />
            
          </Form.Item>

          {((id && displayPasswordForm) || !id) && renderPasswordForm()}
          <Row>
            <Col xs={12} lg={12}>
              <div className={"flex"}>
                <div className={"mr-[20px] text-[16px] text-black"}>Status</div>
                <Form.Item
                  noStyle
                  name={"isActive"}
                  label={""}
                  valuePropName={"checked"}
                >
                  <Checkbox />
                </Form.Item>
              </div>
            </Col>
            {id && (
              <div>
                <span className={"mr-[10px] text-[16px] text-black"}>
                  Change password
                </span>
                <Checkbox
                  onClick={() => setDisplayPasswordForm(!displayPasswordForm)}
                />
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row gutter={40} className={"py-[40px] pl-[20px]"}>
        <Space align="center">
          {id && (
            <Popconfirm
              title={"Are you sure you want to delete ?"}
              onConfirm={() => id && onRemove(id)}
            >
              <Button loading={loading} type={"primary"} danger>
                Delete
              </Button>
            </Popconfirm>
          )}
          <Button loading={loading} type={"primary"} htmlType={"submit"}>
            {!id ? "Create" : "Update"}
          </Button>
        </Space>
      </Row>
    </Form>
  );
}
