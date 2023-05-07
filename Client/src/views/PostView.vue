<script setup lang="ts">
import axios from 'axios'
</script>

<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <form fast-fail @submit.prevent style="min-width: 40vw;">
        <v-slider v-model="data.valueBigInt" min="-100000000" max="100000000" step="1" label="valueBigInt"
          thumb-color="purple"></v-slider>

        <v-checkbox v-model="data.valueBoolean" label="valueBoolean" type="checkbox"></v-checkbox>

        <v-input label="valueDate">
          valueDate&nbsp;&nbsp;
          <input v-model="data.valueDate" id="party" style="width: 100%;" type="datetime-local" name="partydate" />
        </v-input>

        <v-text-field v-model="data.valueInteger" :counter="10" label="valueInteger" type="number"></v-text-field>

        <v-text-field v-model="data.valueNumber" :counter="7" label="valueNumber" type="number"></v-text-field>

        <v-text-field v-model="data.valueString" :counter="7" label="valueString" type="text"></v-text-field>

        <div class="d-flex flex-row-reverse">
          <v-btn @click="setData" class="mt-2">Submit</v-btn>
        </div>
      </form>
    </v-row>
    <v-row class="mt-6" align="center" justify="center">
      <pre style="background-color: navy;">{{ response }}</pre>
    </v-row>
  </v-container>
</template>

<script lang="ts">
interface BaseResultInterface {
  status: string
  changed?: number
  result?: DataInterface
}

interface DataInterface {
  valueBigInt: string,
  valueBoolean: boolean,
  valueDate: Date | string,
  valueInteger: number,
  valueNumber: number,
  valueString: string
}

export default {
  data: () => ({
    data: {
      // Some initial values
      valueBigInt: "123",
      valueBoolean: true,
      valueDate: "2023-05-06T19:06:17",
      valueInteger: 125,
      valueNumber: 126,
      valueString: "qwerty"
    } as DataInterface,
    response: undefined as BaseResultInterface | undefined
  }),
  methods: {
    async setData() {
      const response = await axios.post("http://localhost:3000/api/hardware", this.data);
      this.response = await response.data;
    },
    async getData() {
      const response = await axios.get("http://localhost:3000/api/hardware/CppObject");
      this.response = await response.data as BaseResultInterface;
      if (this.response.result != undefined &&
        this.response.result.valueBigInt != undefined && this.response.result.valueBoolean != undefined &&
        this.response.result.valueDate != undefined && this.response.result.valueInteger != undefined &&
        this.response.result.valueNumber != undefined && this.response.result.valueString != undefined
      ) {
        this.data = this.response.result;
        this.data.valueDate = new Date(this.response.result.valueDate).toISOString().split('.')[0];
      }
    },
  },
  mounted() {
    // Fill form after mount
    this.getData()
  }
}
</script>