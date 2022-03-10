const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getFieldsRecord = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
  const findCoffeeStoreById = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  // we're mapping over findCoffeeStoreById because we only want the fields portion of the data which has our record info with all the coffee store data. mapping is being handled by getFieldsRecord function.
  return getFieldsRecord(findCoffeeStoreById);
};

export { table, getFieldsRecord, findRecordByFilter };
