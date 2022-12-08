import { IOrder } from '../models/Order';

interface statusObj {
  status: IOrder['status'];
  icon: string;
  translated: string;
}

const AllStatusArr: statusObj[] = [
  {
    status: 'WAITING',
    icon: '⌛',
    translated: 'Fila de espera'
  },
  {
    status: 'IN_PRODUCTION',
    icon: '🍳',
    translated: 'Em preparação'
  },
  {
    status: 'DONE',
    icon: '✔️',
    translated: 'Pronto'
  }
];

function getStatusData(status: IOrder['status']): statusObj {

  const statusIndex = AllStatusArr.findIndex((item) => item.status === status);

  let finalStatusData: statusObj = {
    status: 'WAITING',
    icon: '⌛',
    translated: 'Fila de espera'
  };

  if (statusIndex > -1){
    finalStatusData = AllStatusArr[statusIndex];
  }

  return finalStatusData;

}

export { getStatusData };
