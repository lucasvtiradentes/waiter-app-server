import {Overlay, ModalBody, OrdersDetails, OrderActions} from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import {IOrder} from '../../models/Order';
import {formatCurrency} from '../../utils/formatCurrency';
import {useEffect} from 'react';
import {getStatusData} from '../../utils/getStatusData';
import {SERVER_BASE} from '../../configs/configs';

interface IPropsInterface {
  visible: boolean;
  order: IOrder | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => Promise<void>;
}

export const OrderModal = ({onCancelOrder, onClose, onChangeOrderStatus, order, visible}: IPropsInterface) => {
  const total = order?.products.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  useEffect(() => {
    function handleEscapePress(event: any) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapePress);

    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <div className="modal-title">
          <strong>Mesa {order.table}</strong>

          <button type="button">
            <img src={closeIcon} onClick={onClose} alt="close icon" />
          </button>
        </div>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span> {getStatusData(order.status).icon} </span>
            <strong> {getStatusData(order.status).translated} </strong>
          </div>
        </div>

        <OrdersDetails>
          <strong>Items</strong>

          <div className="order-items">
            {order.products.map((product) => (
              <div className="item" key={product._id}>
                <img src={`${SERVER_BASE}/uploads/${product.product.imagePath}`} alt={product.product.name} width="56" height="28"></img>

                <span className="quantity">{product.quantity}x</span>

                <div className="product-details">
                  <strong>{product.product.name}</strong>
                  <span>{formatCurrency(product.product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{total ? formatCurrency(total) : ''}</strong>
          </div>
        </OrdersDetails>

        <OrderActions>
          {order.status !== 'DONE' && (
            <button type="button" className="primary" onClick={onChangeOrderStatus}>
              <span>{getStatusData(order.status).icon}</span>
              <strong>
                {order.status === 'WAITING' && 'iniciar produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
              </strong>
            </button>
          )}

          <button type="button" className="secondary" onClick={onCancelOrder}>
            <strong>Cancelar pedido</strong>
          </button>
        </OrderActions>
      </ModalBody>
    </Overlay>
  );
};
