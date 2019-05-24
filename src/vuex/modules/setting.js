const state = {
    settingInfo: ''
}

const mutations = {
    setSettingInfo(state, data) {
        state.settingInfo = data
    }
}

const actions = {

}

const getters = {
    getSettingInfo(state) {
        return state.settingInfo
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}