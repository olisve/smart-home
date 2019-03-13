<template>
    <div class="sh-app">
        <SideBar class="sh-app__side-bar"></SideBar>
        <div class="sh-app__content">
            <Header></Header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import './app.less'
    import SideBar from './components/shared/side-bar/side-bar'
    import Header from './components/shared/header/header'

    @Component({
      components: {
          SideBar,
          Header
      }
    })
    export default class App extends Vue {}
</script>