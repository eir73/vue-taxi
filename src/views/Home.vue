<template>
<div class="a">
 a
</div>
</template>

<script>
import Tab from '../components/Tab'

export default {
  name: 'Home',
  data: () => ({
    controlsArray: []
  }),
  mounted() {
    this.controlsArray = this.$store.getters.data
  },
  methods: {
    selectTab(selectedTab) {
      this.controlsArray.forEach(tab => {
        tab.isActive = (tab.key == selectedTab.key);
      });
    }
  },
  components: {
    Tab
  }
}
</script>
