export const getAllStudents = (req, res) => {
  res.json([{ id: 1, name: 'Ahmad' }, { id: 2, name: 'Zainab' }]);
};
