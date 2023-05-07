import React, { useEffect, useLayoutEffect } from 'react'
import { Card, Divider, Input, Space, Button, message as msg } from 'antd';
import Message from './component/Message';
import { already, createSession, selectUserRoleList, msgInfo } from '@/api/myapi';
import { useInput } from '@/hooks/useInput'
import { Avatar, List } from 'antd';
const WaterChart = () => {
	const user = JSON.parse(localStorage.getItem("userInfo") as string)
	interface IconnectInfo {
		id: string
		listName: string
		toUserId: string
		unReadCount: number
		userId: string
	}
	type IMsg = Root2[]

	interface Root2 {
		content: string
		createTime: string
		fromUserId: string
		fromUserName: string
		id: number
		toUserId: string
		toUserName: string
		unReadFlag: number
	}
	const [chatUsers,setChatUsers] = React.useState<any>([])


	const [msgList, setMsgList] = React.useState<IMsg>([])
	const [adminInfo, setAdminInfo] = React.useState<any>({})
	const [connectInfo, setConnectInfo] = React.useState<IconnectInfo>()
	const [messageApi, contextHolder] = msg.useMessage()
	const getHistoryChat = (id: string) => {
		msgInfo(id).then(res => {
			if (res.code === 0) {
				console.log("历史记录", res);
				setMsgList(res.data)
			}
		})
		//scrollToBottom()
	}
	const message = useInput()
	const [ws, setWs] = React.useState<any>(null)
	//判断是否已经在聊天
	const IsChating = () => {
		already(user.userId as string).then((res) => {
			if (res.code === 0) {
				//如果等于0说明还未创建
				if (res.data.length === 0) {
					queryAdmin()
				} else {
					//已经有会话
					setConnectInfo(res.data[0])
					setChatUsers(res.data.map((item:any,idx:number) => {
						item.selected = false
						if(idx === 0){
							item.selected = true
						}
						return item
					}))
					//链接会话
					const ws = new WebSocket(`ws://43.139.230.109:9001/websocket/${user.userId}/${res.data[0]?.id}`)
					setWs(ws)
					ws.addEventListener('open', () => {
						console.log("连接成功");
					})
					ws.addEventListener('message', (e: any) => {
						console.log("接收到消息", e);
						getHistoryChat(res.data[0]?.id)

					})
					getHistoryChat(res.data[0]?.id)
				}
			}
		})
	}
	//查询管理员信息
	const queryAdmin = () => {
		selectUserRoleList().then(res => {
			if (res.code === 0) {
				setAdminInfo(res.data[0])
				createConnect()
			}
		})
	}
	//创建连接
	const createConnect = () => {
		const data = {
			userId: user.userId,
			adminId: adminInfo.userId,
			userName: user.userName,
		}
		createSession(data).then(res => {
			if (res.code === 0) {
				console.log("创建成功");
			}
		})

	}

	//发送消息
	const sendMsg = () => {
		if (message.value === "" || message.value === null) {
			messageApi.warning('消息不能为空')
			return
		}
		ws.send(message.value)
		getHistoryChat(connectInfo?.id as string)
		message.setValue('')
	}
	const enterSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e?.key === 'Enter') {
			sendMsg()
		}

	}

	//发送完消息滑动到底部
	const scrollToBottom = () => {
		const chatView: HTMLElement | null = document.getElementById('chatView')
		chatView?.scrollIntoView(false)
	}
	//选择聊天对象
	const selectChatWithUser = (item: any) => {
			console.log(item);
			setConnectInfo(item)
			chatUsers.forEach((element:any) => {
				element.selected = false
			});
			item.selected = true
			ws.close()
			const newWs = new WebSocket(`ws://43.139.230.109:9001/websocket/${user.userId}/${item.id}`)
			getHistoryChat(item.id)
			setWs(newWs)
			ws.addEventListener('message', (e: any) => {
				console.log("接收到消息", e);
				getHistoryChat(item.id)
			})
	}

	useEffect(() => {
			IsChating()
	}, [])
	useLayoutEffect(() => {
			scrollToBottom()
	}, [msgList])
	useEffect(() => {
		// return ws?.close()
	})
	return (
		<div className='bg-#ededed h-screen'>
			{contextHolder}
			<div className='flex justify-center'>
				<div className='w-50 bg-white'>
					<List
						bordered
						itemLayout="horizontal"
						dataSource={chatUsers}
						renderItem={(item:any,index: number) => (
							<List.Item 
							onClick={()=>{selectChatWithUser(item)}}
							className='cursor-pointer'
							style={{backgroundColor:item.selected ? 'rgba(224, 242, 254)' : ''}}
							>
								<List.Item.Meta
									avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>}
									title={<a>{item.listName}</a>}
								/>
							</List.Item>
						)}
					/>
				</div>
				<Card className='mt-5 shadow-xl flex ' bodyStyle={{ margin: 0, padding: 0 }}>
					<div className='h-150 w-100% overflow-auto'>
						<div className="ml-2 mt-10 " id="chatView">
							<Space direction={"vertical"} size={"large"}>
								{msgList?.map((item, index) => {
									return <Message key={index} content={item.content}
										reverse={item.fromUserId === user.userId ? false : true}>
									</Message>
								})}
							</Space>
						</div>
					</div>
					<Divider />
					<div className=' w-250 flex justify-center'>
						<Input value={message.value} onChange={message.onChange} onKeyUp={(e) => { enterSend(e) }} className="w-80%" placeholder="请输入"></Input>
						<Button type="primary" className="ml-5" onClick={sendMsg} >发送</Button>
					</div>
					<br />
				</Card>
			</div>
		</div>
	)
};

export default WaterChart;
