<template>
    <div>
        <common-header></common-header>
        <common-lefter></common-lefter>
        <div class="main" id="main">
            <transition name="custom-classes-transition" enter-active-class="fadeIn" leave-active-class="bounceOutRight"
                        mode="out-in" :duration="{ enter: 350, leave: 200 }">
                <keep-alive>
                    <router-view class="animated" v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            </transition>

            <transition name="custom-classes-transition" enter-active-class="fadeIn" leave-active-class="bounceOutRight"
                        mode="out-in" :duration="{ enter: 350, leave: 200 }">
                <router-view class="animated" v-if="!$route.meta.keepAlive"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import CommonLefter from "../components/CommonLefter.vue";
    import CommonHeader from "../components/CommonHeader.vue";

    export default {
        name: "Agent",
        components: {
            CommonLefter,
            CommonHeader
        }
    };
</script>
