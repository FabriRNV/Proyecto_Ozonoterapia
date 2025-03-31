import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export function Header () {
  const [current, setCurrent] = useState('h');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" className="bg-gray-800 text-white">
        <Menu.Item key="h" icon={<HomeTwoTone />} className="hover:bg-gray-700">
          <Link to="/" className="text-white">Home</Link>
        </Menu.Item>
        <Menu.Item key="r" icon={<EditTwoTone />} className="hover:bg-gray-700">
          <Link to="/register" className="text-white">Register</Link>
        </Menu.Item>
        <Menu.Item key="l" icon={<CheckCircleTwoTone />} className="hover:bg-gray-700">
          <Link to="/login" className="text-white">Login</Link>
        </Menu.Item>
      </Menu>
      <Outlet />
    </>
  );
};

export default Header;