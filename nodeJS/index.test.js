const mysql = require("mysql2");
jest.mock("mysql2");

const connexion = {
    promise: jest.fn().mockReturnThis(),
    query: jest.fn(),
};

mysql.createConnection = jest.fn(() => connexion);

const {
    addEmployee,
    deleteEmployeeByid,
    updateEmployeeByid,
} = require("./index.js");

describe("Employee Functions", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("addEmployee - ajoute un employé avec succès", async () => {
        connexion.query.mockResolvedValue([{ insertId: 1 }]);

        const result = await addEmployee(
            "John",
            "Doe",
            "john.doe@example.com",
            50000,
            1
        );

        expect(result.insertId).toBe(1);
        expect(connexion.query).toHaveBeenCalledWith(
            `INSERT INTO employees (first_name, last_name, email, salary, service_id) VALUES (?, ?, ?, ?, ?);`,
            ["John", "Doe", "john.doe@example.com", 50000, 1]
        );
    });

    test("deleteEmployeeByid - supprime un employé avec succès", async () => {
        connexion.query.mockResolvedValue([{ affectedRows: 1 }]);

        const result = await deleteEmployeeByid(1);

        expect(result.affectedRows).toBe(1);
        expect(connexion.query).toHaveBeenCalledWith(
            `DELETE FROM employees WHERE id = ?;`,
            [1]
        );
    });

    test("updateEmployeeByid - met à jour un employé avec succès", async () => {
        connexion.query.mockResolvedValue([{ affectedRows: 1 }]);

        const result = await updateEmployeeByid(
            1,
            "Jane",
            "Smith",
            "jane.smith@example.com",
            60000,
            2
        );

        expect(result.affectedRows).toBe(1);
        expect(connexion.query).toHaveBeenCalledWith(
            `UPDATE employees SET first_name = ?, last_name = ?, email = ?, salary = ?, service_id = ? WHERE id = ?;`,
            ["Jane", "Smith", "jane.smith@example.com", 60000, 2, 1]
        );
    });
});

