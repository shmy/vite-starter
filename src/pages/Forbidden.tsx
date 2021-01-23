import React from "react";
import {Button, Result} from "antd";
import history from '../utils/history.util'

const Forbidden: React.FC = () => {
  const handleClick = () => history.replace('/');
  return <Result
    status="403"
    title="403"
    subTitle="Sorry, the page you can't visited."
    extra={<Button onClick={handleClick} type="primary">Back Home</Button>}
  />;
};
export default Forbidden;
