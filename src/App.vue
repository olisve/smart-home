<template>
    <div class="sh-app">
        <Header></Header>
        <div class="sh-app__content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import './app.less'
    import Header from './components/shared/header/header'

    @Component({
      components: {
          Header
      }
    })
    export default class App extends Vue {}
</script>