<template>
    <div id='loading'>
        <div class="v-spinner">
            <div class="v-dot v-dot1" v-bind:style='{height: "60px", width: "60px", position: "relative"}'>
                <div class="v-dot v-dot2" v-bind:style='{backgroundColor: "rgb(93, 197, 150)", height: "30px", width: "30px",borderRadius: "100%"}'>
                </div>
                <div class="v-dot v-dot3" v-bind:style='{backgroundColor: "rgb(93, 197, 150)", height: "30px", width: "30px",borderRadius: "100%"}'>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'loading'
}
</script>
<style scoped>
#loading {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    
}

.v-spinner {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.v-spinner .v-dot {}

.v-spinner .v-dot1 {
    -webkit-animation: v-dotRotate 2s 0s infinite linear;
    animation: v-dotRotate 2s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

.v-spinner .v-dot2 {
    -webkit-animation: v-dotBounce 2s 0s infinite linear;
    animation: v-dotBounce 2s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    position: absolute;
    top: 0;
    bottom: auto;
}

.v-spinner .v-dot3 {
    -webkit-animation: v-dotBounce 2s -1s infinite linear;
    animation: v-dotBounce 2s -1s infinite linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    position: absolute;
    top: auto;
    bottom: 0;
}

@-webkit-keyframes v-dotRotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes v-dotRotate {
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@-webkit-keyframes v-dotBounce {
    0%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
}

@keyframes v-dotBounce {
    0%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    50% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
}
</style>
