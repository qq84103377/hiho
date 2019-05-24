const message = {
    state: {
        rongYunRes: {},
        messageList: [],
        replyMessage: {},
        missionSearchData: {},
        isSubmit: false,
        messageHeader: {},
        unReadNum: 0,
        instance: {},
        hasUpdate: '',
        hasMsg: false
    },

    mutations: {
        setRongYunRes(state, res) {
            state.rongYunRes = res;
        },
        setMessageList(state, res) {
            state.messageList = res;
        },
        setSendFormStatus(state, bol) {
            state.isSubmit = bol;
        },
        setReplyMessage(state, data) {
            state.replyMessage = data;
        },
        setMissionSearchData(state, data) {
            state.missionSearchData = data;
            // state.missionSearchKeyWord = data.keyword;
        },
        setHeader(state, data) {
            // console.log(data)
            state.messageHeader = data;
        },
        setUnreadNum(state, num) {
            state.unReadNum = num;
        },
        setInstance(state, instance) {
            state.instance = instance;
        },
        setHasUpdate(state, data) {
            state.hasUpdate = data;
        },
        setHasMsg(state, data) {
            state.hasMsg = data;
        }
    },
    actions: {

    }
}

export default message
