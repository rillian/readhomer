<template>
  <div class="reference-input">
    <div class="reference-input--top-row">
      <div class="input-group" v-if="!readFromStore">
        <input v-model="reference" @keyup.enter="lookup" placeholder="P497322" />
        <button :disabled="readFromStore" @click.prevent="lookup">Lookup</button>
      </div>
    </div>
  </div>
</template>

<script>
const URN_CDLI = 'urn:cts:cdli';

export default {
  props: ['disableSync'],
  data() {
    return {
      urn: URN_CDLI,
      reference: '',
      readFromStore: false,
    };
  },
  watch: {
    readFromStore() {
      this.$emit('readFromStore', this.readFromStore);
    },
  },
  methods: {
    lookup() {
      this.$emit('lookup', this.urn, this.reference);
    },
  },
};
</script>

<style lang="scss">
  @import "../variables.scss";

  .reference-input {
    padding: 15px 24px;
    border-bottom: 1px solid $gray-200;
    margin-bottom: 15px;
    background: $gray-100;
    flex: 1;
    .reference-input--top-row {
      display: flex;
      justify-content: flex-start;
    }
    .input-group {
      display: flex;
      height: 30px;
      margin-right: 10px;
    }
    .sync-disabled .input-group {
      border-right: none;
      margin-right: 0;
    }
    input {
      padding: 5px 10px;
      margin-right: 5px;
    }
    .button-group {
      margin: 1px 10px 1px 0;
      button {
        margin: 0;
        text-align: center;
        width: 40px;
        height: 28px;
      }
    }
    button {
      background: $gray-200;
      border: 1px solid $gray-400;
      border-radius: 3px;
      cursor: pointer;
      margin: 1px 10px 1px 0;
      &:hover {
        background: $gray-300;
      }
      &.active {
        background: #2f4685;
        color: white;
      }
    }
  }
</style>
