<template>
  <q-page class="q-pa-md column items-center">
    <div class="text-h4 q-mb-md text-center">Neighborhood Explorer</div>
    <location-search @results="handleResults" />

    <div v-if="filteredPlaces.length" class="q-mt-md column items-center">
      <PlaceCard v-for="(place, index) in filteredPlaces" :key="index" :place="place" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import LocationSearch from 'components/LocationSearch.vue'
import PlaceCard from 'components/PlaceCard.vue'

const places = ref([])

const handleResults = (data) => {
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data
    places.value = Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to parse results:', error)
    places.value = []
  }
}

const filteredPlaces = computed(() =>
  places.value.filter(p => typeof p === 'object' && p !== null)
)
</script>
