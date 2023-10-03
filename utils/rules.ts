export const RULES = {
  EMPTY: { required: true, message: 'Vui lòng không được để trống trường này' },
  EMPTY_INPUT: {
    required: true,
    whitespace: true,
    message: 'Vui lòng không được để trống trường này',
  },
  NUMBER: { pattern: /^\d+$/, message: 'Trường này chỉ nhập số và lớn hơn 0' },
};
