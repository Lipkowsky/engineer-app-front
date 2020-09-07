<template>
<div id="app">

    <Header></Header>
    <div class="content">
        <router-view></router-view>
    </div>
    <footer class="footer">
        <Footer></Footer>
    </footer>
</div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap');
* {
    font-family: 'Quicksand', sans-serif;
    box-sizing: border-box;
}

html, body {
  height: 100%;
  background-color: #EBEFF2;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #EBEFF2;
}

.content {
  flex: 1 0 auto;
  padding: 5x;
}

.footer {
  flex-shrink: 0;
  padding: 5px;
}


body {
  margin: 0;
}


footer {
  background: #2d3238;
  color: white;
  text-align: center;
}
</style>
