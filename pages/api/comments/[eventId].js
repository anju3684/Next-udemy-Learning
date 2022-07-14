import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
  } from '../../../helpers/db-util';
  
async function handler(req, res) {
    const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }
    if (req.method === 'POST') {
      const { email, name, text } = req.body;
  
      if (
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid input.' });
        client.close()
        return;
      }
  
      const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text,
        eventId
      };
      let result;
    //   const db=client.db()
    //  const result= await db.collection('newsletteer').insertOne(newComment)
    //   console.log(result);
  
    try {
        result = await insertDocument(client, 'comments', newComment);
        newComment._id = result.insertedId;
        res.status(201).json({ message: 'Added comment.', comment: newComment });
      } catch (error) {
        res.status(500).json({ message: 'Inserting comment failed!' });
      }
    
    }
  
    if (req.method === 'GET') {
    //   const dummyList = [
    //     { id: 'c1', name: 'Max', text: 'A first comment!' },
    //     { id: 'c2', name: 'Manuel', text: 'A second comment!' },
    //   ];
    //     const db=client.db();
    //   const documents= await db.collection('newsletteer').find().sort({_id:-1}).toArray()
    //   res.status(200).json({ comments: documents });
    try {
        const documents = await getAllDocuments(client, 'comments', { _id: -1 });
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: 'Getting comments failed.' });
      }
    }
  client.close()
  }
  
  export default handler;