import "./index.less";
import { Space, Table, Tag, Button, Modal, Pagination, message, PaginationProps } from 'antd';
import { Form, Input, Upload, Select } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminSelectOrder } from '@/api/myapi/index'
import { getToken2 } from "@/utils/token";
const index = () => {
	const navigate = useNavigate()


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
	}

	interface Order {
		commentTime: any
		confirmStatus: number
		createTime: string
		deleteStatus: string
		deliveryTime: any
		id: string
		memberId: string
		memberUsername: string
		modifyTime: any
		note: string
		orderItem: any
		orderSn: string
		payType: string
		paymentTime: any
		receiveTime: any
		receiverCity: string
		receiverDetailAddress: string
		receiverName: string
		receiverPhone: string
		receiverPostCode: string
		receiverProvince: string
		receiverRegion: string
		sourceType: string
		status: string
		totalAmount: number
		useIntegration: any
	}
	const columns: ColumnsType<DataType> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '来源',
			dataIndex: 'sourceType',
			key: 'sourceType'
		},
		{
			title: '总金额',
			dataIndex: 'totalAmount',
			key: 'totalAmount'
		},
		{
			title: '支付状态',
			dataIndex: 'status',
			key: 'totalAmount',
			render(value, record, index) {
				return value === '0' ?
					<a href="" style={{ color: 'red' }}>未支付</a> :
					<a href="">已支付</a>

			},
		},

	]
	type Page = {
		pageNo: number,
		pageSize: number,
		total: number,
	}



	//state
	const [orderList, setOrderList] = useState<any[]>([])
	const [page, setPage] = useState<Page>({
		pageNo: 1,
		pageSize: 10,
		total: 0,
	})


	const pageChange: PaginationProps['onChange'] = (cur: number, size: number) => {
		setPage({ ...page, pageNo: cur, pageSize: size })
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
	const getOrder = async () => {
		const result = await adminSelectOrder(page)
		if (result.code === 0) {
			setOrderList(result.data.data)
			setPage({ ...page, total: result.data.total })
		}
	}




	useEffect(() => {
		getOrder()
	}, [page.pageNo, page.pageSize])



	return (
		<div>
			<br />
			<br />
			<Table pagination={paginationProps} columns={columns} dataSource={orderList} rowKey={(record) => record.goodsId}></Table>
		</div >
	)
};

export default index;
