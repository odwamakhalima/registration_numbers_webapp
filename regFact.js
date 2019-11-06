module.exports = function regFact(pool) {
    var regList = {};
    var final = [];
    var error = ''
    var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/g
    var check;
    var linkTables1;
    var linkTables2;
    var linkTables3;
    var store;

    function newObj() {
        var myKeys = Object.keys(regList)
    }

    async function stored(regs) {
        var reg2 = regs.toUpperCase().trim()
        var myTest = regex.test(reg2);

        if (reg2.length > 0 && reg2.length <= 10 && myTest == false) {
            if (reg2.startsWith('CA ') || reg2.startsWith('CY ') || reg2.startsWith('CL ')) {
                store = await pool.query('select * from myregnumbers WHERE description = $1', [reg2])

                if (store.rows.length === 0) {
                    if (regList[reg2] === undefined) {
                        regList[reg2] = 0;
                        check = await pool.query('select distinct description, mytowns_id from myregnumbers')
                    }

                    if (reg2.startsWith('CL ')) {
                        await pool.query('insert into myregnumbers (description, mytowns_id) values ($1, $2)', [reg2, 3]);
                        linkTables1 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 3;')

                    }

                    if (reg2.startsWith('CA ')) {
                        await pool.query('insert into myregnumbers (description, mytowns_id) values ($1, $2)', [reg2, 1]);
                        linkTables2 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 1;')

                    }

                    if (reg2.startsWith('CY ')) {
                        await pool.query('insert into myregnumbers (description, mytowns_id) values ($1, $2)', [reg2, 2]);
                        linkTables3 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 2;')

                    }
                }
            }
        }
    }

    async function linking1() {
        linkTables1 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 3;')
        final = linkTables1.rows
    }

    async function linking2() {
        linkTables2 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 1;')
        final = linkTables2.rows

    }

    async function linking3() {
        linkTables3 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 2;')
        final = linkTables3.rows

    }

    async function duplicates() {
        return store.rowCount
    }

    async function checking() {
        check = await pool.query('select distinct description, mytowns_id from myregnumbers')
        final = check.rows
    }

    async function finalResults() {
        return final
    }

    async function resetBtn() {
        var restart = await pool.query('delete from myregnumbers')
        return restart
        
    }

    return {
        stored,
        resetBtn,
        newObj,
        checking,
        linking1,
        linking2,
        linking3,
        duplicates,
        finalResults
    }
}

