<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <div class="reader-toggles">
      <div v-on:click=switchText
           v-bind:class="{enabled: showText}">Transliteration</div>
      <div v-on:click=switchTranslation
           v-bind:class="{enabled: showTranslation}">Translation</div>
    </div>
    <div class=left>
      <Reader :passage-text="text" v-if=showText />
    </div>
    <div class=right>
      <Reader :passage-text="translation" v-if=showTranslation />
    </div>
  </div>
</template>

<script>
import Reader from '../reader/Reader.vue';
import ReferenceInput from '../reader/ReferenceInput.vue';

import { CDLI_FETCH_URN } from '../constants';

export default {
  scaifeConfig: {
    displayName: 'CDLI Reader',
    location: 'both',
  },
  components: {
    Reader,
    ReferenceInput,
  },
  methods: {
    onReadFromStore(lookupFromStore) {
      this.lookupFromStore = lookupFromStore;
    },
    onLookup(reference) {
      const urn = `urn:cts:cdli:test.${reference}`;
      this.$store.dispatch(CDLI_FETCH_URN, { urn });
    },
    switchText() {
      this.showText = !this.showText;
    },
    switchTranslation() {
      this.showTranslation = !this.showTranslation;
    },
  },
  data() {
    return {
      reference: 'P481090',
      lookupFromStore: true,
      passageText: [],
      translationText: [],
      showText: true,
      disableText: false,
      showTranslation: false,
      disableTranslation: false,
    };
  },
  computed: {
    text() {
      return this.lookupFromStore ? this.$store.state.passageText : this.passageText;
    },
    translation() {
      return this.lookupFromStore ? this.$store.state.translationText : this.translationText;
    },
  },
};
</script>

<style lang="scss">
.select-passage-reader {
  width: 100%;
}
.left {
  float: left;
}
.right {
  float: right;
}
.reader-toggles {
  margin-top: -1.5em;
  display: flex;
  align-items: center;
}
.reader-toggles div {
  background-color: lightgray;
  padding: 8px;
  margin: 0 auto;
  border-radius: 5px;
}
.reader-toggles div.enabled {
  background-color: darkgray;
}
.reader-toggles div.disabled {
  color: gray;
}
</style>
