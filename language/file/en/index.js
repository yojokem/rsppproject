/**
 * Wildcards
 * $: index
 * $$: Managers
 * L: for Logging
 */

brand = "RSPP";

module.exports = {
    'brand': brand,
    '$L1': "module loaded and started initialization.",
    '$L2': "Started!",
    '$L3': "initialized.",
    '$$L1': "Session Store ready ✔",
    '$$L2': "Session Manager ready ✔",
    '$$L3': "Position Manager ready ✔",
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
    },
    
    links: {
        "home": "Home",
        "login": "Login",
        "register": "Register",
        "logout": "Logout",
        "profile": "User Profile"
    },

    pageTitles: {
        "main": brand,
        "user": brand + " Members Hall",
        "user-login": brand + " Login",
        "user-register": brand + " Register",
        "user-manage": brand + " Members Manage",
        "collect": "Collects in " + brand,
    },

    footerComponents: {
        "font": "Fonts",
        "info": "Info",
        "copyright": brand + " © 2023 Legal Department"
    },

    user: {
        loginInvalid: "Login Session Invalid, heading to the login page.",
        index: {
            "sama": "user",
            "positionCheck": "Select Position",
            "form1-cursor-blank": "There is a blank. Please try again.",
            "newPW-nM": "New Password and the Password Confirm does not match.",
            "curPW": "Current Password",
            "newPW": "New Password",
            "newPW-c": "New Password Confirm",
            "pwchange": "Password Change",
            "code": "Repair Code",
            "code_confirm": "Confirm Code"
        },
        login: {
            "RUN": "Username must be 30 letters in max.",
            "PWE": "Password input must not be empty.",
            "placeholder_username": "Username",
            "placeholder_password": "Password",
            "submitBtn": "Login"
        },
        register: {
            "name_i": "Name input must not be empty.",
            "name_l": "Name must be 10 letters in max.",
            "un_i": "Please type your username to use.",
            "un_l": "Username must be 30 letters in max.",
            "pw_i": "Please type your password to use.",
            "pw_c_i": "Type the password confirm and try again.",
            "pw_r_c": "Password and Password Confirm does not match.",
            "code_l": "Repair Code must be 10 letters in max.",
            "code_i": "Code input must not be empty.",
            "placeholder_name": "Name",
            "placeholder_username": "Username",
            "placeholder_password3": "Password",
            "placeholder_password4": "Password Confirm",
            "placeholder_code": "Code",
            "submitBtn": "Register",
            "password-description": "Blank between letters can be included in the password.",
        }
    }
}