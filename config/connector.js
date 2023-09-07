const {coDB} = require("./config");
const logger = require("./winston")().logger;
const mysql2 = require("mysql2");
const lodash = require("lodash.clonedeep");

/**
 * 각개 Pool로 작동 가능
 * 메모리 부담이 없도록 할 필요가 있는데, connectionLimit을 초기 호출 시 정하는 방법을 이용해도 될 것 같다는 생각인데 <b>이 또한 config로 전부 대체할 수 있다</b>고 생각하는 중.
 * @param {String} department 부서명(파일명)
 * @param {String} database 연결 대상 데이터베이스명
 * @param {Number} connectionLimit Pool에서의 연결 제한 수
 */
module.exports =
    /**
     * 각개 Pool로 작동 가능
     * 메모리 부담이 없도록 할 필요가 있는데, connectionLimit을 초기 호출 시 정하는 방법을 이용해도 될 것 같다는 생각인데 <b>이 또한 config로 전부 대체할 수 있다</b>고 생각하는 중.
     * @param {String} department 부서명(파일명)
     * @param {String} database 연결 대상 데이터베이스명
     * @param {Number} connectionLimit Pool에서의 연결 제한 수
     */
    function (department, database, connectionLimit) {
        if (!department) {
            logger.error(
                "From Connector.js: There is not provided department information"
            );
            return {};
        }

        let dbPool;
        const dpmt = department;

        const db = database ? database : "";
        const cLMT = connectionLimit > 0 ? connectionLimit : 100;

        let p = lodash(coDB);
        p.database = db;
        p.connectionLimit = cLMT;

        logger.info(`[${dpmt}] Loaded for Database Pool Configuration.`);

        const initiate = async () => {
            (() => {
                logger.info(
                    `[${dpmt}] Initiated for Database Pool Configuration.`
                );
            })();
            return await mysql2.createPool(p);
        };

        return {
            getPool: async function () {
                if (!dbPool) dbPool = await initiate();
                return dbPool;
            }
        };
    };
