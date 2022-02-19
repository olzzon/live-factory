import express  from 'express'

const httpServer: express.Application = express()
const PORT = 1406

httpServer.use(express.json());

httpServer.get('/', () => {
    console.log('new client')
})

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
