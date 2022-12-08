import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { api } from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { StatusContainer } from './styles';
import { IOrder } from '../../models/Order';
import { API_BASEURL } from '../../configs/configs';
import { getStatusData } from '../../utils/getStatusData';

export const Orders = () => {

  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {

    api.get('/orders').then((response) => {
      setOrders(response.data);
    });
  }, []);

  useEffect(() => {
    const socket = socketIo(API_BASEURL, {
      transports: ['websocket']
    });

    socket.on('orders@new', (order: IOrder) => {
      setOrders((oldOrders) => oldOrders.concat(order));
    });
  }, []);

  const handleOrdersCancel = (canceledOrder: IOrder) => {
    setOrders((oldValues) => oldValues.filter((item) => item._id !== canceledOrder._id));
  };

  const handleOrderStatusChange = (orderStatusChanged: IOrder, newStatus: IOrder['status']) => {
    setOrders((oldValues) => oldValues.map((order) => {
      const newOrder = order._id !== orderStatusChanged._id ? order : {
        ...order,
        status: newStatus
      };

      return newOrder;
    }));
  };

  const waitingOrders = orders.filter((order) => order.status === 'WAITING');
  const productionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const doneOrders = orders.filter((order) => order.status === 'DONE');

  return (
    <StatusContainer>
      <OrdersBoard icon={getStatusData('WAITING').icon} title={getStatusData('WAITING').translated} orders={waitingOrders} onChangeOrderStatus={handleOrderStatusChange} onCancel={handleOrdersCancel}/>
      <OrdersBoard icon={getStatusData('IN_PRODUCTION').icon} title={getStatusData('IN_PRODUCTION').translated} orders={productionOrders} onChangeOrderStatus={handleOrderStatusChange} onCancel={handleOrdersCancel}/>
      <OrdersBoard icon={getStatusData('DONE').icon} title={getStatusData('DONE').translated} orders={doneOrders}  onChangeOrderStatus={handleOrderStatusChange} onCancel={handleOrdersCancel}/>
    </StatusContainer>
  );
};
