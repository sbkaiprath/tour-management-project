const Trending = require("../schemas/Trending");

// Create and Save a new Trending
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body)

    // Create a Item
    const item = new Trending({
        item_name: req.body.item_name,
        place_address: req.body.place_address,
        item_price: req.body.item_price,
        item_description: req.body.item_description,
        item_imageUrl: req.body.item_imageUrl,
        rating: req.body.rating
    });

    // Save Item in the database
    Trending.create(item, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Item."
            });
        else res.json(data);
    });

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Trending.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving trending items."
            });
        } else res.json(data);
        //console.log(data)
    });

};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Trending.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retreiving one item"
            });

        } else res.json(data);
    })

};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Trending.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                message: err.message || "Some error occured while retreiving one item"
            });
        }
        var item = {...req.body }
        req.body = {...data }
        var n = 0
        for (key in item) {
            if (req.body[key] === item[key]) {
                n += 1
                if (n === Object.keys(item).length) {
                    res.status(406).json({ message: 'Value already existed' })
                    return;
                }
            }

            req.body[key] = item[key]
        }



        Trending.updateById(req.params.id, new Trending(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found item with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating Customer with id " + req.params.id
                        });
                    }
                } else res.send(data);
            }

        )
    });
};

// Delete a item with the specified itemId in the request
exports.deleteOne = (req, res) => {
    Trending.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                message: err.message || "Some error occured while delete one item"
            });
        } else res.status(200).json({
            success: true,
            data: data
        });

    })


};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};