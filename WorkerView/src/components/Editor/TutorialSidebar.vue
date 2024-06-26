<!-- This is adapted from https://akahon.github.io/vue-sidebar-menu-akahon/# -->
<script setup>
// Somehow imports must be done in the script setup, not in the script tag
import ProgressBar from 'primevue/progressbar';
import Panel from 'primevue/panel';
import {ref} from "vue";

let barPercent = ref(0)
let steps = 0
let collapsed = [false, true, true, true, true]

document.addEventListener("referenceToolSelected", function (e) {
  console.log("Reference tool selected");
  // update the progress bar, steps and tasks
  barPercent.value = 25;
  steps = 1;
  collapsed = [true, false, true, true, true]
});

document.addEventListener("referenceSet", function (e) {
  if(e.detail){
    console.log("Reference set");
    // update the progress bar, steps and tasks
    barPercent.value = 50;
    steps = 2;
    collapsed = [true, true, false, true, true]
  }
  else{
    console.log("Reference unset");
    // undo all updates
    barPercent.value = 0;
    steps = 0;
    collapsed = [false, true, true, true, true]
  }
});

document.addEventListener("measurementToolSelected", function (e) {
  console.log("Measurement tool selected");
  // update the progress bar, steps and tasks
  barPercent.value = 75;
  steps = 3;
  collapsed = [true, true, true, false, true]
});

document.addEventListener("measurementCompleted", function (e) {
  console.log("Measurement completed");
  // update the progress bar, steps and tasks
  barPercent.value = 100;
  steps = 4;
  collapsed = [true, true, true, true, false]
});
</script>

<script>
    export default {
      name: 'SidebarMenuTutorial',
      props: {
        //! Menu settings
        isMenuOpen: {
          type: Boolean,
          default: true,
        },
        menuTitle: {
          type: String,
          default: 'Tutorial',
        },
        menuIcon: {
          type: String,
          //this is weird, doesn't work with pi icons
          default: 'pi pi-home',
        },
        isPaddingRight: {
          type: Boolean,
          default: true,
        },
        menuOpenedPaddingRightBody: {
          type: String,
            default: '200px',
        },
        menuClosedPaddingRightBody: {
          type: String,
          default: '20px',
        },

        //! Styles
        bgColor: {
          type: String,
          default: '#d3d3d3',
        },
        secondaryColor: {
          type: String,
          default: '#1d1b31',
        },
        homeSectionColor: {
          type: String,
          default: '#e4e9f7',
        },
        logoTitleColor: {
          type: String,
          default: '#000000',
        },
        iconsColor: {
          type: String,
          default: '#000000',
        },
        itemsTooltipColor: {
          type: String,
          default: '#e4e9f7',
        },
        menuItemsHoverColor: {
          type: String,
          default: '#fff',
        },
        menuItemsTextColor: {
          type: String,
          default: '#000000',
        },
        menuFooterTextColor: {
          type: String,
          default: '#fff',
        },
      },
      data() {
        return {
          isOpened: false,
        }
      },
      mounted() {
        this.isOpened = this.isMenuOpen
      },
      computed: {
        cssVars() {
          return {
            '--bg-color': this.bgColor,
            '--secondary-color': this.secondaryColor,
            '--home-section-color': this.homeSectionColor,
            '--logo-title-color': this.logoTitleColor,
            '--icons-color': this.iconsColor,
            '--items-tooltip-color': this.itemsTooltipColor,
            '--menu-items-hover-color': this.menuItemsHoverColor,
            '--menu-items-text-color': this.menuItemsTextColor,
            '--menu-footer-text-color': this.menuFooterTextColor,
          }
        },
      },
      watch: {
        isOpened(val) {
          window.document.body.style.paddingRight =
            this.isOpened && this.isPaddingRight
              ? this.menuOpenedPaddingRightBody
              : this.menuClosedPaddingRightBody
        },
      },
    }
</script>

