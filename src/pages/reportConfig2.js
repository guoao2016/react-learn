import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, Input, Radio, Pagination, Row, Col, Select, Divider, Modal, Tag, message, Card, DatePicker, Form } from 'antd';

import _ from 'lodash';

const TextArea = Input.TextArea;
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

let uuid = 0;

class DashBoard extends Component {

    myFormItems;
    constructor(props) {
        super(props);
    };

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();  //获取界面提交的所有内容
        let userInfoTrans = {};
        let query_fields = [];
        let report_schema = [];
        _.map(userInfo, (val, index)=> {
            // console.log(index);
            // console.log(val);
            if(index.includes('report_schema')){
                report_schema.push(val);
            } else if(index.includes('query_fields')){
                query_fields.push(val)
            }else if(index == 'keys'){
               console.log('keys');
            }else{
                userInfoTrans[index] = val;
            }
        })

        userInfoTrans['report_schema'] = report_schema;
        userInfoTrans['query_fields'] = query_fields;
        console.log(report_schema);
        console.log(query_fields);
        console.log(userInfoTrans);

       
        console.log(JSON.stringify(userInfo));
        // this.props.postConfig(userInfo)  //调用action中的postConfig方法

    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg: imageUrl,
                loading: false,
            }));
        }
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }


        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份 
                "d+": this.getDate(),                    //日 
                "h+": this.getHours(),                   //小时 
                "m+": this.getMinutes(),                 //分 
                "s+": this.getSeconds(),                 //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds()             //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        var td = new Date().format("yyyy-MM-dd");
        var nowDate = td.toString()


        //------------------------report_schema && query_fields--------------
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem required={true} label="report_schema" {...formItemLayout} key={index}>
                    <Col span={9}>
                        <FormItem>
                            {
                                getFieldDecorator(`report_schema${index}`, {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_schema不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_schema" />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            query_fields
                        </span>
                    </Col>
                    <Col span={9}>
                        <FormItem>
                            {
                                getFieldDecorator(`query_fields${index}`, {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'query_fields不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入query_fields" />
                                )
                            }
                        </FormItem>
                    </Col>

                    <Col xs={{ span: 3 }} sm={{ span: 3 }}>
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.remove(k)}
                        />
                    </Col>
                </FormItem>
            );
        });

        return (
            <div>
                <Card title="report_config">
                    <Form layout="horizontal">

                        <FormItem required={true} label="report_schema" {...formItemLayout}>
                            <Col span={9}>
                                <FormItem>
                                    {
                                        getFieldDecorator('report_schema', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'report_schema不能为空'
                                                }
                                            ]
                                        })(
                                            <Input placeholder="请输入report_schema" />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={3}>
                                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                                    query_fields:
                                </span>
                            </Col>
                            <Col span={9}>
                                <FormItem>
                                    {
                                        getFieldDecorator('query_fields', {
                                            initialValue: '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'query_fields不能为空'
                                                }
                                            ]
                                        })(
                                            <Input placeholder="请输入query_fields" />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={this.add}>添加</Button>
                            </Col>
                        </FormItem>
                        {
                            formItems
                        }


                        <FormItem label="row_id" {...formItemLayout}>
                            {
                                getFieldDecorator('report_id', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_id不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_id" />
                                )
                            }
                        </FormItem>
                        <FormItem label="report_name" {...formItemLayout}>
                            {
                                getFieldDecorator('report_name', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_name不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_name" />
                                )
                            }
                        </FormItem>


                        {/* <FormItem label="report_schema" {...formItemLayout}>
                            {
                                getFieldDecorator('report_schema', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_schema不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_schema" />
                                )
                            }
                        </FormItem>

                         <FormItem label="query_fields" {...formItemLayout}>
                            {
                                getFieldDecorator('query_fields', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'query_fields不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入query_fields" />
                                )
                            }
                        </FormItem> */}
                        <FormItem label="query_table" {...formItemLayout}>
                            {
                                getFieldDecorator('query_table', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'query_table不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入query_table" />
                                )
                            }
                        </FormItem>
                        <FormItem label="topic_id" {...formItemLayout}>
                            {
                                getFieldDecorator('topic_id', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'topic_id不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入topic_id" />
                                )
                            }
                        </FormItem>
                        <FormItem label="topic_name" {...formItemLayout}>
                            {
                                getFieldDecorator('topic_name', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'topic_name不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入topic_name" />
                                )
                            }
                        </FormItem>
                        {/* <FormItem label="report_description" {...formItemLayout}>
                            {
                                getFieldDecorator('report_description', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_description不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_description" />
                                )
                            }
                        </FormItem> */}


                        <FormItem label="order_fields" {...formItemLayout}>
                            {
                                getFieldDecorator('order_fields', {
                                    initialValue: 'ds',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'order_fields不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入order_fields" />
                                )
                            }
                        </FormItem>
                        <FormItem label="query_db" {...formItemLayout}>
                            {
                                getFieldDecorator('query_db', {
                                    initialValue: 'bdctdb',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'query_db不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入query_db" />
                                )
                            }
                        </FormItem>

                        <FormItem label="report_group_name" {...formItemLayout}>
                            {
                                getFieldDecorator('report_group_name', {
                                    initialValue: '报表',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_group_name不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_group_name" />
                                )
                            }
                        </FormItem>
                        <FormItem label="report_period" {...formItemLayout}>
                            {
                                getFieldDecorator('report_period', {
                                    initialValue: 'D',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_period不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_period" />
                                )
                            }
                        </FormItem>
                        <FormItem label="report_type" {...formItemLayout}>
                            {
                                getFieldDecorator('report_type', {
                                    initialValue: 'T',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_type不能为空'
                                        }
                                    ]
                                })(
                                    <Select>
                                        <Option value="F">F</Option>
                                        <Option value="A">A</Option>
                                        <Option value="T">T</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="report_group_code" {...formItemLayout}>
                            {
                                getFieldDecorator('report_group_code', {
                                    initialValue: 'BA',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_group_code不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_group_code" />
                                )
                            }
                        </FormItem>
                        <FormItem label="create_sql" {...formItemLayout}>
                            {
                                getFieldDecorator('create_sql', {
                                    initialValue: '',
                                })(
                                    <Input placeholder="请输入create_sql,可以为空" />
                                )
                            }
                        </FormItem>
                        <FormItem label="range_selector" {...formItemLayout}>
                            {
                                getFieldDecorator('range_selector', {
                                    initialValue: "['TW']",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'range_selector不能为空'
                                        }
                                    ]
                                })(
                                    <Select>
                                        <Option value="['SD']">['SD']</Option>
                                        <Option value="['D']">['D']</Option>
                                        <Option value="['TW']">['TW']</Option>
                                        <Option value="['W']">['W']</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="export_enabled" {...formItemLayout}>
                            {
                                getFieldDecorator('export_enabled', {
                                    initialValue: 'true',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'export_enabled不能为空'
                                        }
                                    ]
                                })(
                                    <Select>
                                        <Option value="true">true</Option>
                                        <Option value="false">false</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="export_file_type" {...formItemLayout}>
                            {
                                getFieldDecorator('export_file_type', {
                                    initialValue: 'csv',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'export_file_type不能为空'
                                        }
                                    ]
                                })(
                                    <Select>
                                        <Option value="csv">csv</Option>
                                        <Option value="xls">xls</Option>
                                        <Option value="pdf">pdf</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="order_in_topic" {...formItemLayout}>
                            {
                                getFieldDecorator('order_in_topic', {
                                    initialValue: '1',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'order_in_topic不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入order_in_topic" />
                                )
                            }
                        </FormItem>
                        <FormItem label="sum_fields" {...formItemLayout}>
                            {
                                getFieldDecorator('sum_fields', {
                                    initialValue: '[]',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'sum_fields不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入sum_fields" />
                                )
                            }
                        </FormItem>
                        <FormItem label="creator" {...formItemLayout}>
                            {
                                getFieldDecorator('creator', {
                                    initialValue: 'feiyuyang',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'creator不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入creator" />
                                )
                            }
                        </FormItem>
                        <FormItem label="create_date" {...formItemLayout}>
                            {
                                getFieldDecorator('create_date', {
                                    initialValue: nowDate,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'create_date不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入create_date" />
                                )
                            }
                        </FormItem>
                        <FormItem label="update_date" {...formItemLayout}>
                            {
                                getFieldDecorator('update_date', {
                                    initialValue: nowDate,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'update_date不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入update_date" />
                                )
                            }
                        </FormItem>
                        <FormItem label="report_comment" {...formItemLayout}>
                            {
                                getFieldDecorator('report_comment', {
                                    initialValue: '[]',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'report_comment不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入report_comment" />
                                )
                            }
                        </FormItem>
                        <FormItem label="other_settings" {...formItemLayout}>
                            {
                                getFieldDecorator('other_settings', {
                                    initialValue: "{'fixEnable':true}",
                                    rules: [
                                        {
                                            required: true,
                                            message: 'other_settings不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入other_settings" />
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(DashBoard);