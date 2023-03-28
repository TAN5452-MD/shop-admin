import "./index.less";
import { useEffect, useState } from "react";
import { Space, Table, Tag, Button, message, Popconfirm, Modal, PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { selectUserList } from "@/api/myapi";

const BasicForm = () => {
	type Page = {
		pageNo: number,
		pageSize: number,
		total: number,
	}
	interface DataType {
		address: string
		adminFlag: string
		age: string
		birthday: string
		createTime: string
		email: string
		gender: string
		headPic: string
		mobile: string
		nickName: string
		password: string
		roleId: string
		roleName: string
		status: string
		unitId: string
		unitName: string
		unitTypeId: string
		unitTypeName: string
		updateTime: string
		userId: string
		userName: string
		userRole: any
	}
	const [page, setPage] = useState<Page>({
		pageNo: 1,
		pageSize: 10,
		total: 0,
	})
	const [userList, setUserList] = useState<any[]>([])


	const columns: ColumnsType<DataType> = [
		{
			title: '用户名',
			dataIndex: 'userName',
			key: 'userName',
			render: text => <a>{text}</a>,
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: '密码',
			key: 'password',
			dataIndex: 'password',
		},
		{
			title: '是否经销商',
			key: 'statusStr',
			dataIndex: 'statusStr'
		},
	];
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

	const data: DataType[] = [
	];
	const deleteUser = (obj: DataType) => {
		console.log(obj);

	}

	const confirm = (obj: DataType) => {
		deleteUser(obj)
		message.success('Click on Yes');
	};

	const cancel = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e);
		message.error('Click on No');
	};
	const getUserList = async () => {
		const result = await selectUserList(page)
		if (result.code === 0) {
			setUserList(result.data.data)
			setPage({ ...page, total: result.data.total })
		}
	}

	useEffect(() => {
		getUserList()
	}, [page.pageNo, page.pageSize])

	return (
		<div>
			<Table pagination={paginationProps} columns={columns} dataSource={userList} ></Table>
		</div>
	)
};

export default BasicForm;
