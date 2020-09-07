<template>
<div>
    <v-quagga :onDetected="logIt" patchSize:="small" :readerTypes="['ean_reader']"></v-quagga>
</div>
</template>

<script>
import Vue from 'vue'
import VueQuagga from 'vue-quaggajs'
Vue.use(VueQuagga);
export default {
    name: 'Barcode',
    data() {
        return {
            message: '',
            detecteds: []
        }
    },
    methods: {
        logIt(data) {
            this.$parent.barcode_NO = data.codeResult.code;
            this.$parent.search = data.codeResult.code;
        },

    }
}
</script>

<style>
video {
    width: 320px;
    height: 240px;
    padding: 5px;
    border: 9px inset #006666;
    border-radius: 35px;

}

canvas {
    width: 320px;
    height: 240px;
}
</style>
