const knex = require('knex');

class DataTable {

    constructor(db, table, primaryKeyName = 'id'){
        this.primaryKeyName = primaryKeyName;
        this.db = () => db(table);
    }

    get(){
        return this.db();
    }

    getByPrimaryKey(id){
        return this.db()
                   .where({ [this.primaryKeyName]: id})
                   .first()
    }

    insert(item){
        return this.db()
                   .insert(item)
                   .then( primaryKeys => this.getByPrimaryKey(primaryKeys[0]) );
    }

    update(id, updates){
        return this.db()
                   .where({[this.primaryKeyName]: id})
                   .update(updates);
    }

    delete(id){
        return this.db()
                   .where({[this.primaryKeyName]: id})
                   .del();
    }

}

module.exports = DataTable;