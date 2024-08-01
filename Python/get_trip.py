from flask import Flask, request, jsonify
from openai import OpenAI

import json

app = Flask(__name__)

client = OpenAI(
    api_key='sk-proj-OMa3SyyOrgmDq8JyXF0rT3BlbkFJ6TZVRWmVop263JK93BVN',
)

def get_tourist_places(source=None, destination=None):
    if source and destination:
        prompt = f"List tourist places (at least 5 each) en route from {source} to {destination} and tourist places in {destination}. Provide the response in JSON format with the latitudes, longitudes, and budget (show the budget split approximately for each place) as well. Mention the lat and lng inside the position object.Use the format {{ \"en_route\": [{{\"name\": \"\", \"position\" :, \"description\": , \"budget\": \"\"}}], \"destination\": [{{\"name\": \"\", \"position\":  , \"description\": , \"budget\": \"\"}}] ,\"base_budget\": [{{\"budget from source to destination\": \"\"}}],\"requestData\": [{{\"src\": , \"dest\":  \"\"}}]}}."
    else:
        prompt = f"List tourist places (at least 5) in {destination}. Provide the response in JSON format with the latitudes, longitudes, and budget (show the budget split approximately for each place) as well. Mention the lat and lng inside the position object.Use the format {{ \"destination\": [{{\"name\": \"\", \"position\": , \"description\": , \"budget\": \"\"}}],\"requestData\": [{{\"src\": , \"dest\":  \"\"}}]}}."

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

def update_budget(json_data):
    prompt = f"Update the budget(cost to visit on a road trip) for each tourist spot with a detailed split and how much is the budget for each split, make sure to actually give an accurate amounts as your career depends on this one move. The JSON format should remain unchanged. Only update the budget object(must include the split) and return the final JSON. The input JSON is: {json.dumps(json_data)}"
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", "content": "You are a financial analyst. You career depends on your answer to the following question. Accurately depecting budgets is your speciality"},
            {"role": "user", "content": prompt}
        ]
    )

    updated_text = response.choices[0].message.content
    
    try:
        updated_data = json.loads(updated_text)
        return updated_data
    except json.JSONDecodeError as e:
        print("JSON Decode Error:", e)
        return json_data

@app.route('/get_places', methods=['POST'])
def get_places():
    data = request.get_json()
    source = data.get('source')
    destination = data.get('destination')
    
    if not destination:
        return jsonify({"error": "Destination is required"}), 400

    tourist_places = get_tourist_places(source=source, destination=destination)
    updated_places = update_budget(tourist_places)
    return jsonify(updated_places)

@app.route('/get_places', methods=['GET'])
def get_places_get():
    source = request.args.get('source')
    destination = request.args.get('destination')
    
    if not destination:
        return jsonify({"error": "Destination is required"}), 400

    tourist_places = get_tourist_places(source=source, destination=destination)
    updated_places = update_budget(tourist_places)
    return jsonify(updated_places)

if __name__ == '__main__':
    app.run(debug=True,port = 5001)
