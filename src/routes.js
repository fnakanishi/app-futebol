const express = require ("express");
const routes = express.Router();
const DB = require("./teams");


routes.get("/teams", (req,res)=>{
    if(DB.teams == undefined) {
        res.status(404).json({ msg: "Nenhum time cadastrado" })
    } else {
        res.status(200).json(DB.teams);
    }
})

routes.get("/teams/:nome", (req,res) => {
    const nome = req.params.nome;
    if(nome == undefined) {
        res.sendStatus(400);
    } else {
        const team = DB.teams.find((c) => c.nome.toLowerCase().includes(nome.toLowerCase()));
        if (team != undefined) {
            console.log(team);
            res.status(200).json(team);
        } else if (team instanceof Array) {
            res.status(404).json({ msg: `Mais de um time encontrado para o nome ${ nome }` });
        } else {
            res.status(404).json({ msg: "Time não encontrado" });
        }
    }
})

routes.post("/teams", (req,res) =>{
    const {
        nome,
        cidade,
        estado,
        serie,
        titulos,
        folhaDePagamento,
    } = req.body;

    if (nome && cidade && estado && titulos && folhaDePagamento != undefined) {
        const id = Math.max.apply(Math, DB.teams.map((t) => { return t.id; })) + 1;
        DB.teams.push({
            id,
            nome,
            cidade,
            estado,
            serie,
            titulos,
            folhaDePagamento,
        });
        res.status(202).json({ msg: "Time inserido com sucesso." });
    } else {
        res.status(400).json({ msg: "Preencha todos os dados obrigatórios." });
    }
})


routes.put("/teams/:id", (req,res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);

        const team = DB.teams.find((c) => c.id == id);
        if (team != undefined) {
            const {
                nome,
                cidade,
                estado,
                serie,
                titulos,
                folhaDePagamento,
            } = req.body;
            if (nome != undefined)              team.nome = nome;
            if (cidade != undefined)            team.cidade = cidade;
            if (estado != undefined)            team.estado = estado;
            if (serie != undefined)             team.serie = serie;
            if (titulos != undefined)           team.titulos = titulos;
            if (folhaDePagamento != undefined)  team.folhaDePagamento = folhaDePagamento;
            res.status(200).json({ msg: "Time atualizado com sucesso." });
        } else {
            res.status(404).json({ msg: "Time não encontrado." });
        }
    }
})

routes.delete("/teams/:id", (req,res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const team = DB.teams.find((c) => c.id == id);
        const index = DB.teams.findIndex((c)=> c.id == id);
        if (index == -1) res.status(404).json({ msg: "Time não existe." });
        else{
            DB.teams.splice(index,1);
            res.status(200).json({ msg: "Time excluido com sucesso." })
        }
    }
})

module.exports = routes;
