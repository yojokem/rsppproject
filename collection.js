const logger = require("./config/winston")().logger;

module.exports = function (seqMan) {
    const fixedSeqMan = seqMan;

    async function call(collectId) {
        logger.info("Collect [" + collectId + "] has been called.");

        return (await fixedSeqMan.tables.collect.findOne({
            where: {
                id: collectId
            },
            include: [
                {
                    model: fixedSeqMan.tables.ordinarycol,
                    as: "Ordinary"
                },
                {
                    model: fixedSeqMan.tables.proxycol,
                    as: "Proxy"
                },
                {
                    model: fixedSeqMan.tables.refundcol,
                    as: "Refund"
                }
            ]
        }));
    }

    async function callEntire() {
        return (await fixedSeqMan.tables.collect.findAll());
    }

    const switchMap = {
        "ordinary": 0,
        0: "ordinary",
        "proxy": 1,
        1: "proxy",
        "refund": 2,
        2: "refund"
    }

    async function switchCalled(called) {
        if(called == null) return null;

        if(called.Ordinary) {
            return [switchMap["ordinary"], called];
        } else if(called.Proxy) {
            return [switchMap["proxy"], called];
        } else if(called.Refund) {
            retrun [switchMap["refund"], called];
        }
    }

    async function switchCall(collectId) {
        return (await switchCall(call(collectId)));
    }
}