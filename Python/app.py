from flask import Flask, request, jsonify
from openai import OpenAI
import json

app = Flask(__name__)

client = OpenAI(
    api_key='sk-proj-kMQ2PNeqFgaoDKXuZHf8T3BlbkFJINzXh0JsQnnHR2ebubu4',
)

def get_tourist_places(source=None, destination=None):
    if source and destination:
        prompt = f"List tourist places (at least 5 each) en route from {source} to {destination} and tourist places in {destination}. Provide the response in JSON format with the latitudes and longitudes as well. Use the format {{ \"en_route\": [{{\"name\": \"\", \"lat\": , \"lng\": , \"description\": \"\"}}], \"destination\": [{{\"name\": \"\", \"lat\": , \"lng\": , \"description\": \"\"}}]}}."
    else:
        prompt = f"List tourist places (at least 5) in {destination}. Provide the response in JSON format with the latitudes and longitudes as well. Use the format {{ \"destination\": [{{\"name\": \"\", \"lat\": , \"lng\": , \"description\": \"\"}}]}}."

    for attempt in range(1):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "You are a travel planner."},
                {"role": "user", "content": prompt}
            ]
        )
        
        places_text = response.choices[0].message.content
        
        try:
            places_data = json.loads(places_text)
            return places_data
        except json.JSONDecodeError as e:
            print("JSON Decode Error:", e)
    
    return {}

@app.route('/get_places', methods=['POST'])
def get_places():
    data = request.get_json()
    source = data.get('source')
    destination = data.get('destination')
    
    if not destination:
        return jsonify({"error": "Destination is required"}), 400

    tourist_places = get_tourist_places(source=source, destination=destination)
    return jsonify(tourist_places)

@app.route('/get_places', methods=['GET'])
def get_places_get():
    source = request.args.get('source')
    destination = request.args.get('destination')
    
    if not destination:
        return jsonify({"error": "Destination is required"}), 400

    tourist_places = get_tourist_places(source=source, destination=destination)
    return jsonify(tourist_places)

if __name__ == '__main__':
    app.run(debug=True)
