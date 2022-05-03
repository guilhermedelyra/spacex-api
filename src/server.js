import app from './app';

app.set('port', process.env.API_PORT || 3000);
app.listen(app.get('port'), () => {
  console.debug(`Server on port http://localhost:${app.get('port')}`);
});
