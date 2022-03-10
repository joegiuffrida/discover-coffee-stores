import { getFieldsRecord, table, findRecordByFilter } from '../../lib/airtable';

const getCoffeeStoreByIdHandler = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const record = await findRecordByFilter(id);

      if (record.length !== 0) {
        res.json(record);
      } else {
        res.json({
          message: `id: ${id} could not be found`,
        });
      }
    } else {
      res.status(400).json({ message: `id is missing` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error from getCoffeeStoreById: ${error}` });
  }
};

export default getCoffeeStoreByIdHandler;
