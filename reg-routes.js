module.exports = function regRoute(factoryReg) {

    var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/g
    var regtown;
    var regDrop

    async function indexs(req, res) {

        res.render('index', {
            show: regtown,
            showLoc: factoryReg.checking(),

        })
    }

    async function postData(req, res) {
        await factoryReg.stored(req.body.town)

       var dup = await factoryReg.duplicates();

        var reg = req.body.town
        var myTest = regex.test(reg);
        if (reg.length <= 10 && myTest == false) {
            if (reg.startsWith('ca ') || reg.startsWith('cy ') || reg.startsWith('cl ') || reg.startsWith('CA ') || reg.startsWith('CY ') || reg.startsWith('CL ')) {
                if(dup >=1){
                    req.flash('error','Already Been Added')
            }
            else{
                req.flash('error2', 'Added The Registration')
            }
        }
        else{
            req.flash('error', 'Enter A Correct Location')
        }
    }
        
        if (myTest == true) {
            req.flash('error', 'Registration Number Is Not Valid')
        }

        if (reg.length <= 0) {
            req.flash('error', 'Please Enter A Registration Number')
        }

        res.redirect('/')
    }

    function filts(req, res) {

        regDrop = req.body.myReg

        regtown = Object.keys(factoryReg.theReg(regDrop));
        for (var i = 0; i < regtown.length; i++) {
            finale = regtown[i]

        }

        res.redirect('/')
    }

    return {
        indexs,
        postData,
        filts
    }
}

