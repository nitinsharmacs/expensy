const validateNewEntryReq = (body) => {
  console.log(body);
  const requiredFields = ['date', 'category', 'amount', 'comment'];

  const fields = Object.keys(body);

  return requiredFields.every((field) => fields.includes(field));
};

module.exports = { validateNewEntryReq };
