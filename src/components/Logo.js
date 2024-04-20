import React from 'react';
import { Image } from 'antd';

const Logo = ({ isLoggedIn }) => {
    return isLoggedIn ? (
        <Image
            width={200}
            src="https://via.placeholder.com/200"
            alt="Logo"
        />
    ) : null;
}

export default Logo;