<template>
    <div
      class="sidebar"
      :class="isOpened ? 'open' : ''"
      :style="cssVars"
    >
      <div class="logo-details" style="margin: 6px 14px 0 14px">

        <i class="bx icon" :class="menuIcon"/>

        <div class="logo_name">
          {{ menuTitle }}
        </div>
        <i
          class="bx"
          :class="isOpened ? 'pi pi-times-circle' : 'pi pi-info-circle'"
          id="btn"
          @click="isOpened = !isOpened"
        />
      </div>
  
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
          max-height: calc(100% - 60px);
        "
      >
        <div id="my-scroll" style="margin: 6px 14px 0 14px">
          <ul class="nav-list" style="overflow: visible">

            <li>
                <!--Put progress bar here-->
                <ProgressBar :value="barPercent">{{ steps }}/4</ProgressBar>
            </li>

            <div v-if="isOpened">
              <Panel header="Ein Referenz-Werkzeug auswählen" style="margin: 6px 14px 0 14px" toggleable :collapsed=collapsed[0] >
                <p>Klicken Sie ein beliebiges Referenz-Werkzeug in der Werkzeugleiste um das jeweilige Referenz-Werkzeug zu aktivieren.</p>
              </Panel>
              <Panel header="Benutzung eines Referenz-Werkzeugs" style="margin: 6px 14px 0 14px" toggleable :collapsed=collapsed[1]>
                <p>Wählen Sie alle nötigen Referenzpunkte auf dem Bild aus um ein Referenzmaß zu setzen.</p>
              </Panel>
              <Panel header="Ein Mess-Werkzeug auswählen" style="margin: 6px 14px 0 14px" toggleable :collapsed=collapsed[2]>
                <p>Klicken Sie ein beliebiges Mess-Werkzeug in der Werkzeugleiste um das jeweilige Mess-Werkzeug zu aktivieren.</p>
              </Panel>
              <Panel header="Benutzung eines Mess-Werkzeugs" style="margin: 6px 14px 0 14px" toggleable :collapsed=collapsed[3]>
                <p>Klicken Sie beliebige Punkte auf dem Bild an um eine Länge oder Fläche auszumessen</p>
              </Panel>
              <Panel header="Tutorial Beendet!" style="margin: 6px 14px 0 14px" toggleable :collapsed=collapsed[4]>
                <p>Sie haben erfolgreich das Tutorial abgeschlossen. Falls Sie eine Fläche ausgemessen haben, können Sie mit rechtsklick eine weitere vermessen!</p>
              </Panel>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </template>

  
  <style>
  /* makes this available in the parent component and allows for Juicy animations*/
    body {
      transition: all 0.5s ease;
    }
  </style>

  <style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .menu-logo {
      width: 30px;
      margin: 0 10px 0 10px;
    }
    .sidebar {
      position: relative;
      display: flex;
      flex-direction: column;
      position: fixed;
      /*left: 0;*/
      right: 0;
      top: 0;
      height: 100%;
      min-height: min-content;
      /* overflow-y: auto; */
      width: 78px;
      background: var(--bg-color);
      /* padding: 6px 14px 0 14px; */
      z-index: 99;
      transition: all 0.5s ease;
    }
    @media (prefers-color-scheme: dark) {
      .sidebar {
        background-color: #23282e;
      }
    }

    .sidebar.open {
      width: 250px;
    }
    .sidebar .logo-details {
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;
    }
    .sidebar .logo-details .icon {
      opacity: 0;
      transition: all 0.3s ease;
    }
    .sidebar .logo-details .logo_name {
      color: var(--logo-title-color);
      font-size: 20px;
      font-weight: 600;
      opacity: 0;
      transition: all 0.3s ease;
    }
    .sidebar.open .logo-details .icon,
    .sidebar.open .logo-details .logo_name {
      opacity: 1;
    }
    @media (prefers-color-scheme: dark) {
      .sidebar.open .logo-details .icon,
      .sidebar.open .logo-details .logo_name {
        color: rgba(255, 255, 255, 0.65);
      }
    }
    .sidebar .logo-details #btn {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      font-size: 23px;
      text-align: center;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .sidebar.open .logo-details #btn {
      text-align: right;
    }
    .sidebar i {
      color: var(--icons-color);
      height: 60px;
      min-width: 50px;
      font-size: 28px;
      text-align: center;
      line-height: 60px;
    }

    @media (prefers-color-scheme: dark) {
      .sidebar i {
        color: rgba(255, 255, 255, 0.65);
      }
    }

    .sidebar .nav-list {
      margin-top: 20px;
    }
    .sidebar li {
      position: relative;
      margin: 8px 0;
      list-style: none;
    }


    .tooltip {
      position: absolute;
      z-index: 3;
      background: var(--items-tooltip-color);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 400;
      opacity: 0;
      white-space: nowrap;
      pointer-events: none;
      transition: 0s;
    }
    .tooltip.active {
      opacity: 1;
      pointer-events: auto;
      transition: all 0.4s ease;
      /* top: 50%; */
      transform: translateY(25%);
    }


    .sidebar.open li .tooltip {
      display: none;
    }
    .sidebar input {
      font-size: 15px;
      color: var(--serach-input-text-color);
      font-weight: 400;
      outline: none;
      height: 50px;
      width: 100%;
      width: 50px;
      border: none;
      border-radius: 12px;
      transition: all 0.5s ease;
      background: var(--secondary-color);
    }
    .sidebar.open input {
      padding: 0 20px 0 50px;
      width: 100%;
    }
    
    .sidebar li a {
      display: flex;
      height: 100%;
      width: 100%;
      border-radius: 12px;
      align-items: center;
      text-decoration: none;
      transition: all 0.4s ease;
      background: var(--bg-color);
    }
    .sidebar li a:hover {
      background: var(--menu-items-hover-color);
    }
    .sidebar li a .links_name {
      color: var(--menu-items-text-color);
      font-size: 15px;
      font-weight: 400;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: 0.4s;
    }
    .sidebar.open li a .links_name {
      opacity: 1;
      pointer-events: auto;
    }
    .sidebar li a:hover .links_name,
    .sidebar li a:hover i {
      transition: all 0.5s ease;
      color: var(--bg-color);
    }
    
    .sidebar li i {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      border-radius: 12px;
    }
    .home-section {
      position: relative;
      background: var(--home-section-color);
      min-height: 100vh;
      top: 0;
      left: 78px;
      width: calc(100% - 78px);
      transition: all 0.5s ease;
      z-index: 2;
    }
    .sidebar.open ~ .home-section {
      left: 250px;
      width: calc(100% - 250px);
    }
    .home-section .text {
      display: inline-block;
      color: var(--bg-color);
      font-size: 25px;
      font-weight: 500;
      margin: 18px;
    }
    .my-scroll-active {
      overflow-y: auto;
    }
    #my-scroll {
      overflow-y: auto;
      height: calc(100% - 60px);
    }
    #my-scroll::-webkit-scrollbar {
      display: none;
    }
    
    @media (max-width: 420px) {
      .sidebar li .tooltip {
        display: none;
      }
    }
  </style>
  