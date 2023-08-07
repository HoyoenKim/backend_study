const model = require("../models/users.model")

function getAllUsers(req, res) {
    res.json(model); // object를 보낼 때는 res.json을 사용하는 것이 낫다 (호출 한번 더 적게 됨.)
    return model;
}

function getUserById(req, res) {
const id = Number(req.params.id);
    const user = model.find(user => user.id === id);
    if(user) {
        res.json(user);
    }
    else {
        res.sendStatus(404);
        res.end(); // 데이터를 제공하지 않고 응답을 종료할 때 사용.
        // res.send(html) = res.end(html)
        // 단, res.end에는 Content-Type, E-tpye을 지정하지 않는다. 캐싱에 어려움.
    }
    return user;
}

function postUser(req, res) {
    if(!req.body.name) {
        res.status(400).json({
            error: "Missing User Name",
        })
        return;
    }
    const newUser = {
        name: req.body.name,
        id: model.length,
    }
    model.push(newUser);
    res.json(newUser);
    return newUser;
}

module.exports = {
    getAllUsers,
    getUserById,
    postUser
}