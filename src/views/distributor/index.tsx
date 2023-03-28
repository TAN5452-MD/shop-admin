import { operateApplicantMessage, selectAllApplicantMessage } from '@/api/myapi';
import React, { useEffect, useState } from 'react';
import { Button, PaginationProps, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const index = () => {
	type Page = {
		pageNo: number,
		pageSize: number,
		total: number,
	}
	interface DataType {
		applicantId: string
		applicantMessageContent: string
		applicantMessageName: string
		applicantMessageStatus: string
		applicantUserName: string
		applicationInformationId: string
		becauseMessage: string
		createTime: string
		operateStatus: string
	}
	//经销商处理操作
	const operationResult = async (item: any, type: number) => {
		const data = {
			operateStatus: type,
			applicantId: item.applicantId,
			applicationInformationId: item.applicationInformationId
		}
		const result = await operateApplicantMessage(data)
		if (result.code === 0) {
			message.success('操作成功')
			getList()
		}
	}

	const columns: ColumnsType<DataType> = [
		{
			title: '用户名',
			dataIndex: 'applicantUserName',
			key: 'applicantUserName',
		},
		{
			title: '申请时间',
			dataIndex: 'createTime',
			key: 'createTime',
		},
		{
			title: '申请原因',
			dataIndex: 'becauseMessage',
			key: 'becauseMessage',
		},
		{
			title: '操作',
			dataIndex: 'applicantMessageStatus',
			key: 'applicantMessageStatus',
			render: (_, record) => {
				return (
					<Space>
						<Button onClick={() => operationResult(record, 1)} type="primary">同意</Button>
						<Button onClick={() => operationResult(record, 0)} danger>驳回</Button>
					</Space>
				)
			}
		}

	];



	const [list, setList] = useState<any[]>([])
	const [page, setPage] = useState<Page>({
		pageNo: 1,
		pageSize: 10,
		total: 0,
	})
	const getList = async () => {
		const result = await selectAllApplicantMessage(page)
		if (result.code === 0) {
			setList(result.data.data)
			setPage({ ...page, total: result.data.total })
		}
	}
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

	useEffect(() => {
		getList()
	}, [page.pageNo, page.pageSize])
	return (
		<div>
			<Table columns={columns} dataSource={list} pagination={paginationProps} rowKey={(row) => row.applicantId} />
		</div>
	)
};

export default index;
