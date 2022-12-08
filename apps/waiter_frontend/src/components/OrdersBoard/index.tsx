import { useState } from 'react';
import { toast } from 'react-toastify';
import { IOrder } from '../../models/Order';
import { api } from '../../utils/api';
import { getStatusData } from '../../utils/getStatusData';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface propsType {
  icon: string;
  title: string;
  orders: IOrder[];
  onCancel: (selected: IOrder) => void
  onChangeOrderStatus: (selected: IOrder, newStatus: IOrder['status']) => void
}

const OrdersBoard = ({icon, orders, title, onCancel, onChangeOrderStatus}: propsType) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | IOrder>(null);

  const handleOpenModal = (order: IOrder) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async () => {
    if (selectedOrder){
      console.log('CANCELA POHA');
      await api.delete(`/orders/${selectedOrder._id}`);
      setIsModalVisible(false);
      onCancel(selectedOrder);
      toast(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
    }
  };

  const handleChangeOrderStatus = async () => {
    if (selectedOrder){
      const newStatus = selectedOrder.status === 'IN_PRODUCTION' ? 'DONE' : 'IN_PRODUCTION';
      await api.patch(`/orders/${selectedOrder._id}`, { status: newStatus});
      setIsModalVisible(false);
      toast(`O pedido da mesa ${selectedOrder.table} foi movido para ${getStatusData(newStatus).translated}!`);
      onChangeOrderStatus(selectedOrder, newStatus);
    }
  };

  return (
    <Board>
      <OrderModal visible={isModalVisible} order={selectedOrder} onClose={handleCloseModal} onChangeOrderStatus={handleChangeOrderStatus} onCancelOrder={handleCancelOrder}/>
      <div>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{orders.length}</span>
      </div>

      <OrdersContainer>
        {orders && orders.map((order) => (
          <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  );
};

export {OrdersBoard};
