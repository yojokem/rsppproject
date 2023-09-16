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
    }
}