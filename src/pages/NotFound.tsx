import React from "react";
import {Button, Result} from "antd";
import history from '../utils/history.util'

const NotFound: React.FC = () => {
  const handleClick = () => history.replace('/');
  return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button onClick={handleClick} type="primary">Back Home</Button>}
  />;
};
export default NotFound;
