const handler = (req, res) => {
  res.status(200).json({ message: `I love ${req.query.name}` });
};

export default handler;
