<script setup lang="ts">
import axios from 'axios'
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-btn-group>
        <v-btn @click="getNumber">Number</v-btn>
        <v-btn @click="getString">String</v-btn>
        <v-btn @click="getArray">Array</v-btn>
        <v-btn @click="getObject">Object</v-btn>
      </v-btn-group>
    </v-row>
    <v-row align="center" justify="center" class="fill-height">
      <pre style="background-color: navy;">{{ data }}</pre>
    </v-row>
  </v-container>
</template>

<script lang="ts">
interface BaseResultInterface {
  status: string
  result?: any
}

export default {
  data() {
    return {
      data: undefined as BaseResultInterface | undefined
    }
  },
  methods: {
    async getNumber() {
      const response = await axios.get("http://localhost:3000/api/hardware/CppNumber");
      this.data = await response.data as BaseResultInterface;
    },
    async getString() {
      const response = await axios.get("http://localhost:3000/api/hardware/CppString");
      this.data = await response.data as BaseResultInterface;
    },
    async getArray() {
      const response = await axios.get("http://localhost:3000/api/hardware/CppArray");
      this.data = await response.data as BaseResultInterface;
    },
    async getObject() {
      const response = await axios.get("http://localhost:3000/api/hardware/CppObject");
      this.data = await response.data as BaseResultInterface;
    }
  },
  mounted() {

  }
}
</script>