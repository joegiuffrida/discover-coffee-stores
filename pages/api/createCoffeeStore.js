import { getFieldsRecord, table } from '../../lib/airtable';

const createCoffeeStoreHandler = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { id, name, address, neighborhood, imgUrl, votes } = req.body;

    try {
      // if (id){} is validation saying we need id field in order to proceed
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          // we're mapping over findCoffeeStoreRecords because we only want the fields portion of the data which has our record info. The mapping has been refactored to the airtable.js file through getFieldsRecord
          const record = getFieldsRecord(findCoffeeStoreRecords);
          res.json(record);
        } else {
          // create a record
          // if (name){} is validation saying we need name field in order to proceed
          if (id && name) {
            const createRecord = await table.create([
              {
                fields: {
                  id: id,
                  name: name,
                  address: address,
                  neighborhood: neighborhood,
                  imgUrl: imgUrl,
                  votes: votes,
                },
              },
            ]);
            // transforming the createRecord data to only include the fields data which has our record data that we need and storing it in createdRecord
            const createdRecord = getFieldsRecord(createRecord);
            res.json(createdRecord);
          } else {
            res.status(400).json({ message: `name is missing` });
          }
        }
      } else {
        res.status(400).json({ message: `id is missing` });
      }
    } catch (error) {
      console.error(`Error at createCoffeeStoreHandler: ${error}`);
      res
        .status(500)
        .json({ message: `Error finding or creating store: ${error}` });
    }
  }
};

export default createCoffeeStoreHandler;
