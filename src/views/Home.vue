<template>
  <layout class="home">
    <!-- Force Graph -->
    <force-demo class="demo absolute w-full h-full" />

    <!-- Middle Content -->
    <div class="content select-none text-center pointer-events-none">
      <div class="text-center text-4xl">
        <h3>Visualizing Hierarchies</h3>
        <h5>With Vue.js and D3.js</h5>

        <div class="logos mb-16">
          <img src="@/assets/vue-logo.svg" />
          <img src="@/assets/d3-logo.svg" />
        </div>

        wtf...

        <router-link
          class="text-white p-5 bg-transparent border-2 border-white rounded-lg pointer-events-auto"
          to="/intro"
        >
          Start
        </router-link>
      </div>
    </div>
  </layout>
</template>

<script>
import BlankLayoutVue from "@/layouts/BlankLayout.vue";
import { ForceDemo } from "@/components/demos/asyncDemos";
export default {
  components: {
    Layout: BlankLayoutVue,
    ForceDemo: ForceDemo,
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  align-items: center;
  justify-items: center;
}

.content {
  color: #fff;
  position: relative;
  z-index: 2;
}

.logos {
  display: flex;
  height: 170px;
  // width: 100%;
  padding: 10px;
  position: relative;

  grid: auto / repeat(2, auto);
  justify-content: center;
  justify-items: center;
  column-gap: 10px;

  img {
    display: inline-block;
    height: 100%;
    width: auto;
  }
}
</style>
