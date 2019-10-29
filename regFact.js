module.exports = function regFact(pool) {
    var regList = {};
    var error = ''
    var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/i
    var check;
    var linkTables1;
    var linkTables2;
    var linkTables3;


    function newObj() {
        var myKeys = Object.keys(regList)
    }

    async function stored(regs) {
        var reg2 = regs.toUpperCase().trim()
        var myTest = regex.test(reg2);
        if (reg2.length > 0 && reg2.length <= 10 && myTest == false) {
            if (reg2.startsWith('CA ') || reg2.startsWith('CY ') || reg2.startsWith('CL ')) {
                check = await pool.query('select distinct description, mytowns_id from myregnumbers')
                if (regList[reg2] === undefined){
                    regList[reg2] = 0;
                }

                if (reg2.startsWith('CL ')) {
                    await pool.query('insert into myregnumbers (description, mytowns_id) values ($1, $2)', [reg2, 3]);
                    linkTables1 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 3;')
                    
                }

                if (reg2.startsWith('CA ')) {
                   // await pool.query('insert into myregnumbers (description, mytowns_id) values ($1, $2)', [reg2, 1]);
                    linkTables2 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 1;')
                    
                }

                if (reg2.startsWith('CY ')) {
                   // await pool.query('insert into myregnumbers (description, mytowns_id) values ($1, $2)', [reg2, 2]);
                    linkTables3 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 2;')
                    
                }
            }
        }
        



    }

    async function linking1() {
        linkTables1 = await pool.query('SELECT mytowns.description, myregnumbers.description FROM mytowns INNER JOIN myregnumbers ON mytowns.id = myregnumbers.mytowns_id WHERE mytowns.id = 3;')
        return linkTables1.rows
    }

    async function linking2() {
        return linkTables2.rows
    }

    async function linking3() {
        return linkTables3.rows
    }

    async function checking() {
        check = await pool.query('select distinct description, mytowns_id from myregnumbers')
        return check.rows
    }

    function theReg(first) {
        var theRegs = Object.keys(regList)
        var myObj = {}
        for (var i = 0; i < theRegs.length; i++) {
            if (theRegs[i].startsWith(first)) {
                myObj[theRegs[i]] = 0;
            }
        }
        return (myObj)

    }


    function show() {
        var str = regList
        var loc = Object.keys(str)
        for (var j = 0; j < loc.length; j++) {
            var final = loc[j]
            return final
        }

    }



    return {
        stored,
        theReg,
        show,
        newObj,
        checking,
        linking1,
        linking2,
        linking3
    }
}

