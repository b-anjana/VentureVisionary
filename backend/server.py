from flask import Flask, jsonify
import requests

app = Flask(__name__)


#Members API Route
@app.route('/members')
def members():
    return {"members" : ['Member1', 'Member2', 'Member3']}

@app.route('/radius-search')
def radius_search():
    params = {
        'keyword': 'hospital',
        'location': '32.909245, -96.769041',
        'radius': 30000,
        'key': 'AIzaSyC9xmK-HdVTMZuQk83FkjGTxTfE_79eZvc'  # Replace with your actual Google Places API key
    }

    # Make HTTP request to Google Places API
    response = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', params=params)

    # Check if request was successful
    if response.status_code == 200:
        # Parse JSON response and return as JSON
        print(response.json())
        return jsonify(response.json())
    else:
        # Return error message if request failed
        return jsonify({'error': 'Failed to fetch nearby places'})

if __name__ == '__main__':
    app.run(debug=True)