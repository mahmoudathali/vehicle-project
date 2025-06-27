const ORDERS_KEY = 'automobile_unterm_schloss_orders';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'AZERTY21'
};

export const saveOrder = (order) => {
  const existingOrders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...existingOrders, order]));
};

export const getOrders = () => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const deleteOrder = (orderId) => {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.filter(order => order.id !== orderId)));
};

export const verifyAdminCredentials = (username, password) => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const exportOrdersToJson = () => {
  const orders = getOrders();
  const ordersBlob = new Blob([JSON.stringify(orders, null, 2)], { type: 'application/json' });
  return ordersBlob;
};