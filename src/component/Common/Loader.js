import React from 'react';
import { Alert, Flex, Spin } from 'antd';

export default () => (
  <Flex vertical>
    <Spin tip="Please wait..." fullscreen={true}>
    </Spin>
  </Flex>
);