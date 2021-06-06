let conn = require('./dbConnection')

module.exports = {
    getWorkers: () => {        
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM workers'
            conn.query(sqlQuery, [], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    insertWorker: (worker) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO workers (first_name, last_name, phone, cell_phone, email, tax_bar_num, role, username, password) VALUES (?,?,?,?,?,?,?,?,?)`

            conn.query(sqlQuery, [worker.firstName, worker.lastName, worker.phone, worker.cellPhone, worker.email, worker.taxBarNum,
                worker.workerRole, worker.username, worker.password], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getPlaintiffs: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM plaintiffs'
            conn.query(sqlQuery, [], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getDefendants: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM defendants'
            conn.query(sqlQuery, [], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getPlaintiff: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM plaintiffs WHERE id = ?'
            conn.query(sqlQuery, [id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res[0])
            })
        })
    },

    getDefendant: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM defendants WHERE id = ?'
            conn.query(sqlQuery, [id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res[0])
            })
        })
    },

    addPlaintiff: (plaintiff) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO plaintiffs (first_name, last_name, type, date_added) VALUES (?,?,?,?)'
            conn.query(sqlQuery, [plaintiff.firstName, plaintiff.lastName, plaintiff.type, plaintiff.dateAdded], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    addDefendant: (defendant) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO defendants (first_name, last_name, type, date_added) VALUES (?,?,?,?)'
            conn.query(sqlQuery, [defendant.firstName, defendant.lastName, defendant.type, defendant.dateAdded], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    updatePlaintiff: (plaintiff) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE plaintiffs SET first_name = ?, last_name = ?, type = ?, date_added = ?, 
            address = ?, city = ?, state = ?, zip = ?, phone = ?, alt_phone = ?, ssn = ?, 
            driver_license = ?, email = ?, fax_number = ?, sopa_name = ?, sopa_address = ? WHERE id = ?`
            conn.query(sqlQuery, [plaintiff.firstName, plaintiff.lastName, plaintiff.type, plaintiff.dateAdded, plaintiff.address,
                plaintiff.city, plaintiff.state, plaintiff.zip, plaintiff.phone, plaintiff.altPhone, plaintiff.ssn, plaintiff.license,
                plaintiff.email, plaintiff.faxNumber, plaintiff.sopaName, plaintiff.sopaAddress, plaintiff.id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    updateDefendant: (defendant) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE defendants SET first_name = ?, last_name = ?, type = ?, date_added = ?, address = ?, 
            city = ?, state = ?, zip = ?, phone = ?, alt_phone = ?, ssn = ?, driver_license = ?, email = ?, fax_number = ?, 
            sopa_name = ?, sopa_address = ? WHERE id = ?`
            conn.query(sqlQuery, [defendant.firstName, defendant.lastName, defendant.type, defendant.dateAdded, defendant.address,
                defendant.city, defendant.state, defendant.zip, defendant.phone, defendant.altPhone, defendant.ssn, defendant.license,
                defendant.email, defendant.faxNumber, defendant.sopaName, defendant.sopaAddress, defendant.id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    addCase: (caseDetails) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO cases (type, sub_type, assigned_to, legal_assistant, court_number, judge, place, court_type, date) 
            VALUES(?,?,?,?,?,?,?,?,?)`
            conn.query(sqlQuery, [caseDetails.caseType, caseDetails.caseSubType, caseDetails.assignedTo, caseDetails.legalAssistant, caseDetails.courtNumber,
                caseDetails.judge, caseDetails.place, caseDetails.courtType, caseDetails.caseDate], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    updateCase: (caseDetails) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE cases SET type = ?, sub_type = ?, assigned_to = ?, legal_assistant = ?, court_number = ?, 
            judge = ?, place = ?, court_type = ?, date = ? WHERE id = ?`
            conn.query(sqlQuery, [caseDetails.caseType, caseDetails.caseSubType, caseDetails.assignedTo, caseDetails.legalAssistant, caseDetails.courtNumber, 
                caseDetails.judge, caseDetails.place, caseDetails.courtType, caseDetails.caseDate, caseDetails.caseId], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    addCasePlaintiffs: (caseId, plaintiffId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO case_plaintiffs (case_id, plaintiff_id) VALUES(?,?)'
            conn.query(sqlQuery, [caseId, plaintiffId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    addCaseDefendants: (caseId, defendantId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO case_defendants (case_id, defendant_id) VALUES(?,?)'
            conn.query(sqlQuery, [caseId, defendantId], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getCasePlaintiffs: (caseId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT plaintiffs.* FROM case_plaintiffs INNER JOIN plaintiffs ON case_plaintiffs.plaintiff_id = plaintiffs.id WHERE case_plaintiffs.case_id = ?'
            conn.query(sqlQuery, [caseId], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getCaseDefendants: (caseId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT defendants.* FROM case_defendants INNER JOIN defendants ON case_defendants.defendant_id = defendants.id WHERE case_defendants.case_id = ?'
            conn.query(sqlQuery, [caseId], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getLastCase: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM cases ORDER BY id DESC LIMIT 1'
            conn.query(sqlQuery, [], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getCurrentPlaintiffs: (numPlaintiffs) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM plaintiffs ORDER BY id DESC LIMIT ?'
            conn.query(sqlQuery, [numPlaintiffs], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getCurrentDefendants: (numDefendants) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM defendants ORDER BY id DESC LIMIT ?'
            conn.query(sqlQuery, [numDefendants], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    checkLoginDetails: (username, password) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM workers WHERE username = ? AND password = ?'
            conn.query(sqlQuery, [username, password], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    addActivity: (activity) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO activities (title, description, start_date_time, end_date_time, case_id, created_by) VALUES (?,?,?,?,?,?)'
            conn.query(sqlQuery, [activity.title, activity.desc, activity.startDateTime, activity.endDateTime, activity.caseID, activity.createdBy], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getCaseById: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM cases WHERE id = ?'
            conn.query(sqlQuery, [id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res[0])
            })
        })
    },

    getActivitiesAll: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT activities.id, activities.title, activities.description, activities.case_id, activities.created_by,
             activities.status, DATE_FORMAT(activities.start_date_time, "%Y-%m-%d %H:%i") AS start_date_time, 
             DATE_FORMAT(activities.end_date_time, "%Y-%m-%d %H:%i") AS end_date_time, workers.first_name AS worker_fname, 
             workers.last_name AS worker_lname FROM activities INNER JOIN cases ON activities.case_id = cases.id 
             INNER JOIN workers ON cases.assigned_to = workers.id`
            conn.query(sqlQuery, [], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getActivities: (creatorId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT activities.id, activities.title, activities.description, activities.case_id, 
            activities.created_by, activities.status, DATE_FORMAT(activities.start_date_time, "%Y-%m-%d %H:%i") 
            AS start_date_time, DATE_FORMAT(activities.end_date_time, "%Y-%m-%d %H:%i") AS end_date_time, workers.first_name 
            AS worker_fname, workers.last_name AS worker_lname FROM activities INNER JOIN cases ON activities.case_id = cases.id 
            AND cases.assigned_to = ? INNER JOIN workers ON cases.assigned_to = workers.id`
            conn.query(sqlQuery, [creatorId], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    updateActivityStatus: (id, status) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'UPDATE activities SET status = ? WHERE id = ?'
            conn.query(sqlQuery, [status, id], (err, res) => {
                if (err)
                    reject(err)
                else 
                    resolve(res)
            })
        })
    },

    updateActivity: (activity) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'UPDATE activities SET title = ?, description = ?, start_date_time = ?, end_date_time = ?, status = ? WHERE id = ?'
            conn.query(sqlQuery, [activity.title, activity.desc, activity.startDateTime, activity.endDateTime, activity.status, activity.id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getLegalDetailsByCaseId: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM legal_details WHERE case_id = ? LIMIT 1'
            conn.query(sqlQuery, [id], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res[0])
            })
        })
    },

    addLegalDetails: (legalDetails) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO legal_details (case_id, trial_date, client_matter_number, address, phone, alt_phone, city, state, zip) VALUES (?,?,?,?,?,?,?,?,?)'
            conn.query(sqlQuery, [legalDetails.caseId, legalDetails.trialDate, legalDetails.clientMatterNumber, legalDetails.address, legalDetails.phone,
                legalDetails.altPhone, legalDetails.city, legalDetails.state, legalDetails.zip], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    updateLegalDetails: (legalDetails) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE legal_details SET trial_date = ?, client_matter_number = ?, address = ?, phone = ?, 
            alt_phone = ?, city = ?, state = ?, zip = ? WHERE case_id = ? LIMIT 1`
            conn.query(sqlQuery, [legalDetails.trialDate, legalDetails.clientMatterNumber, legalDetails.address, legalDetails.phone,
                legalDetails.altPhone, legalDetails.city, legalDetails.state, legalDetails.zip, legalDetails.caseId], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getActivity: (activityId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT activities.*, cases.id AS case_id, cases.type AS case_type, cases.sub_type AS case_sub_type, ' +
                'cases.assigned_to, CONCAT(workers.first_name, " ", workers.last_name) AS worker_name FROM activities ' +
                'INNER JOIN cases ON activities.case_id = cases.id INNER JOIN workers ON cases.assigned_to = workers.id WHERE activities.id = ?'
            conn.query(sqlQuery, [activityId], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res[0])
            })
        })
    },

    insertIntoNotes: (noteTitle, noteDetail, time, chargeID, activityID, caseID, createdBy) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO notes(note_title, note_detail, time, charge_id, activity_id, case_id, created_by) VALUES(?,?,?,?,?,?,?)'
            conn.query(sqlQuery, [noteTitle, noteDetail, time, chargeID, activityID, caseID, createdBy], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    insertIntoDocuments: (chargesID, notesID, filePath, type, activityID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO documents(charges_id, notes_id, file_path, type, activity_id) VALUES(?,?,?,?,?)'
            conn.query(sqlQuery, [chargesID, notesID, filePath, type, activityID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    insertIntoCharges: (caseID, unit, unitCost, timePeriod, time, userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO charges(case_id, unit, unit_cost, time_period, time, created_by) VALUES(?,?,?,?,?,?)'
            conn.query(sqlQuery, [caseID, unit, unitCost, timePeriod, time, userID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    updateCurrentMoney: (amount, caseID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'UPDATE cases SET current_money = current_money + ? WHERE id = ?'
            conn.query(sqlQuery, [amount, caseID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    insertChargeNote: (noteTitle, noteDetail, time, chargeID, activityID, caseID, createdBy) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO notes(note_title, note_detail, time, charge_id, activity_id, case_id, created_by) VALUES(?,?,?,?,?,?,?)'
            conn.query(sqlQuery, [noteTitle, noteDetail, time, chargeID, activityID, caseID, createdBy], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    insertIntoDeposits: (caseID, depositAmount, time, userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO deposits(case_id, deposit, time, created_by) VALUES(?,?,?,?)'
            conn.query(sqlQuery, [caseID, depositAmount, time, userID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    updateCurrentMoneyAfterDeposit: (depositAmount, caseID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'UPDATE cases SET current_money = current_money - ? WHERE id = ?'
            conn.query(sqlQuery, [depositAmount, caseID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getAllNotes: (caseID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT notes.case_id, notes.id as note_id, notes.note_title, DATE_FORMAT(notes.time, "%Y-%m-%d %H:%i") AS time, notes.charge_id, notes.activity_id,
             workers.first_name, workers.last_name, workers.id as worker_id FROM notes INNER JOIN workers 
             ON notes.created_by = workers.id WHERE notes.case_id = ?`
            conn.query(sqlQuery, [caseID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getCurrentUserNotes: (caseID, userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT notes.case_id, notes.id as note_id, notes.note_title, DATE_FORMAT(notes.time, "%Y-%m-%d %H:%i") AS time, notes.charge_id, notes.activity_id,
            workers.first_name, workers.last_name, workers.id as worker_id FROM notes INNER JOIN workers
            ON notes.created_by = workers.id WHERE case_id = ? AND created_by = ?`
            conn.query(sqlQuery, [caseID, userID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getNote: (noteID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT notes.id, notes.note_title, notes.note_detail, notes.charge_id, notes.activity_id, 
            notes.case_id, notes.created_by, DATE_FORMAT(notes.time, "%Y-%m-%d %H:%i") AS time FROM notes WHERE id = ?`
            conn.query(sqlQuery, [noteID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getWorkerFromNoteId: (noteID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT notes.created_by, workers.first_name, workers.last_name FROM notes INNER JOIN workers ON notes.created_by = workers.id WHERE notes.id = ?`
            conn.query(sqlQuery, [noteID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getActivityAttachedFilesFromNoteId: (noteID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM documents WHERE activity_id = ?`
            conn.query(sqlQuery, [noteID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getChargeAttachedFilesFromNoteId: (noteID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM documents WHERE charges_id = ?`
            conn.query(sqlQuery, [noteID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getNoteAttachedFilesFromNoteId: (noteID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM documents WHERE notes_id = ?`
            conn.query(sqlQuery, [noteID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getChargesByCaseId: (caseID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT charges.id AS charge_id, charges.case_id, charges.unit, charges.unit_cost, 
            charges.time_period, DATE_FORMAT(charges.time, "%Y-%m-%d %H:%i") AS time, charges.created_by, charges.unit_cost * charges.time_period AS total_amount, 
            workers.first_name, workers.last_name FROM charges INNER JOIN workers ON charges.created_by = workers.id 
            WHERE charges.case_id = ?`
            conn.query(sqlQuery, [caseID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getCurrentUserCharges: (caseID, userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT charges.id AS charge_id, charges.case_id, charges.unit, charges.unit_cost, 
            charges.time_period, DATE_FORMAT(charges.time, "%Y-%m-%d %H:%i") AS time, charges.created_by, charges.unit_cost * charges.time_period AS total_amount, 
            workers.first_name, workers.last_name FROM charges INNER JOIN workers ON charges.created_by = workers.id 
            WHERE charges.case_id = ? AND created_by = ?`
            conn.query(sqlQuery, [caseID, userID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getCharge: (chargeID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT charges.id as charge_id, charges.case_id, charges.unit, charges.unit_cost, 
            charges.time_period, charges.created_by,DATE_FORMAT(charges.time, "%Y-%m-%d %H:%i") AS time, notes.id as note_id, note_title, 
            notes.note_detail, workers.first_name, workers.last_name FROM charges INNER JOIN notes ON charges.id = notes.charge_id 
            INNER JOIN workers ON charges.created_by = workers.id WHERE charges.id = ?`
            conn.query(sqlQuery, [chargeID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getChargeAttachedFilesFromChargeID: (chargeID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM documents WHERE charges_id = ?`
            conn.query(sqlQuery, [chargeID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getAllDepositsFromCaseId: (caseID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT deposits.deposit_id, deposits.case_id, deposits.deposit AS deposit_amount, 
            deposits.time, deposits.created_by, workers.first_name, workers.last_name FROM deposits 
            INNER JOIN workers ON deposits.created_by = workers.id WHERE deposits.case_id = ?`
            conn.query(sqlQuery, [caseID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    },

    getDepositByDepositId: (depositID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT deposits.deposit_id, deposits.case_id, deposits.deposit AS amount, 
            deposits.time, deposits.created_by, workers.first_name, workers.last_name FROM deposits 
            INNER JOIN workers ON deposits.created_by = workers.id WHERE deposits.deposit_id = ?`
            conn.query(sqlQuery, [depositID], (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }

}

