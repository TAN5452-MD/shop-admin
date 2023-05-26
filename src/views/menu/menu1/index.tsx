import { Space, Table, Tag, Button, Modal, Pagination, message, PaginationProps } from 'antd';
import { Form, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGoods, addPolicy, deletePolicy, publishGoods, selectGoodsInfo, selectPolicy, updatePolicy } from '@/api/myapi/index'
import { getToken2 } from "@/utils/token";
const { Search } = Input;
const Menu1 = () => {

	const { TextArea } = Input;


	interface DataType {
		content: string
		id: string
		pageNo: number
		pageSize: number
		title: string
	}

	interface Policy {
		content: string
		id: string
		pageNo: number
		pageSize: number
		title: string
	}
	const columns: ColumnsType<DataType> = [
		{
			title: '政策名称',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: '详情',
			dataIndex: 'content',
			key: 'content',
			render: text => <span>{strIntercept(text)}</span>
		},
		{
			title: '操作',
			dataIndex: 'publishStatus',
			key: 'action',
			render: (status, record) => (
				<Space size="middle">
					<Button type="primary" onClick={() => { setInfoOpen(true), setPolicyInfo(record) }}>详情</Button>
					<Button onClick={() => {
						showEdit(record)
					}}>编辑</Button>
					<Button danger onClick={() => { deletePolicyList(record) }}>删除</Button>
				</Space>
			),
		},
	]
	type Page = {
		pageNo: number,
		pageSize: number,
		total: number,
	}



	//state
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [infolOpen, setInfoOpen] = useState<boolean>(false);
	const [policyList, setPolicyList] = useState<Policy[]>([])
	const [policyInfo, setPolicyInfo] = useState<Policy>()
	const [page, setPage] = useState<Page>({
		pageNo: 1,
		pageSize: 10,
		total: 0,
	})
	const [search, setSearch] = useState<string>('')
	const [editOpen, setEditOpen] = useState<boolean>(false)
	const form = useRef(null)
	const editForm = useRef(null)
	// 表格分页属性
	const pageChange: PaginationProps['onChange'] = (cur: number, size: number) => {
		setPage({ ...page, pageNo: cur, pageSize: size })
		//getGoods()
	}
	// 表格分页属性
	const paginationProps = {
		showSizeChanger: true,
		showQuickJumper: false,
		showTotal: () => `共${page.total}条`,
		pageSize: page.pageSize,
		current: page.pageNo,
		total: page.total,
		onChange: pageChange
	}
    const onSearch = (value: string) => {
				setSearch(value)
    }
	//methods
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const addShop = () => {
		setIsModalOpen(true)
	}
	const strIntercept = (str: string) => {
		return str.length <= 20 ? str : str.slice(0, 20) + '...'
	}
	//获取政策列表
	const accessPolicy = async () => {
		const data = {
			title: search,
			...page
		}
		const result = await selectPolicy(data)
		if (result.code === 0) {
			setPolicyList(result.data.data)
			setPage({ ...page, total: result.data.recordsTotal })
		}
	}
	const add = async () => {
		const a: any = form.current
		const data = a.getFieldValue()
		const result = await addPolicy(data)
		if (result.code === 0) {
			message.success('添加成功')
			accessPolicy()
		} else {
			message.success('添加失败')
		}
		handleCancel()
	}
	const deletePolicyList = async (row: Policy) => {
		const result = await deletePolicy(row.id)
		if (result.code === 0) {
			message.success('删除成功')
			accessPolicy()
		} else {
			message.success('删除失败')
		}
	}
	const showEdit = (record: Policy) => {
		setEditOpen(true)
		setTimeout(() => {
			const form: any = editForm.current
			form.setFieldsValue(record)
		}, 100);
	}
	const saveEdit = async () => {
		const a: any = editForm.current
		const data = a.getFieldValue()
		const result = await updatePolicy(data)
		if (result.code === 0) {
			message.success('修改成功')
			accessPolicy()
		} else {
			message.success('修改失败')
		}
		setEditOpen(false)
	}
	useEffect(() => {
		accessPolicy()
	}, [page.pageNo, page.pageSize])

	useEffect(() => {
		accessPolicy()
	},[search])

	return (
		<div>
			<Modal title="添加政策" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} >
				<Form
					name="basic"
					autoComplete="off"
					ref={form}
					onFinish={add}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}>
					<Form.Item
						label="政策名称"
						name="title"
						rules={[{ required: true, message: '请输入政策名称!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="政策内容"
						name="content"
						rules={[{ required: true, message: '请输入政策内容!' }]}
					>
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }} name="action">
						<Button style={{ marginLeft: '45%' }} type="primary" htmlType="submit">
							添加政策
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title="编辑政策" open={editOpen} footer={null} onOk={() => setEditOpen(false)} onCancel={() => setEditOpen(false)}  >
				<Form
					ref={editForm}
					labelCol={{ span: 8 }}
					onFinish={saveEdit}
					wrapperCol={{ span: 12 }}>
					<Form.Item
						label="政策名称"
						name="title"
						rules={[{ required: true, message: '请输入政策名称!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="政策内容"
						name="content"
						rules={[{ required: true, message: '请输入政策内容!' }]}
					>
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }} name="action">
						<Button style={{ marginLeft: '45%' }} type="primary" htmlType="submit">
							保存
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title="政策详情" open={infolOpen} footer={null} onOk={() => setInfoOpen(false)} onCancel={() => setInfoOpen(false)} >
				<Form
					name="basic"
					autoComplete="off"
					ref={form}
					onFinish={add}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}>
					<Form.Item
						label="政策名称"
					>
						<span>{policyInfo?.title}</span>
					</Form.Item>
					<Form.Item
						label="政策内容"
					>
						<span>{policyInfo?.content}</span>
					</Form.Item>
				</Form>
			</Modal>

			<Button type="primary" onClick={addShop}>添加政策</Button>
      <div className='w-70 float-right'>
			<Search
					placeholder="请输入政策名称"
					allowClear
					enterButton="Search"
					onSearch={onSearch}
			/>
			</div>
			<br />
			<br />
			<Table pagination={paginationProps} columns={columns} dataSource={policyList} rowKey={(record) => record.id}></Table>
		</div>
	)
};

export default Menu1;
