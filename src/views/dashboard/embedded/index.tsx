import "./index.less";
import { Space, Table, Tag, Button, Modal, Pagination, message, PaginationProps } from 'antd';
import { Form, Input, Upload, Select } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGoods, deleteGoods, publishGoods, selectAllGoodsBrand, selectAllGoodsCategory, selectGoodsInfo } from '@/api/myapi/index'
import { getToken2 } from "@/utils/token";
const Embedded = () => {
	const navigate = useNavigate()
	const props: UploadProps = {
		name: 'files',
		action: 'http://43.139.230.109:9000/audit/project/attach/uploadFile',
		headers: {
			'auth-token': getToken2() as string,
		},
		multiple: true,
		accept: '.jpg,.png,.jpeg,.gif',
		maxCount: 5
	}
	const { TextArea } = Input;

	interface DataType {
		brandId: string
		catalogId: string
		createTime: any
		goodsId: string
		number: number
		price: number
		publishStatus: string
		spuDescription: string
		spuImgName: string
		spuImgUrl: string
		spuName: string
		updateTime: any
		weight: any
		address?: string
	}

	interface Goods {
		brandId: string
		catalogId: string
		createTime: any
		goodsId: string
		number: number
		price: number
		publishStatus: string
		spuDescription: string
		spuImgName: string
		spuImgUrl: string
		spuName: string
		updateTime: any
		weight: any
		address?: string
	}
	const columns: ColumnsType<DataType> = [
		{
			title: '名称',
			dataIndex: 'spuName',
			key: 'spuName'
		},
		{
			title: '品牌',
			dataIndex: 'brandName',
			key: 'brandName'
		},
		{
			title: '分类',
			dataIndex: 'catalogName',
			key: 'catalogName'
		},

		{
			title: '数量',
			dataIndex: 'number',
			key: 'number'
		},
		{
			title: '价格(¥)',
			dataIndex: 'price',
			key: 'price'
		},
		{
			title: '商品描述',
			dataIndex: 'spuDescription',
			key: 'spuDescription'
		},
		{
			title: '商品图片',
			dataIndex: 'spuImgUrl',
			key: 'spuImgUrl',
			render: src => <img style={{ height: '50px', width: '50px', objectFit: 'cover' }} src={`http://43.139.230.109:9002/img/${src.split("/").at(-1)}`} alt="未上传" />
		},
		{
			title: '状态',
			dataIndex: 'publishStatus',
			key: 'publishStatus',
			render: (status, record) => (
				<>
					{status === '' || status === '0' ?
						<a style={{ color: 'red' }}>已下架</a> :
						<a>已上架</a>
					}
				</>
			)
		},
		{
			title: '操作',
			dataIndex: 'publishStatus',
			key: 'action',
			render: (status, record) => (
				<>
					<Space size="middle">
						{status === '' || status === '0' ?
							<Button type="primary" onClick={() => upperAndLowerShelves(record)}>上架</Button> :
							<Button type="primary" onClick={() => upperAndLowerShelves(record)}>下架</Button>
						}
						<Button onClick={() => editShop(record)}>编辑</Button>
						<Button onClick={() => { deleteShop(record) }} danger>删除</Button>
					</Space>
				</>
			),
		},
	]
	type Page = {
		pageNo: number,
		pageSize: number,
		total: number,
	}



	//state
	const [imageList, setImageList] = useState<any[]>([])
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [goodsList, setGoodsList] = useState<Goods[]>([])
	const [page, setPage] = useState<Page>({
		pageNo: 1,
		pageSize: 10,
		total: 0,
	})
	const [categorySelect, setCategorySelect] = useState([])
	const [brandSelect, setBrandSelect] = useState<any>([])
	const form = useRef(null)
	const editForm = useRef(null)
	const [editOpen, setEditOpen] = useState<boolean>(false)
	let curFileUrl: string[] = []

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

	//methods	
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const addShop = () => {
		setIsModalOpen(true),
			(form.current as any).resetFields()
	}
	//添加商品
	const add = async (e: any) => {
		//通过此方法可以拿到表单中的值
		const a: any = form.current
		const data = a.getFieldValue()
		data.projectAttachList = curFileUrl
		try {
			brandSelect.forEach((element: any) => {
				if (element.brandId === data.brandId) {
					data.brandName = element.name
				}
			});
		} catch (err) {
			console.log(err);
		}
		try {
			categorySelect.forEach((element: any) => {
				if (element.catId === data.catalogId) {
					data.catalogName = element.name
				}
			});
		} catch (err) {
			console.log(err);
		}
		const result = await addGoods(data)
		if (result.code === 0) {
			message.success('添加成功');
			getGoods()
		} else {
			message.error('添加失败');
		}
		setIsModalOpen(false)
	}
	//编辑
	const edit = async () => {
		const a: any = editForm.current
		const data = a.getFieldValue()
		data.projectAttachList = curFileUrl
		try {
			brandSelect.forEach((element: any) => {
				if (element.brandId === data.brandId) {
					data.brandName = element.name
				}
			});
		} catch (err) {
			console.log(err);
		}
		try {
			categorySelect.forEach((element: any) => {
				if (element.catId === data.catalogId) {
					data.catalogName = element.name
				}
			});
		} catch (err) {
			console.log(err);
		}
		const result = await publishGoods(data)
		if (result.code === 0) {
			message.success('保存成功')
		} else {
			message.error('保存失败')
		}
		setEditOpen(false)
		getGoods()
	}
	//获取商品列表
	const getGoods = async () => {
		const result = await selectGoodsInfo(page)
		setGoodsList(result.data.data)
		setPage({ ...page, total: Number(result.data.recordsTotal) })
	}
	//处理url带入参数中
	const addFileUrl = (file: any) => {
		setCurInfo(null)
		if (file.file.status === 'done') {
			curFileUrl.push(file.file.response.data[0])
		}

	}

	//商品上下架
	const upperAndLowerShelves = async (row: any) => {
		console.log(1);

		const data = {
			goodsId: row.goodsId,
			publishStatus: row.publishStatus
		}
		if (row.publishStatus === '0' || row.publishStatus === '') {
			data.publishStatus = '1'
		} else {
			data.publishStatus = '0'
		}
		const result = await publishGoods(data)
		if (result.code === 0) {
			message.success('更新成功')
		} else {
			message.success('更新失败')
		}
		getGoods()
	}
	//商品分类查询
	const queryCategory = async () => {
		const result = await selectAllGoodsCategory({
			pageNo: '-1',
			pageSize: '-1',
		})
		if (result.code === 0) {
			setCategorySelect(result.data.data)
		}
	}
	//品牌分类查询
	const queryBrand = async () => {
		const result = await selectAllGoodsBrand()
		if (result.code === 0) {
			setBrandSelect(result.data)
		}
	}
	const [curInfo, setCurInfo] = useState<any>()
	const editShop = async (row: any) => {
		setCurInfo(row)
		setEditOpen(true)
		setTimeout(() => {
			const form: any = editForm.current
			form.setFieldsValue(row)
		}, 100);
	}
	const deleteShop = async (row: any) => {
		const result = await deleteGoods(row.goodsId)
		if (result.code === 0) {
			message.success('删除成功')
			getGoods()
		}
	}

	useEffect(() => {
		getGoods()
	}, [page.pageNo, page.pageSize])

	useEffect(() => {
		queryCategory()
		queryBrand()
	}, [])

	return (
		<div>
			<Modal title="添加商品" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} >
				<Form
					name="basic"
					autoComplete="off"
					ref={form}
					onFinish={add}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}>
					<Form.Item
						label="商品名"
						name="spuName"
						rules={[{ required: true, message: '请输入商品名称!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="商品描述"
						name="spuDescription"
					>
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item
						label="产地"
						name="address"
						rules={[{ required: true, message: '请输入产地!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="品牌"
						name="brandId"
						rules={[{ required: true, message: '请输入品牌!' }]}
					>
						<Select
							style={{ width: 120 }}
						>
							{brandSelect.map((item: any) => {
								return (
									<option key={item.brandId} value={item.brandId}>{item.name}</option>
								)
							})}
						</Select>
					</Form.Item>
					<Form.Item
						label="类别"
						name="catalogId"
						rules={[{ required: true, message: '请输入商品类别!' }]}
					>
						<Select
							style={{ width: 120 }}>
							{categorySelect.map((item: any) => {
								return (
									<option key={item.catId} value={item.catId} >{item.name}</option>
								)
							})}
						</Select>
					</Form.Item>
					<Form.Item
						label="商品价格"
						name="price"
						rules={[{ required: true, message: '请输入商品价格!' }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						label="数量"
						name="number"
						rules={[{ required: true, message: '请输入商品数量!' }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						label="商品图片"
						name="picture"
					>
						{imageList.length === 0 ? '' : imageList.map(item => {
							return (
								<img src={'http://43.139.230.109:9002/img/' + item.attrchUrl} alt="" />
							)
						})}
						<Upload onChange={addFileUrl} {...props}>
							<Button icon={<UploadOutlined />}>上传图片</Button>
						</Upload>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button style={{ marginLeft: '45%' }} type="primary" htmlType="submit">
							添加商品
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal title="编辑商品" open={editOpen} footer={null} onOk={() => { setEditOpen(false) }} onCancel={() => { setEditOpen(false) }} >
				<Form
					autoComplete="off"
					ref={editForm}
					onFinish={edit}
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}>
					<Form.Item
						label="商品名"
						name="spuName"
						rules={[{ required: true, message: '请输入商品名称!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="商品描述"
						name="spuDescription"
					>
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item
						label="产地"
						name="address"
						rules={[{ required: true, message: '请输入产地!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="品牌"
						name="brandId"
						rules={[{ required: true, message: '请输入品牌!' }]}
					>
						<Select
							style={{ width: 120 }}>
							{brandSelect.map((item: any) => {
								return (
									<option key={item.brandId} value={item.brandId} >{item.name}</option>
								)
							})}
						</Select>
					</Form.Item>
					<Form.Item
						label="类别"
						name="catalogId"
						rules={[{ required: true, message: '请输入商品类别!' }]}
					>
						<Select
							style={{ width: 120 }}>
							{categorySelect.map((item: any) =>
								<option key={item.catId} value={item.catId} >{item.name}</option>

							)}
						</Select>
					</Form.Item>
					<Form.Item
						label="商品价格"
						name="price"
						rules={[{ required: true, message: '请输入商品价格!' }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						label="数量"
						name="number"
						rules={[{ required: true, message: '请输入商品数量!' }]}
					>
						<Input type="number" />
					</Form.Item>
					<Form.Item
						label="商品图片"
						name="spuImgUrl"
					>
						{curInfo && <img
							className="w-10 h-10 border-solid border-2 border-gray-200 ma-2"
							src={`http://43.139.230.109:9002/img/${curInfo?.spuImgUrl.split("/").at(-1)}`} alt="" />
						}
						<Upload onChange={addFileUrl} {...props}>
							<Button icon={<UploadOutlined />}>上传图片</Button>
						</Upload>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button style={{ marginLeft: '45%' }} type="primary" htmlType="submit">
							保存
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Button type="primary" onClick={addShop}>添加商品</Button>
			<br />
			<br />
			<Table pagination={paginationProps} columns={columns} dataSource={goodsList} rowKey={(record) => record.goodsId}></Table>
		</div >
	)
};

export default Embedded;
