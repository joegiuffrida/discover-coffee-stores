const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

const createCoffeeStoreHandler = async (req, res) => {
  if (req.method === 'POST') {
    // find a record

    const { id, name, address, neighborhood, imgUrl, votes } = req.body;

    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        // we're mapping over findCoffeeStoreRecords because we only want the fields portion of the data which has our record info
        const record = findCoffeeStoreRecords.map((storeRecord) => {
          return {
            ...storeRecord.fields,
          };
        });
        res.json(record);
      } else {
        // create a record
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
        const createdRecord = createRecord.map((storeRecord) => {
          return {
            ...storeRecord.fields,
          };
        });
        res.json(createdRecord);
      }
    } catch (error) {
      console.error(`Error at createCoffeeStoreHandler: ${error}`);
      res.status(500).json({ message: `Error finding store: ${error}` });
    }
  }
};

export default createCoffeeStoreHandler;
