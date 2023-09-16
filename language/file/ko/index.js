/**
 * Wildcards
 * $: index
 * $$: Managers
 */
module.exports = {
    '$L1': "모듈 로딩 완료. 초기화 개시.",
    '$L2': "시작되었습니다!",
    '$L3': "초기화되었습니다.",
    '$$L1': "세션 저장소 준비 ✔",
    '$$L2': "세션 매니저 준비 ✔",
    '$$L3': "직책 매니저 준비 ✔",
    regFail: {
        /** System */
        0: "시스템 에러. 관리자에게 문의하십시오.",
        /** Already username */
        1: "이미 사용 중인 사용자 이름입니다. 다른 것으로 시도하세요.",
        /** Not typed : username */
        2: "사용자 이름을 입력하지 않으셨습니다. 다시 시도하세요.",
        /** Not typed : password */
        3: "비밀번호를 입력하지 않으셨습니다. 다시 시도하세요.",
        /** Not typed : name */
        4: "성명을 입력하지 않으셨습니다. 다시 시도하세요.",
        /** Not typed : code */
        5: "복구 코드를 입력하지 않으셨습니다. 다시 시도하세요.",
        /** Not typed : infringed error */
        6: "registration failed due to unknown cause(s). infringed.",
        /** Password and Password Confirm NOT Match */
        7: "입력하신 비밀번호와 확인용 재입력 비밀번호가 같지 않습니다.",
        /** Not typed : password confirm */
        8: "확인용 재입력 비밀번호를 입력하지 않으셨습니다. 다시 시도하세요.",
        9: "아이디는 최대 30글자입니다.",
        10: "회원명은 최대 10글자입니다.",
        11: "복구 코드는 최대 10글자입니다.",
        12: "지정하신 회원명을 사용하시는 다른 회원분이 계십니다. 다시 시도하세요."
    },
    positions: {
        "party": "참여자",
        "genaff": "총무",
        "agent": "공무 요원",
        "executor": "집행관",
        "chairman": "위원장",
        "auditor": "감사",
        "abandoned": "정지된 계정",
        "expelled": "피제척자",
        "cancelled": "취소한 참여자",
        "none": "미지정",
    },

    links: {
        "home": "홈",
        "login": "로그인",
        "register": "회원 가입",
        "logout": "로그아웃",
        "profile": "회원 정보"
    },

    pageTitles: {
        "main": "RSPP",
        "user": "RSPP 회랑",
        "user-login": "RSPP 회원",
        "user-register": "RSPP 회원 등록",
        "user-manage": "RSPP 회원 관리",
        "collect": "RSPP 징수 등기",
    },

    footerComponents: {
        "font": "폰트",
        "info": "정보",
        "copyright": "RSPP © 2023 법무과"
    },

    user: {
        loginInvalid: "로그인 상태가 해제되어 있습니다. 로그인 페이지로 이동합니다.",
        index: {
            "sama": "님",
            "positionCheck": "직책 선택",
            "form1-cursor-blank": "빈칸이 있습니다. 다시 시도하세요.",
            "newPW-nM": "신규 비밀번호와 그 재입력 값이 일치하지 않습니다. 다시 시도하세요.",
            "curPW": "기존 비밀번호",
            "newPW": "신규 비밀번호",
            "newPW-c": "신규 비밀번호 재입력",
            "pwchange": "비밀번호 변경",
            "code": "복구 코드",
            "code_confirm": "코드 확인"
        },
        login: {
            "RUN": "아이디는 최대 30자입니다.",
            "PWE": "비밀번호가 빈칸일 수 없습니다.",
            "placeholder_username": "아이디",
            "placeholder_password": "비밀번호",
            "submitBtn": "로그인"
        },
        register: {
            "name_i": "성함을 입력해 주세요.",
            "name_l": "규정된 회원명은 최대 10자입니다.",
            "un_i": "아이디가 빈칸일 수는 없습니다.",
            "un_l": "규정된 아이디는 최대 30자입니다.",
            "pw_i": "비밀번호가 빈칸일 수는 없습니다.",
            "pw_c_i": "비밀번호 확인을 위하여 재입력해 주세요.",
            "pw_r_c": "입력하신 비밀번호와 확인용 재입력 비밀번호가 같지 않습니다.",
            "code_l": "규정된 복구 코드는 최대 10자입니다.",
            "code_i": "복구 코드를 입력하셔야 합니다.",
            "placeholder_name": "회원명",
            "placeholder_username": "아이디",
            "placeholder_password3": "비밀번호",
            "placeholder_password4": "비밀번호 확인",
            "placeholder_code": "코드",
            "submitBtn": "회원 등록 요청",
            "password-description": "비밀번호에 띄어쓰기( ) 포함 시 비밀번호로 인정될 수도 있습니다.",
        }
    }
}