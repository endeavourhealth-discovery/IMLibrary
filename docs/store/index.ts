import { createStore } from "vuex";
import { Models, Vocabulary, Constants } from "../../src/index";
const { User, CustomAlert } = Models;
const { IM } = Vocabulary;
const { Avatars } = Constants;

export default createStore({
  // update stateType.ts when adding new state!
  state: {
    docs: true,
    conceptIri: IM.MODULE_ONTOLOGY,
    currentUser: {} as Models.User,
    isLoggedIn: false as boolean,
    snomedLicenseAccepted: localStorage.getItem(
      "snomedLicenseAccepted"
    ) as string,
    blockedIris: [] as string[],
    selectedEntityType: "",
    conceptActivePanel: 0,
  },
  mutations: {
    updateBlockedIris(state, blockedIris) {
      state.blockedIris = blockedIris;
    },
    updateConceptIri(state, conceptIri) {
      state.conceptIri = conceptIri;
    },
    updateCurrentUser(state, user) {
      state.currentUser = user;
    },
    updateIsLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
    updateSnomedLicenseAccepted(state, status: string) {
      state.snomedLicenseAccepted = status;
      localStorage.setItem("snomedLicenseAccepted", status);
    },
    updateSelectedEntityType(state, type) {
      state.selectedEntityType = type;
    },
    updateConceptActivePanel(state, number) {
      state.conceptActivePanel = number;
    },
  },
  actions: {},
  modules: {},
});
