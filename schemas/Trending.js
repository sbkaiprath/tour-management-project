//const sql = require("../config/dbSIngle");
const mysql = require('mysql')
const sql = mysql.createConnection({
    host: 'localhost',
    database: 'TOURISMMANAGE',
    user: 'root',
    password: 'password'
});
// constructor
const TrendingItems = function(items) {
    this.item_name = items.item_name,
        this.place_address = items.place_address,
        this.item_price = items.item_price,
        this.item_description = items.item_description,
        this.item_imageUrl = items.item_imageUrl,
        this.rating = items.rating
};

TrendingItems.create = (newItem, result) => {
    sql.query("INSERT INTO trendingItems SET ?", newItem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //console.log("created Item: ", { id: res.insertId, ...newItem });
        result(null, { id: res.insertId, ...newItem });
    });
};

TrendingItems.findById = (itemId, result) => {
    sql.query(`SELECT * FROM trendingItems WHERE item_id = ${itemId}`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log("found item: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Item with the id
        result({ kind: "not_found" }, null);
    });
};



TrendingItems.getAll = (result) => {
    sql.query("SELECT * FROM trendingItems", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("items: ", res);
        result(null, res);
    });

};

TrendingItems.updateById = (id, items, result) => {
    sql.query(
        "UPDATE trendingItems SET item_name = ?, place_address = ?,item_price = ?,item_description = ?,item_imageUrl = ?,rating = ? WHERE item_id = ?", [items.item_name, items.place_address, items.item_price,
            items.item_description, items.item_imageUrl, items.rating, id
        ],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found item with the id
                result({ kind: "not_found" }, null);
                return;
            }

            //console.log("updated customer: ", { id: id, ...items });
            result(null, { id: id, ...items });
        }
    );
};

TrendingItems.remove = (id, result) => {
    sql.query("DELETE FROM trendingItems WHERE item_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted items with id: ", id);
        result(null, res);
    });
};

TrendingItems.removeAll = result => {
    sql.query("DELETE * FROM trendingItems", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} items`);
        result(null, res);
    });
};

module.exports = TrendingItems;