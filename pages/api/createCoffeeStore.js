import { findRecordByFilter, getFieldsRecord, table } from '../../lib/airtable';

const createCoffeeStoreHandler = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { id, name, address, neighborhood, imgUrl, votes } = req.body;

    try {
      // if (id){} is validation saying we need id field in order to proceed
      if (id) {
        const record = await findRecordByFilter(id);

        if (record.length !== 0) {
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
