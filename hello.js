<<<<<<< HEAD
// console.log("Hello World!");

const Hello = (app) => {
    app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/good', (req, res) => {res.send('Life is good!')})
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
}

export default Hello;

=======
const Hello = (app) => {
  app.get("/hello", (req, res) => {
    res.send("Life is good!");
  });
  app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Development!");
  });
};
export default Hello;
>>>>>>> 3bc1e2c (server commit)
