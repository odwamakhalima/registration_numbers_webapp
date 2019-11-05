module.exports = function regRoute(factoryReg) {

    var finale;
    var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/i
    var regtown;

    async function indexs(req, res) {

        res.render('index', {
            show: regtown,
            showLoc: await factoryReg.checking()
        })
    }

    async function postData(req, res) {
        await factoryReg.stored(req.body.town)

        //console.log(req.body.params);

        var reg = req.body.town
        var myTest = regex.test(reg);

        if (reg.length >= 10 || myTest == true) {
            req.flash('error', 'Registration Number Is Not Valid')
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