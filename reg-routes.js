module.exports = function regRoute(factoryReg) {

    var finale;
    var regex = /[a-zA-Z0-9]+/g
    var regtown;

    async function indexs(req, res) {

        res.render('index', {
            show: regtown,
            showLoc: factoryReg.checking(),
            errorm: factoryReg.message()

        })
    }

    async function postData(req, res) {
        await factoryReg.stored(req.body.town)

        var reg = req.body.town
        var myTest = regex.test(reg);
        if (reg.length <= 10 && myTest == true) {
            if (reg.startsWith('ca ') || reg.startsWith('cy ') || reg.startsWith('cl ') || reg.startsWith('CA ') || reg.startsWith('CY ') || reg.startsWith('CL ')) {
                req.flash('error2', 'Added The Registration')
            }
        }

        console.log(myTest);
        

        if (myTest == false) {
            req.flash('error', 'Registration Number Is Not Valid')
        }

        if (reg.length <= 0) {
            req.flash('error', 'Please Enter A Registration Number')
        }

        // if (reg.startsWith('ca') === false || reg.startsWith('cy') === false || reg.startsWith('CL') === false) {
        //     req.flash('error', 'Registration Number Not From Given Locations')
        // }

        res.redirect('/')
    }

    function filts(req, res) {


        var regDrop = req.body.myReg

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