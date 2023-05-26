import "./index.less";
import { useEffect, useState } from "react";
import { Space, Table, Input, Button, message, Popconfirm, Modal, PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { selectUserList,usercancelUserDealer } from "@/api/myapi";

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
	const [reason, setReason] = useState<string>('')
	const [curUser, setCurUser] = useState<DataType>({} as DataType)
	const cancelAuth =  (obj: DataType) => {
			setCurUser(obj)
			setReason('')
			setIsModalOpen(true);
	} 
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
			render: (text, record) => (
				<>
				{record.roleName === '经销商' ? 
				<a>是</a> : 
				<a className="color-red">否</a> }
				</>
			)
		},
		{
			title: '操作',
			key: 'aciton',
			render: (text, record) => (
				<Button disabled={!(record.roleName === '经销商') } onClick={() => cancelAuth(record)}>取消资格</Button>
			)
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
		message.error('Click on No');
	};
	const getUserList = async () => {
		const result = await selectUserList(page)
		if (result.code === 0) {
			setUserList(result.data.data)
			setPage({ ...page, total: result.data.recordsTotal })
		}
	}

	useEffect(() => {
		getUserList()
	}, [page.pageNo, page.pageSize])
  const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
		if(reason === ''){
			message.error('请输入取消原因')
			return
		}
		const data = {
			userId: curUser.userId,
			userName: curUser.userName,
			message: reason
		}
		usercancelUserDealer(data).then(res => {
			if(res.code === 0) {
				message.success('取消成功')
			}
		}).finally(() => {
			setIsModalOpen(false);
			getUserList()
		})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
	const editReason = (e:React.ChangeEvent<HTMLInputElement>) => {
		setReason(e.target.value)
	}
	return (
		<div>
				<Modal 
				title="取消经销商资格" 
				open={isModalOpen} 
				onOk={handleOk} 
				onCancel={handleCancel}
				destroyOnClose={true}
				>
        <Input placeholder="请输入取消原因" onChange={editReason}/>
      </Modal>
			<Table pagination={paginationProps} columns={columns} dataSource={userList} ></Table>
		</div>
	)
};

export default BasicForm;
