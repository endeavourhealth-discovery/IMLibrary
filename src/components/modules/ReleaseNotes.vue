<template>
  <Dialog :header="'What\'s new (v' + appVersion + ')'" :visible="showRelNotes" :closable="false" :modal="true" :data-testid="'dialog-visible-' + showRelNotes">
    <div id="all-releases-container">
      <div v-for="(appReleases, key, index) in releases" id="directory-releases">
        <div v-if="showApp[key]">
          <div v-for="release in appReleases" class="release">
            <p class="app-name">{{ key }}</p>
            <p>v{{ release.version }}</p>
            <p>publish date: {{ release.publishedDate }}</p>
            <div id="release-notes-container">
              <ul>
                <li v-for="note in release.releaseNotes">{{ note }}</li>
              </ul>
            </div>
          </div>
          <Button label="View older" @click="viewOlder($event, key)" />
          <Button label="View for all apps" @click="viewAll" />
        </div>
      </div>
    </div>
    <!-- <ul>
      <li v-for="item in releaseNotes">{{ item }}</li>
    </ul> -->
    <template #footer>
      <Button label="Close" @click="close" autofocus />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, Ref, ref, inject, reactive } from "vue";
import semver from "semver";
import { Env, GithubService } from "../../services/Services";

const props = defineProps({
  appVersion: { type: String, required: true },
  repositoryName: { type: String, required: true }
});

const axios = inject("axios");

const githubService = new GithubService(axios);

const showRelNotes = ref(false);
// const releaseNotes = ref([
//   "Updated core to SNOMED 34.1 (10-Aug-2022)",
//   "Visual enhancements (e.g. less whitespace on tree)",
//   "Optimized search results table",
//   "Main directory tree now supports double-click",
//   "'Find in tree' now locates in the right panel hierarchy",
//   "Fixed incorrect code display (symbols) in IMViewer"
// ]);
const releases: { auth: any[]; directory: any[]; editor: any[]; viewer: any[] } = reactive({ auth: [], directory: [], editor: [], viewer: [] });
// const directoryReleases: Ref<any[]> = ref([]);
// const editorReleases: Ref<any[]> = ref([]);
// const viewerReleases: Ref<any[]> = ref([]);
// const authReleases: Ref<any[]> = ref([]);
const showApp: Ref<any> = ref({ auth: false, directory: false, editor: false, viewer: false });
const showLegacy: Ref<any> = ref({ auth: false, directory: false, editor: false, viewer: false });

onMounted(async () => {
  await init(props.repositoryName, props.appVersion);
  console.log(releases);
  console.log(showApp.value);
  console.log(showLegacy.value);
  // console.log("sending latest request");
  // latestReleaseNotes.value = await axios.get("http://localhost:3000/node_api/github/public/releases", { params: { repositoryName: props.repositoryName } });
  // console.log(latestReleaseNotes.value);
  // const lastVer = window.localStorage.getItem("IMVersion");
  // if (!lastVer || !semver.valid(lastVer) || semver.lt(lastVer, props.appVersion)) {
  //   showRelNotes.value = true;
  // } else if (semver.valid(lastVer) && semver.gt(lastVer, props.appVersion)) {
  //   localStorage.setItem("IMVersion", props.appVersion);
  //   showRelNotes.value = true;
  // }
});

async function init(repoName: string, latestVersion: string) {
  const lastVersion = getLocalVersion(repoName);
  if (!lastVersion || !semver.valid(lastVersion) || semver.lt(lastVersion, latestVersion)) {
    await getLatestReleaseNotes(repoName);
    setShowApp(repoName, true);
    showRelNotes.value = true;
  } else if (semver.valid(lastVersion) && semver.gt(lastVersion, lastVersion)) {
    setLocalVersion(repoName, latestVersion);
    await getLatestReleaseNotes(repoName);
    setShowApp(repoName, true);
    showRelNotes.value = true;
  }
}

function getLocalVersion(repoName: string): string | null {
  return localStorage.getItem(repoName + "Version");
}

function setLocalVersion(repoName: string, versionNo: string) {
  localStorage.setItem(repoName + "Version", versionNo);
}

async function getLatestReleaseNotes(repoName: string) {
  const release = (await githubService.getLatestRelease(repoName)).data;
  console.log(release);
  switch (repoName) {
    case "IMAuth":
      releases.auth = [release];
      break;
    case "IMDirectory":
      releases.directory = [release];
      break;
    case "IMEditor":
      releases.editor = [release];
      break;
    case "IMViewer":
      releases.viewer = [release];
      break;
    default:
      throw new Error("Unknown repo name: " + repoName + " encountered in releasenotes.");
  }
}

async function getAdditionalAppLatestReleaseNotes(currentAppRepo: string) {
  if (currentAppRepo !== "IMDirectory") await getLatestReleaseNotes("IMDirectory");
  if (currentAppRepo !== "IMAuth") await getLatestReleaseNotes("IMAuth");
  if (currentAppRepo !== "IMEditor") await getLatestReleaseNotes("IMEditor");
  if (currentAppRepo !== "IMViewer") await getLatestReleaseNotes("IMViewer");
}

async function getAllRepoReleaseNotes(repoName: string) {
  const releases = (await githubService.getReleases(repoName)).data;
  console.log(releases);
  switch (repoName) {
    case "IMAuth":
      releases.auth = releases;
      break;
    case "IMDirectory":
      releases.directory = releases;
      break;
    case "IMEditor":
      releases.editor = releases;
      break;
    case "IMViewer":
      releases.viewer = releases;
      break;
    default:
      throw new Error("Unknown repo name: " + repoName + " encountered in releasenotes.");
  }
}

async function getAdditionalFullReleaseNotes(currentAppRepo: string) {
  if (currentAppRepo !== "IMDirectory") await getAllRepoReleaseNotes("IMDirectory");
  if (currentAppRepo !== "IMAuth") await getAllRepoReleaseNotes("IMAuth");
  if (currentAppRepo !== "IMEditor") await getAllRepoReleaseNotes("IMEditor");
  if (currentAppRepo !== "IMViewer") await getAllRepoReleaseNotes("IMViewer");
}

function close() {
  showRelNotes.value = false;
  setLocalVersion(props.repositoryName, props.appVersion);
}

function setShowApp(repoName: string, show: boolean) {
  showApp.value[repoNameToKey(repoName)] = show;
}

function setShowLegacy(repoName: string, show: boolean) {
  showLegacy.value[repoNameToKey(repoName)] = show;
}

function resetBooleanObject(booleanObject: any) {
  for (const [key, value] of Object.entries(booleanObject)) {
    booleanObject[key] = false;
  }
}

async function viewAll() {
  await getAdditionalAppLatestReleaseNotes(props.repositoryName);
  if (props.repositoryName !== "IMAuth") setShowApp("IMAuth", true);
  if (props.repositoryName !== "IMDirectory") setShowApp("IMDirectory", true);
  if (props.repositoryName !== "IMEditor") setShowApp("IMEditor", true);
  if (props.repositoryName !== "IMViewer") setShowApp("IMViewer", true);
}

async function viewOlder(event: any, appKey: string) {
  await getAllRepoReleaseNotes(keyToRepoName(appKey));
}

function repoNameToKey(repoName: string): string {
  return repoName.substring(2).toLowerCase();
}

function keyToRepoName(key: string): string {
  return "IM" + key.substring(0, 1).toUpperCase + key.substring(1);
}
</script>

<style scoped>
.app-name {
  text-transform: capitalize;
}
</style>
