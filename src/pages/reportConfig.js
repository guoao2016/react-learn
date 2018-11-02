import React, { Component } from 'react';
import { Button, notification, Form, Input, Icon, Row, Col } from 'antd';

const FormItem = Form.Item;
let uuid = 0;
export class ReportConfig extends Component {
    constructor(props) {
        super(props);
    }
    // report_schema
    // query_fields
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        console.log(keys)
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        console.log(keys);
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <Row key = {index}>
                    <Col xs={{ span: 8 }} sm={{ span: 10 }}>
                        <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'report_schema' : ''}
                            required={false}
                            keyS={k}
                        >
                            {getFieldDecorator(`names[${k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: "Please input report_schema or delete this field.",
                                }],
                            })(
                                <Input placeholder="report_schema" style={{ width: '100%', marginRight: 8 }} />
                            )}

                        </FormItem>
                    </Col>
                    <Col xs={{ span: 8 }} sm={{ span: 10 }}>
                        <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'query_fields' : ''}
                            required={false}
                            keyQ={'10000-' + k}
                        >
                            {getFieldDecorator(`names[${'10000-' + k}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: "Please input query_fields or delete this field.",
                                }],
                            })(

                                <Input placeholder="query_fields" style={{ width: '100%', marginRight: 8 }} />
                            )}
                        </FormItem>
                    </Col>


                    <Col xs={{ span: 2 }} sm={{ span: 2 }}>
                        {keys.length > 0 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 2}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </Col>
                </Row>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedReportConfig = Form.create()(ReportConfig);
export default WrappedReportConfig;

