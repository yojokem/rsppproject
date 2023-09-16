/**
 * Wildcards
 * $: index
 * $$: Managers
 * L: for Logging
 */
module.exports = {
    '$L1': "module loaded and started initialization.",
    '$L2': "Started!",
    '$L3': "initialized.",
    '$$L1': "Session Store ready ✔",
    '$$L2': "Session Manager ready ✔",
    regFail: {
        /** System */
        0: "System Error. Please ask it to the administator.",
        /** Already username */
        1: "Username already in use. Please try another.",
        /** Not typed : username */
        2: "Please type your username to use.",
        /** Not typed : password */
        3: "Please type your password to use.",
        /** Not typed : name */
        4: "Please type your name.",
        /** Not typed : code */
        5: "Please type your repair code to use.",
        /** Not typed : infringed error */
        6: "registration failed due to unknown cause(s). infringed.",
        /** Password and Password Confirm NOT Match */
        7: "Password and Password Confirm does not match.",
        /** Not typed : password confirm */
        8: "Type the password confirm and try again.",
        9: "Username must be 30 letters in max.",
        10: "Name must be 10 letters in max.",
        11: "Repair Code must be 10 letters in max.",
        12: "Name must be unique. The user with the name exists."
    },
    positions: {
        "party": "Party One",
        "genaff": "General Affairs",
        "agent": "Agent",
        "executor": "Executor",
        "chairman": "Chairman",
        "auditor": "Auditor",
        "abandoned": "Abandoned User",
        "expelled": "Expelled Party One",
        "cancelled": "Party One Cancelled",
        "none": "None",
    }
}