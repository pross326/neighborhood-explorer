<template>
    <q-input filled v-model="location" label="Enter a city or ZIP code" :loading="loading" debounce="500"
        @keyup.enter="submitLocation">
        <template v-slot:append>
            <q-btn flat icon="search" @click="submitLocation" />
        </template>
    </q-input>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const location = ref('')
const emit = defineEmits(['results'])
const loading = ref(false)

const submitLocation = async () => {
    if (!location.value) return

    loading.value = true
    try {
        const response = await axios.get('/.netlify/functions/places', {
            params: {
                location: location.value,
                type: 'restaurant'
            }
        })

        console.log('✅ Places response:', response.data)
        emit('results', response.data)
    } catch (err) {
        console.error('❌ Error fetching places:', err)
    } finally {
        loading.value = false
    }
}
</script>
