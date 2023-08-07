import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('running');
});

app.post('/users', async (req, res) => {
    const repository = await AppDataSource.getRepository(User);
    const user = repository.create(req.body);
    const result = await repository.save(user);
    return res.status(201).json(result);
})

app.get('/users', async (req, res) => {
    const repository = await AppDataSource.getRepository(User);
    const users = await repository.find();
    return res.status(200).json(users);
})

app.get('/users/:id', async (req, res) => {
    const repository = await AppDataSource.getRepository(User);
    const user = await repository.findOneBy({
        id: Number(req.params.id),
    });
    return res.status(200).json(user);
})

app.put('/users/:id', async (req, res) => {
    const repository = await AppDataSource.getRepository(User);
    const user = await repository.findOneBy({
        id: Number(req.params.id),
    });
    repository.merge(user, req.body);
    const result = await repository.save(user);
    return res.status(200).json(result);
});

app.delete('/users/:id', async (req, res) => {
    const repository = await AppDataSource.getRepository(User);
    const result = repository.delete(req.params.id);
    return res.status(200).json(result);
});


AppDataSource
    .initialize()
    .then(() => {
        console.log('Database initialized');
    })
    .catch((err) => {
        console.log(err);
    });

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});