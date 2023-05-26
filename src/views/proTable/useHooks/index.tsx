import { useEffect, useState, useRef } from "react";
import { message, Table, Button, Space, Modal, Input, Form } from "antd";
import { selectAllGoodsCategory } from "@/api/myapi/index";
import "./index.less";
import type { ColumnsType } from "antd/es/table";
import { addGoodsCategory, updateGoodsCategory } from "@/api/myapi/index";
import { Page } from '@/utils/util'
const UseHooks = () => {
    interface DataType {
        name: string
        brandId: string
    }

    const columns: ColumnsType<DataType> = [
        {
            title: "分类名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "操作",
            key: "action",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        编辑
                    </Button>
                    <Button type="primary" danger onClick={() => deleteCategory(record)}>
                        删除
                    </Button>
                </Space>
            )
        }
    ]
    const [page, setPage] = useState({
        pageNo: 1,
        pageSize: 10,
        total: 1
    })
    const [data, setData] = useState<DataType[]>([]);
    const [formRef] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('添加分类')
    const [isEdit, setIsEdit] = useState(false)
    const [record, setRecord] = useState<DataType>({} as DataType)
    const pagination = {
        defaultPageSize: 10,
        defaultCurrent: 1,
        total: page.total,
        current: page.page,
        pageSize: page.pageSize,
        onChange: (ipage: number) => {
            setPage({
                ...page,
                pageNo: ipage,
            })
        }
    }

    const showModal = () => {
        formRef.setFieldsValue({ name: '' })
        setTitle('添加分类')
        setIsEdit(false)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (isEdit) {
            formRef.validateFields(['name']).then(async (values: any) => {
                const data = { name: values.name, brandId: record.brandId }
                const result = await updateGoodsCategory(data)
                if (result.code === 0) {
                    message.success('编辑成功')
                    setIsModalOpen(false)
                    getType()
                }
            })
            return
        }
        formRef.validateFields(['name']).then(async (values: any) => {
            const data = { name: values.name }
            const result = await addGoodsCategory(data)
            if (result.code === 0) {
                message.success('添加成功')
                setIsModalOpen(false)
                getType()
            }
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getType = () => {
        selectAllGoodsCategory(page).then((res: any) => {
            if (res.code === 0) {
                setData(res.data.data);
                setPage({ ...page, total: res.data.recordsTotal })
            }
        });
    };

    const handleEdit = (record: DataType) => {
        setIsEdit(true)
        setTitle('编辑分类')
        setRecord(record)
        console.log(record)
        formRef.setFieldsValue({ name: record.name })
        setIsModalOpen(true)
    };
    const deleteCategory = (record: DataType) => {
        console.log(record)
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        getType();
    }, [page.pageNo, page.pageSize]);

    return (
        <div>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    form={formRef}
                    wrapperCol={{ span: 12 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="分类名称"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <div>
                <Button type="primary" onClick={showModal}>添加分类</Button>
            </div>
            <br />
            <br />
            <div>
                <Table pagination={pagination} columns={columns} dataSource={data} />
            </div>
        </div>
    );
};
export default UseHooks;
