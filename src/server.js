import app from './app';
import 'dotenv/config';

app.listen(process.env.PORT,() => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}`);
});
