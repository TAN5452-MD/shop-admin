import { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import { selectAllGoodsBrand } from "@/api/myapi/index";
import "./index.less";
import type { ColumnsType } from "antd/es/table";
const UseHooks = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags"
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  const [data, setData] = useState<DataType[]>([]);

  const getType = () => {
    selectAllGoodsBrand().then((res: any) => {
      if (res.code === 0) {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <div>
      <div>
        <Button type="primary">添加分类</Button>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
export default UseHooks;
