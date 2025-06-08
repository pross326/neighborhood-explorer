const axios = require('axios')

exports.handler = async function (event) {
  const { location, type } = event.queryStringParameters

  const apiKey = process.env.GOOGLE_API_KEY
  const url = 'https://places.googleapis.com/v1/places:searchText'

  try {
    const response = await axios.post(
      url,
      {
        textQuery: `${type} near ${location}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.googleMapsUri',
        },
      },
    )

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data.places || []),
    }
  } catch (error) {
    console.error('Places API error:', error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
