<template>
    <q-card class="my-card q-mb-md" flat bordered>
        <q-card-section class="row items-center q-gutter-sm">
            <q-icon name="place" size="md" />
            <div class="text-subtitle2">{{ name }}</div>
        </q-card-section>

        <q-card-section class="text-caption">
            <div v-if="address">{{ address }}</div>
            <div v-if="rating">⭐ {{ rating }} ({{ reviews }} reviews)</div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat label="View on Map" type="a" :href="mapUrl" target="_blank" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
const props = defineProps({
    place: Object
})

const name = props.place.displayName?.text || 'Unknown Place'
const address = props.place.formattedAddress
const rating = props.place.rating
const reviews = props.place.userRatingCount
const mapUrl = props.place.googleMapsUri
</script>

<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
}
</style>
