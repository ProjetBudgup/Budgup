var express = require('express');
var router = express.Router();
var BankOperation = require('../models/bankoperation');
var multer  = require('multer');
var upload = multer();

// Create a new debt
router.post('/bankoperations', function(req, res, next) {
    /*
     `BankOperation.create` will send a request to the Data System in order to create
     a new document of type "BankOperation".
     `req.body` is the request's body, it is here assumed that it exists and
     is a valid JavaScript object, matching the schema defined in the model.

     */
    BankOperation.create(req.body, function(err, bankop) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send the newly created debt with the
             correct HTTP status.
             */
            res.status(201).send(bankop);
        }
    });
});


// Fetch an existing debt
router.get('/bankoperations/:id', function(req, res, next) {
    /*
     `BankOperation.find` sends a request to the Data System to fetch the document
     whose ID is given as a parameter.

     `req.params.id` is automatically generated by Express, based on the
     route defined above.
     */
    BankOperation.find(req.params.id, function(err, bankop) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send the fetched debt with the correct
             HTTP status.
             */
            res.status(200).send(bankop);
        }
    });
});


// Update an existing bankop
router.put('/bankoperations/:id', function(req, res, next) {
    /*
     First, get the document we want to update.
     */
    BankOperation.find(req.params.id, function(err, bankop) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else if(!bankop) {
            /*
             If there was no unexpected error, but that the document has not
             been found, send the legitimate status code. `debt` is null.
             */
            res.sendStatus(404);
        } else {
            /*
             `BankOperation.updateAttributes` sends a request to the Data System to
             update the document, given its ID and the fields to update.
             */
            debt.updateAttributes(req.body, function(err, bankop) {
                if(err) {
                    /*
                     If an unexpected error occurs, forward it to Express
                     error middleware which will send the error properly
                     formatted.
                     */
                    next(err);
                } else {
                    /*
                     If everything went well, send the fetched debt with the
                     correct HTTP status.
                     */
                    res.status(200).send(bankop);
                }
            });
        }

    });
});


// Remove an existing bankop
router.delete('/bankoperations/:id', function(req, res, next) {
    /*
     `BankOperation.destroy` sends a request to the Data System to update
     the document, given its ID.
     */
    BankOperation.destroy(req.params.id, function(err) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send an empty response with the correct
             HTTP status.
             */
            res.sendStatus(204);
        }
    });
});


// List of all bankoperations, for a given creditor
router.get('/bankoperations', function(req, res, next) {
    /*
     `BankOperation.request` asks the data system to request a CouchDB view, given its
     name.
     */
    BankOperation.request('all', function(err, bankoperations) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send the list of documents with the
             correct HTTP status code and content type.
             */
            res.status(200).json(bankoperations);
        }
    });
});
//Algo de base: plus de trois mois
router.get('/get_operations1', function(req, res, next) {
    /*
     `BankOperation.request` asks the data system to request a CouchDB view, given its
     name.
     */

    BankOperation.request('all', function(err, bankoperations) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send the list of documents with the
             correct HTTP status code and content type.
             */

            var obj = {};
            for (var i = 0; i < bankoperations.length; i++) {
                var count = 1;
                if (typeof obj[bankoperations[i].raw] !== "undefined") {
                    count = obj[bankoperations[i].raw].count + 1;
                } else {
                    obj[bankoperations[i].raw] = bankoperations[i];
                }
                if (bankoperations[i].date > obj[bankoperations[i].raw].date) {
                    obj[bankoperations[i].raw].date = bankoperations[i].date;
                }
                obj[bankoperations[i].raw].count = count;
            }

            var last2MonthsDate = new Date();
            last2MonthsDate.setMonth(last2MonthsDate.getMonth() - 2);

            var operations = [];
            for (var x in obj) {
                if (obj[x].count > 2) {
                    if (obj[x].date >= last2MonthsDate) {
                        operations.push(obj[x]);
                    }
                }
            }

            res.status(200).json(operations);
        }
    });
});

//Algo: already paid

