<script setup lang="ts">
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../stores/auth'
</script>

<template>
    <v-toolbar dark prominent>
        <v-toolbar-title>Supported by <strong>c++, express, vuetify</strong></v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-icon icon="fas fa-plus" /> -->
        <!-- <v-icon icon="mdi:mdi-minus" /> -->

        <v-btn to="/">Get methods</v-btn>
        <v-btn to="/set">Post methods</v-btn>
        <v-btn to="/about">About</v-btn>

        <v-btn v-if="!isLogged" color="primary">
            LogIn

            <v-dialog v-model="dialog" activator="parent" width="auto" min-width="30vw">
                <v-card>
                    <v-form v-model="form" fast-fail @submit.prevent class="mx-3 my-3">
                        <v-text-field v-model="userName" :rules="[rules.required, rules.min5]" hint="At least 5 characters"
                            label="User name"></v-text-field>
                        <v-text-field v-model="userPass" :append-icon="showPass ? 'mdi:mdi-eye' : 'mdi:mdi-eye-off'"
                            :rules="[rules.required, rules.min5]" :type="showPass ? 'text' : 'password'" name="input-10-2"
                            label="Password" hint="At least 5 characters" class="input-group--focused"
                            @click:append="showPass = !showPass"></v-text-field>
                        <div class="d-flex flex-row-reverse">
                            <v-btn @click="login" class="mt-2">Submit</v-btn>
                            <v-btn @click="dialog = false" class="mt-2">Cancel</v-btn>
                        </div>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-btn>
        <v-btn v-else-if="isLogged" color="primary" @click="logout">
            LogOut
        </v-btn>
    </v-toolbar>
</template>

<script lang="ts">
export default {
    data: () => ({
        dialog: false,
        form: undefined,
        userName: '',
        userPass: '',
        showPass: false,
        rules: {
            required: (value: string) => !!value || 'Required.',
            min5: (value: string) => value.length >= 5 || 'Min 5 characters',
        },
    }),
    methods: {
        /** Pinia */
        ...mapActions(useAuthStore, ['actionLogIn']),
        ...mapActions(useAuthStore, ['actionLogOut']),
        /** Methods */
        async login() {
            if (this.form) {
                this.dialog = false;

                await this.actionLogIn(this.userName, this.userPass);
            }
        },
        async logout() {
            await this.actionLogOut();
        },
    },
    computed: {
        /** Pinia */
        ...mapState(useAuthStore, ['isLogged'])
        /** Computed */

    },
    mounted() {
    }
}
</script>