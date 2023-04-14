import { useEffect, useState,useRef } from "react";
import { message ,Table, Button, Space, Modal, Input,Form } from "antd";
import { selectAllGoodsBrand } from "@/api/myapi/index";
import "./index.less";
import type { ColumnsType } from "antd/es/table";
import { addGoodsCategory ,updateGoodsCategory} from "@/api/myapi/index";
import {Page} from '@/utils/util'
const UseHooks = () => {
	interface DataType {
		name: string
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
    const [page,setPage] = useState<Page>({
            page:1,
            pageSize:10,
            total:1
        })
	const [data, setData] = useState<DataType[]>([]);
    const [formRef] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false);
    const [title,setTitle] = useState('添加分类')
    const [isEdit,setIsEdit] = useState(false)
    const pagination = {
        defaultPageSize:10,
        defaultCurrent:1,
        total:page.total,
        current:page.page,
        pageSize:page.pageSize,
        onChange:(ipage:number,pageSize:number)=>{
            setPage({
                page:ipage,
                pageSize:pageSize,
                total:page.total
            })
            }
        }

	const showModal = () => {
        setTitle('添加分类')
        setIsEdit(false)
		setIsModalOpen(true);
	};

	const handleOk = () => {
        console.log(isEdit)
        if(isEdit){
        formRef.validateFields(['name']).then( async (values: any) => {
            const data = {name:values.name}
            const result = await updateGoodsCategory(data) 
            if(result.code === 0){
            message.success('编辑成功')
            setIsModalOpen(false)
            getType()
            }
            })
        return
        }
        formRef.validateFields(['name']).then( async (values: any) => {
            const data = {name:values.name}
           const result = await addGoodsCategory(data)
           if(result.code === 0){
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
		selectAllGoodsBrand().then((res: any) => {
			if (res.code === 0) {
				setData(res.data);
			}
		});
	};

	const handleEdit = (record: DataType) => {
        setIsEdit(true)
        setTitle('编辑分类')
        formRef.setFieldsValue({name:record.name})
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
	}, [page.page,page.pageSize]);

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
