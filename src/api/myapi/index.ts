import { message } from "antd";
import request from "../request";
type user = {
  userName: string;
  Password: string;
};
type result = {
  code: number;
  message: string;
  data: any;
};

//登录
export const login = (params: user) => {
  return request.post<result>(`/audit/member/user/userLogin`, params);
};
//用户列表查询
export const selectUserList = (params: any) => {
  return request.post<result>(`/audit/member/user/selectUserList`, params);
};
//用户列表查询
export const usercancelUserDealer = (params: any) => {
  return request.put<result>(`/audit/member/user/cancelUserDealer`, params);
};

//商品模块

//添加商品
export const addGoods = (params: any) => {
  return request.post<result>(`/audit/project/goodsInfo/addGoods`, params);
};
//查询商品
export const selectGoodsInfo = (params: any) => {
  return request.post<result>(`audit/project/goodsInfo/selectGoodsInfo`, params);
};
//删除商品
export const deleteGoods = (id: string) => {
  return request.delete<result>(`/audit/project/goodsInfo/deleteGoods/${id}`);
}
//上下架商品
export const publishGoods = (params: any) => {
  return request.put<result>(`/audit/project/goodsInfo/publishGoods`, params);
};
//商品分类查询
export const selectAllGoodsCategory = (params: any) => {
  return request.post<result>(`/audit/project/goodsCategory/selectAllGoodsCategory`,params);
};
//品牌分类查询
export const selectAllGoodsBrand = () => {
  return request.get<result>(`/audit/project/goodsBrand/selectAllGoodsBrand`);
};

//政策模块

//添加政策
export const addPolicy = (params: any) => {
  return request.post<result>(`/audit/project/policy/addPolicy`, params);
};
//查询政策
export const selectPolicy = (params: any) => {
  return request.post<result>(`/audit/project/policy/selectPolicy`, params);
};
//修改政策
export const updatePolicy = (params: any) => {
  return request.put<result>(`/audit/project/policy/updatePolicy`, params);
};
//删除政策
export const deletePolicy = (id: string) => {
  return request.delete<result>(`/audit/project/policy/deletePolicy/${id}`);
};

//订单模块
//查询订单
export const adminSelectOrder = (params: any) => {
  return request.post<result>(`/audit/project/order/adminSelectOrder`, params);
};

//经销商模块
//查询列表
export const selectAllApplicantMessage = (params: any) => {
  return request.post<result>(`/audit/member/applicantMessage/selectAllApplicantMessage`, params);
};

//是否同意成为经销商
export const operateApplicantMessage = (params: any) => {
  return request.post<result>(`/audit/member/applicantMessage/operateApplicantMessage`, params);
};


//分类模块
//添加分类
export const addGoodsCategory = (params: any) => {
  return request.post<result>(`/audit/project/goodsCategory/addGoodsCategory`, params);
}
export const updateGoodsCategory = (params: any) => {
  return request.post<result>(`/audit/project/goodsCategory/updateGoodsCategory`, params);
}


//客服模块

export const already = (id: string) => (
  request.get<result>(`/audit/member/sessionList/already?id=${id}`,)
)

export const createSession = (obj: {
  userId: string,
  userName: string,
  adminId: string,
}) => request.get<result>(
  `/audit/member/sessionList/createSession?id=${obj.userId}&toUserId=${obj.adminId}&toUserName=${obj.userName}`,
)
export const selectUserRoleList = () => request.get<result>(`/audit/member/user/selectUserRoleList?roleCode=admin`,)


export const msgInfo = (id: string) => request.get<result>(`/audit/member/msgInfo/msgList?sessionId=${id}`,)
