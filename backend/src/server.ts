import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 4356}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});