//Algo de base: plus de trois mois
router.get('/get_operations2', function(req, res, next) {
    /*
     `BankOperation.request` asks the data system to request a CouchDB view, given its
     name.
     */

    BankOperation.request('all', function(err, bankoperations) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send the list of documents with the
             correct HTTP status code and content type.
             */

            var obj = {};

            var lastMonthDate = new Date();

            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            for (var i = 0; i < bankoperations.length; i++) {
                if (bankoperations[i].date < lastMonthDate) { // ne pas inclure les opérations du mois courant
                    var count = 1;
                    if (typeof obj[bankoperations[i].raw] !== "undefined") {
                        count = obj[bankoperations[i].raw].count + 1;
                    } else {
                        obj[bankoperations[i].raw] = bankoperations[i];
                    }
                    if (bankoperations[i].date > obj[bankoperations[i].raw].date) {
                        obj[bankoperations[i].raw].date = bankoperations[i].date;
                    }
                    obj[bankoperations[i].raw].count = count;
                }
            }

            var last2MonthsDate = new Date();
            last2MonthsDate.setMonth(last2MonthsDate.getMonth() - 2);

            var currentDay = new Date();
            var startOfCurrentMonth = currentDay.setDate(01);

            var operations = [];
            for (var x in obj) {
                if (obj[x].count > 2) {
                    if (obj[x].date >= last2MonthsDate && obj[x].date < startOfCurrentMonth) { // On enlève les opérations du mois déjà payées
                        operations.push(obj[x]);
                    }
                }
            }


            res.status(200).json(operations);
        }
    });
});



//Algo : min max + les deux premiers
// List of all bankoperations, for a given creditor
router.get('/get_operations', function(req, res, next) {
    /*
     `BankOperation.request` asks the data system to request a CouchDB view, given its
     name.
     */

    BankOperation.request('all', function(err, bankoperations) {
        if(err) {
            /*
             If an unexpected error occurs, forward it to Express error
             middleware which will send the error properly formatted.
             */
            next(err);
        } else {
            /*
             If everything went well, send the list of documents with the
             correct HTTP status code and content type.
             */

            var obj = {};
            var operation_title = "";

            var lastMonthDate = new Date();

            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

            for (var i = 0; i < bankoperations.length; i++) {
                operation_title = bankoperations[i].raw; // titre de l'opération
                var count = 1;
                var min = 0;
                var max = 0;

                if (bankoperations[i].date < lastMonthDate) { // ne pas inclure les opérations du mois courant

                if (typeof obj[operation_title] !== "undefined") {
                    count = obj[operation_title].count + 1; // si l'opération existe déjà dans la variable "obj", on incrémente "count" de l'operation
                    //obj[operation_title].amount += bankoperations[i].amount;

                    // On compare le min et le max
                     if(bankoperations[i].amount < min){
                         obj[operation_title].min = bankoperations[i].amount;
                         obj[operation_title].max = obj[operation_title].amount;

                     } else if (bankoperations[i].amount > max){
                        obj[operation_title].max = bankoperations[i].amount;
                        obj[operation_title].min = obj[operation_title].amount;
                     }

                } else {
                    obj[operation_title] = bankoperations[i]; // si l'opération n'existe pas, on l'ajoute à la variable "obj"
                    obj[operation_title].count = 1; // on initialise "count"

                }
                if (bankoperations[i].date > obj[operation_title].date) {
                    obj[operation_title].date = bankoperations[i].date;// date de la dernière opération
                }
                obj[operation_title].count = count;




                }

            }

            var last2MonthsDate = new Date();
            last2MonthsDate.setMonth(last2MonthsDate.getMonth() - 2);

            var currentDay = new Date();

            var operations = [];
            for (var x in obj) {

                if (obj[x].count >= 2 && obj[x].date >= last2MonthsDate && obj[x].date.getDate() > currentDay.getDate() ) {
                    // Modification de l'affichage du mois
                    console.log("mois courrant :" +currentDay.getMonth());
                    obj[x].date.setMonth(currentDay.getMonth());
                    console.log("date objet pushé :" + obj[x].date.getMonth());
                    operations.push(obj[x]);
                }

                }
            }



            res.status(200).json(operations);







    });
});// Upload Function
router.post('/upload', upload.single('file'), function(req, res, next) {
    BankOperation.requestDestroy("all", function() {
        var file = req.file;
        var arr = JSON.parse(file.buffer.toString());
        arr = arr.docs;
        for (var i = 0; i < arr.length; i++) {
            BankOperation.create(arr[i], function (err, bankop) {
                if (err) {
                    console.log("err", err);
                } else {
                    console.log("bankop", bankop);
                }
            });
        }
    });
    res.status(200).json({ success: true });
});

// Export the router instance to make it available from other files.
module.exports = router;

