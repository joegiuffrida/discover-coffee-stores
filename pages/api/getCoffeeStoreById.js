import { getFieldsRecord, table } from '../../lib/airtable';

const getCoffeeStoreByIdHandler = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const findCoffeeStoreById = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreById.length !== 0) {
        // we're mapping over findCoffeeStoreById because we only want the fields portion of the data which has our record info with all the coffee store data. The mapping has been refactored to the airtable.js file through getFieldsRecord
        const record = getFieldsRecord(findCoffeeStoreById);
        res.json(record);
      } else {
        res.status(500).json({
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
