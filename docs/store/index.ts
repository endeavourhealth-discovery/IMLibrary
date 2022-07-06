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
    snomedLicenseAccepted: "false",
    snomedReturnUrl: "http://localhost:3000/components/snomed-license.html",
    selectedEntityType: "",
    conceptActivePanel: 0,
    arrayObjectNameListboxWithLabelStartExpanded: ["Label"],
    tagSeverityMatches: [
      { "@id": IM.ACTIVE, severity: "success" },
      { "@id": IM.DRAFT, severity: "warning" },
      { "@id": IM.INACTIVE, severity: "danger" }
    ],
    textDefinitionStartExpanded: ["Definition"]
  },
  mutations: {
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
    },
    updateSelectedEntityType(state, type) {
      state.selectedEntityType = type;
    },
    updateConceptActivePanel(state, number) {
      state.conceptActivePanel = number;
    }
  },
  actions: {},
  modules: {}
});
