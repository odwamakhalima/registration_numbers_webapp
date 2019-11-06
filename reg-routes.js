// var factoryReg2 = require('./regFact.js')
module.exports = function regRoute(factoryReg) {


    var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/g
    var regDrop

    async function indexs(req, res) {

        res.render('index', {
            show: await factoryReg.finalResults(),
        })
    }


    async function postData(req, res) {
        if (req.body.but === 'reset') {
            await factoryReg.resetBtn()
            req.flash('error2', 'The Data Has Been Deleted')

        }
        else {

            await factoryReg.stored(req.body.town)

            var dup = await factoryReg.duplicates();

            var reg = req.body.town
            var myTest = regex.test(reg);
            if (reg.length <= 10 && myTest == false) {
                if (reg.startsWith('ca ') || reg.startsWith('cy ') || reg.startsWith('cl ') || reg.startsWith('CA ') || reg.startsWith('CY ') || reg.startsWith('CL ')) {
                    if (dup >= 1) {
                        req.flash('error', 'Already Been Added')
                    }
                    else {
                        req.flash('error2', 'Added The Registration')
                    }
                }
                else {
                    req.flash('error', 'Enter A Correct Location')
                }
            }

            if (myTest == true) {
                req.flash('error', 'Registration Number Is Not Valid')
            }

            if (reg.length <= 0) {
                req.flash('error', 'Please Enter A Registration Number')

            }
        }
        res.redirect('/')
    }
    async function filts(req, res) {


        regDrop = req.body.myReg

        if (regDrop === '') {
            await factoryReg.checking()
        }

        if (regDrop === 'CA') {
            await factoryReg.linking2()
        }

        if (regDrop === 'CY') {
            await factoryReg.linking3()

        }
        if (regDrop === 'CL') {
            await factoryReg.linking1()
        }

        res.redirect('/')
    }

    async function resets(req, res) {


        res.redirect('/')
    }

    return {
        indexs,
        postData,
        filts,
        resets

    }
}

