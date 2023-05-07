import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const Message = (props:any) => {
        const {reverse,content} = props
        
    return(
      <div>
      { reverse ?
        <div >
            {/* 未反转状态 */}
            <div className='flex' >
                  <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>          
                  <div className="ml-5">
                    <p className="bg-#f9d5b7 pl-2 pr-2  break-all max-w-50 border-solid border-gray-500 border-opacity-20  rd-2">
                      {content} 
                    </p>
                </div>
            </div>
        </div>
      :
        <div className="w-240">
            {/* 未反转状态 */}
            <div className='flex justify-end' >
                <div className="mr-5">
                    <p className="
                    bg-blueGray-2
                    pl-2
                    pr-2
                    break-all
                    max-w-50
                    border-solid
                    border-gray-500 border-opacity-20  rd-2">
                        {content}
                    </p>
                </div>
                  <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>          
            </div>
        </div>
    }
      </div>
    )
};

export default Message;
