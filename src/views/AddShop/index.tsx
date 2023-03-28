import React, { useState } from 'react';
import { Button, Form, Input, Tag, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const index = () => {
	const props: UploadProps = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text',
		},
	}
	const { TextArea } = Input;
	const [imageList, setImageList] = useState<string[]>([])
	const navigate = useNavigate()
	const back = () => {
		navigate(-1)
	}
	return (
		<div>
			<Tag color="#f50">添加商品</Tag>
			<div style={{ display: 'flex', justifyContent: "center" }}>
				<div style={{ flex: 1 }}>
					<br />
					<Form
						name="basic"
						autoComplete="off"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 12 }}>
						<Form.Item
							label="商品名"
							name="shopname"
							rules={[{ required: true, message: '请输入商品名称!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="商品描述"
							name="desrciption"
						>
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item
							label="商品图片"
							name="picture"
						>
							<Upload {...props}>
								<Button icon={<UploadOutlined />}>上传图片</Button>
							</Upload>
						</Form.Item>
						<Form.Item
							wrapperCol={{ offset: 8, span: 12 }}
						>
							<Button onClick={back}>取消</Button>
							<span>&nbsp;&nbsp;</span>
							<Button type="primary">确定</Button>
						</Form.Item>
					</Form>
				</div>
				<div style={{ flex: 1 }}>

				</div>
			</div>
		</div >
	);
};

export default index;
