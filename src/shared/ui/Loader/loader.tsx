import { FC } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const Loader: FC = () => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
}