import { findRecordByFilter, getFieldsRecord, table } from '../../lib/airtable';

const favoriteCoffeeStoreByIdHandler = async (req, res) => {
  if (req.method === 'PUT') {
    const { id } = req.body;

    try {
      if (id) {
        const record = await findRecordByFilter(id);
        if (record.length !== 0) {
          const coffeeStoreRecord = record[0];

          const calculateVotes =
            parseInt(coffeeStoreRecord.votes) + parseInt(1);

          // update airtable coffee store record with votes count
          const updateRecord = await table.update([
            {
              id: coffeeStoreRecord.recordId,
              fields: {
                votes: calculateVotes,
              },
            },
          ]);

          if (updateRecord) {
            const minifiedRecords = getFieldsRecord(updateRecord);
            res.json(minifiedRecords);
          }
        } else {
          res.json({ message: `coffee store id ${id} does not exist` });
        }
      } else {
        res.status(400).json({ message: 'id is missing' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error at favoriteCoffeeStoreById: ${error}` });
    }
  }
};

export default favoriteCoffeeStoreByIdHandler;

// const { id } = req.query.id;

//   if (id) {
//     const record = findRecordByFilter(id);

//     try {
//       if (record) {
//         table.update([
//           {
//             id: id,
//             fields: {
//               votes: 2,
//             },
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     res.json({ message: `id: ${id} does not exist` });
//   }
