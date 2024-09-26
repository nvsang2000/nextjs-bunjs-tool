"use client";

import { Button, Card, Col, Form, Input, Popconfirm, Row, Select, Space, message } from "antd";
import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { FormProps } from "@/interfaces";


export default function ToolAirdropForm({
  initialValues = {},
  id,
  onSubmit = () => {},
  onRemove = () => {},
  loading = false,
}: FormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(initialValues)?.length > 0) {
      form.resetFields();
    }
  }, [form, initialValues]);

  return (
    <div>
      <div className="text-[20px] font-semibold mb-[20px]">
        Running tool okx
      </div>
      <Form
        layout={"vertical"}
        colon={false}
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          label={<div className="text-[18px] font-medium">Select Tool</div>}
          name={"nameTool"}
        >
          <Select
            size="large"
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            options={[
              {
                value: "TOOL_OKX",
                label: "Tool airdrop OKX",
              },
              {
                value: "TOOL_MOON_BIX",
                label: "Tool airdrop Moon Bix",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<div className="text-[18px] font-medium">{'Proxy IP (Pending)'}</div>}
        >
          {/* <Form.List name={"proxy"}>
            {(subFields, subOpt) => (
              <div>
                {subFields.map((subField) => (
                  <Row gutter={40} key={subField.key}>
                    <Col xs={22} md={22} xl={22}>
                      <Form.Item name={[subField.name]}>
                        <Input
                          size="large"
                          disabled
                          placeholder="http://username:password@ip:port"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={2} md={24} xl={2}>
                      <Button
                        danger
                        size="large"
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                        icon={<CloseOutlined />}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  onClick={() => subOpt.add()}
                  block
                >
                  ADD PROXY IP
                </Button>
              </div>
            )}
          </Form.List> */}
        </Form.Item>

        <Form.Item
          label={<div className="text-[18px] font-medium">Request ID</div>}
        >
          <Form.List name={"requestId"}>
            {(subFields, subOpt) => (
              <div>
                {subFields.map((subField) => (
                  <Row gutter={40} key={subField.key}>
                    <Col xs={22} md={22} xl={22}>
                      <Form.Item name={[subField.name]}>
                        <Input size="large" placeholder="query_id=*****" />
                      </Form.Item>
                    </Col>
                    <Col xs={2} md={24} xl={2}>
                      <Button
                        danger
                        size="large"
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                        icon={<CloseOutlined />}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  onClick={() => subOpt.add()}
                  block
                >
                  ADD RQUEST ID
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Row gutter={40} className={'py-[40px] pl-[20px]'}>
        <Space align="center">
          {id && (
            <Popconfirm
              title={'Are you sure you want to delete ?'}
              onConfirm={() => id && onRemove(id)}
            >
              <Button loading={loading} type={'primary'} danger>
                Delete
              </Button>
            </Popconfirm>
          )}
          <Button loading={loading} type={'primary'} htmlType={'submit'}>
            {!id ? 'Open Job' : 'Re-Open Job'}
          </Button>
        </Space>
      </Row>
      </Form>
    </div>
  );
}
