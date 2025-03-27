export default {
  getSystemVersion: jest.fn(() => '1.0.0'),
  getBrand: jest.fn(() => 'Apple'),
  getModel: jest.fn(() => 'IPX'),
  getUniqueId: jest.fn(() => Promise.resolve('1234')),
};
