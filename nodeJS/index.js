const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const http = require("http").Server(app);


//require("./back/routes")(express, app, http);

let PORT = 5000;
//Start serveur
http.listen(PORT, () => {
    console.log("Serveur lancé sur http://localhost:" + PORT);
});

const connexionConfig = { host: "localhost", user: "root", password: "", database: "company" };

let connexion;

(async () => {
    try {
        connexion = await mysql.createConnection(connexionConfig);
        console.log("Connecté à la base de données MySQL!");
    } catch (error) {
        console.error("Erreur lors de la connexion à MySQL :", error);
        process.exit(1);
    }
})();

//  Chercher un employé à partir de son identifiant

app.get('/getEmployeeById/:id',async function (req, res) {
    res.send( await getEmployeeById(req.params.id));
})

const getEmployeeById = async (employeeId) => {
    try {
    const [results, fields] = await connexion.query('SELECT * FROM employees where id=?', [employeeId])
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

//  Chercher un manager en fonction du service

app.get('/getManagerByServiceId/:id',async function (req, res) {
    res.send( await getManagerByServiceId(req.params.id));
})

const getManagerByServiceId = async (serviceId) => {
    try {
    const [results, fields] = await connexion.query(`SELECT * 
        FROM employees 
        INNER JOIN manage 
        ON employees.id = manage.employee_id 
        WHERE manage.service_id = ?;`, [serviceId])
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

//  ajouter un salarié

app.get('/addEmployee',async function (req, res) {
    res.send( await addEmployee(req.query.first_name, req.query.last_name, req.query.email, req.query.salary, req.query.service_id));
})

const addEmployee = async (first_name, last_name, email, salary, service_id) => {
    try {
    const [results, fields] = await connexion.query(`INSERT INTO employees (first_name, last_name, email, salary, service_id) 
        VALUES (?, ?, ?, ?, ?);`, [first_name, last_name, email, salary, service_id]);
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

//  supprimer un salarié

app.get('/deleteEmployeeByid/:id',async function (req, res) {
    res.send( await deleteEmployeeByid(req.params.id));
})

const deleteEmployeeByid = async (employeeId) => {
    try {
    const [results, fields] = await connexion.query(`DELETE FROM employees WHERE id = ?;`,[employeeId]);
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

//  modifier un salarié

app.get('/updateEmployeeByid/:id',async function (req, res) {
    res.send( await updateEmployeeByid(req.params.id, req.query.first_name, req.query.last_name, req.query.email, req.query.salary, req.query.service_id));
})

const updateEmployeeByid = async (employeeId,first_name, last_name, email, salary, service_id) => {
    try {
    const [results, fields] = await connexion.query(`UPDATE employees
            SET first_name = ?, last_name = ?, email = ?, salary = ?, service_id = ?
            WHERE id = ?;
        `,[first_name, last_name, email, salary, service_id,employeeId]);
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

// Ajouter un service

app.get('/addService', async function (req, res) {
    res.send(await addService(req.query.name, req.query.office_number));
});

const addService = async (name, office_number) => {
    try {
        const [results] = await connexion.query(
            `INSERT INTO services (name, office_number) VALUES (?, ?);`,
            [name, office_number]
        );
        return results;
    } catch (error) {
        console.error("Erreur dans addService :", error);
        throw error;
    }
};

// Supprimer un service
app.get('/deleteServiceById/:id', async function (req, res) {
    res.send(await deleteServiceById(req.params.id));
});

const deleteServiceById = async (serviceId) => {
    try {
        const [results] = await connexion.query(
            `DELETE FROM services WHERE id = ?;`,
            [serviceId]
        );
        return results;
    } catch (error) {
        console.error("Erreur dans deleteServiceById :", error);
        throw error;
    }
};

// Modifier un service
app.get('/updateServiceById/:id', async function (req, res) {
    res.send(
        await updateServiceById(req.params.id, req.query.name, req.query.office_number)
    );
});

const updateServiceById = async (serviceId, name, office_number) => {
    try {
        const [results] = await connexion.query(
            `UPDATE services
             SET name = ?, office_number = ?
             WHERE id = ?;`,
            [name, office_number, serviceId]
        );
        return results;
    } catch (error) {
        console.error("Erreur dans updateServiceById :", error);
        throw error;
    }
};

//executer chaque procédure

app.get('/procedure-difference-salaire', async function (req, res) {
    res.send(await procedureDifferenceSalaire(req.params.id));
});

const procedureDifferenceSalaire = async () => {
    try {
    const [results, fields] = await connexion.query('SELECT differenceSalaireMax()')
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

app.get('/procedure-liste-manager-service', async function (req, res) {
    res.send(await procedureListeManagerDesService(req.params.id));
});

const procedureListeManagerDesService = async () => {
    try {
    const [results, fields] = await connexion.query('CALL ListeManagerDesService()')
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

app.get('/procedure-top-service-salariale', async function (req, res) {
    res.send(await proceduretop3DesServiceMasseSalariale(req.params.id));
});

const proceduretop3DesServiceMasseSalariale = async () => {
    try {
    const [results, fields] = await connexion.query('CALL top3DesServiceMasseSalariale()')
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

app.get('/procedure-nombre-employees-par-service', async function (req, res) {
    res.send(await ProcedureNombreEmployeesParService(req.params.id));
});

const ProcedureNombreEmployeesParService = async () => {
    try {
    const [results, fields] = await connexion.query('CALL ProcedureNombreEmployeesParService()')
    return results;
    } catch (error) {
    console.log(error)
    return null;
    }
}

// ListeManagerDesService