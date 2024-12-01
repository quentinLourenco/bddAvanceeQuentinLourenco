const request = require("supertest");
const app = require("./index");

const employe = {
    first_name: 'toto',
    last_name: 'momo',
    email : 'toto@momo.test',
    salary: 1, 
    service_id: 1,
    id: 1
};

const id = 5;
const updateEmployeInfo = { id: 5, last_name: "user5" };

describe("test index js", () => {
  it("test la récuperation d'un employé par id", async () => {
    const response = await request(app).get("/getEmployeeById/1");
    expect(response.status).toBe(200);
  });

  it("test la creation d'un employé", async () => {
    const createEmploye = await request(app).post("/addEmployee").send(employe);
    console.log("response after creating employe", createEmploye);
    expect(createEmploye.status).toBe(200);
    expect(createEmploye.body.isDeleted).toBeFalsy();
  });

  it("test la mise a jour d'un employé", async () => {
    const updateEmploye = await request(app).put("/updateUser").send(updateEmployeInfo);
    expect(updateEmploye.status).toBe(200);
    expect(updateEmploye.body.name).toBe(updateEmploye.name);
  });

  it("test la suppression d'un employé", async () => {
    const deleteEmploye = await request(app).delete("/deleteEmployeeByid").send({ id });
    expect(deleteEmploye.status).toBe(204);
  });
});