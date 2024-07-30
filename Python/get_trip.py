import openai
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

client = openai.OpenAI(
    api_key='sk-proj-OMa3SyyOrgmDq8JyXF0rT3BlbkFJ6TZVRWmVop263JK93BVN',
)


class LocationFinderAgent:
    def __init__(self):
        self.name = "Location Finder"

    def find_locations(self, source, destination):
        prompt = {
            "role": "system", "content": "You are a location finder agent."
        }
        user_message = {
            "role": "user", "content": f"Find interesting locations to visit between {source} and {destination}. Provide a detailed list with a mix of popular tourist spots and hidden gems in JSON format.Just provide the JSON and nothing else"
        }
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[prompt, user_message]
        )
        print(f"Location Finder Response: {response}")
        return response.choices[0].message.content

class ItineraryPlannerAgent:
    def __init__(self):
        self.name = "Itinerary Planner"

    def plan_itinerary(self, locations, source, destination, trip_type, budget, num_days):
        prompt = {
            "role": "system", "content": "You are an itinerary planner agent."
        }
        user_message = {
            "role": "user", "content": f"""Using the following locations: {locations}, plan a {trip_type} itinerary from {source} to {destination}. The trip should last {num_days} days and stay within a budget of {budget} dollars. 
        Provide the itinerary in the following JSON format:

        {{
            "itinerary": {{
                "day1": {{
                    "description": "Step-by-step guide for the day"
                }},
                "day2": {{
                    "description": "Step-by-step guide for the day"
                }},
                ...
            }},
            "suggestions": "Suggestions based on the itinerary",
            "budget": {{
                "day1": {{
                    "accommodation": "Cost for accommodation",
                    "meals": "Cost for meals",
                    "activities": "Cost for activities",
                    "transport": "Cost for transport"
                }},
                "day2": {{
                    "accommodation": "Cost for accommodation",
                    "meals": "Cost for meals",
                    "activities": "Cost for activities",
                    "transport": "Cost for transport"
                }},
                ...
            }}
        }}"""
        }
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[prompt, user_message]
        )
        print(f"Itinerary Planner Response: {response}")
        return response.choices[0].message.content

class TripReviewerAgent:
    def __init__(self):
        self.name = "Trip Reviewer"

    def review_itinerary(self, itinerary_json):
        prompt = {
            "role": "system", "content": "You are a trip reviewer agent."
        }
        user_message = {
            "role": "user", "content": f"""Here is a proposed itinerary: {json.dumps(itinerary_json)}. Review the itinerary in detail and provide feedback on how well it meets the requirements. Make suggestions for improvement if necessary and provide a conclusion on whether the trip is well planned.
        Provide the review in the following JSON format:

        {{
            "suggestions": "Detailed feedback and suggestions"
        }}"""
        }
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[prompt, user_message]
        )
        print(f"Trip Reviewer Response: {response}")
        feedback = response.choices[0].message.content
        conclusion = "Based on my review, the trip is well planned." in feedback
        return feedback, conclusion

class Traveller:
    def __init__(self, source, destination, trip_type, budget, num_days):
        self.name = "Traveller"
        self.source = source
        self.destination = destination
        self.trip_type = trip_type
        self.budget = budget
        self.num_days = num_days

@app.route('/plan_trip', methods=['POST'])
def plan_trip():
    data = request.json
    source = data['source']
    destination = data['destination']
    trip_type = data['trip_type']
    budget = data['budget']
    num_days = data['num_days']

    traveller = Traveller(source, destination, trip_type, budget, num_days)
    print(f"Traveller Details: {data}")

    # Initialize agents
    location_finder = LocationFinderAgent()
    itinerary_planner = ItineraryPlannerAgent()
    trip_reviewer = TripReviewerAgent()

    # Location Finder Agent finds locations
    try:
        locations = location_finder.find_locations(traveller.source, traveller.destination)
        print(f"Locations Found: {locations}")
        locations = json.loads(locations)  # Assuming the response is in JSON format
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON for locations: {e}")
        return jsonify({"error": "Error decoding JSON for locations"}), 500

    # Itinerary Planner Agent plans the itinerary
    try:
        itinerary_text = itinerary_planner.plan_itinerary(locations, traveller.source, traveller.destination, traveller.trip_type, traveller.budget, traveller.num_days)
        print(f"Proposed Itinerary Text: {itinerary_text}")
        itinerary_json = json.loads(itinerary_text)  # Assuming the response is in JSON format
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON for itinerary: {e}")
        return jsonify({"error": "Error decoding JSON for itinerary"}), 500

    # Trip Reviewer Agent reviews the itinerary
    try:
        feedback, conclusion = trip_reviewer.review_itinerary(itinerary_json)
        print(f"Reviewer Feedback: {feedback}")
        feedback_json = json.loads(feedback)  # Assuming the feedback is in JSON format
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON for feedback: {e}")
        return jsonify({"error": "Error decoding JSON for feedback"}), 500

    itinerary_json["suggestions"] = feedback_json["suggestions"]

    final_response = {
        "itinerary": itinerary_json["itinerary"],
        "suggestions": itinerary_json["suggestions"],
        "budget": itinerary_json["budget"],
        "conclusion": "The trip is well planned." if conclusion else "The trip needs adjustments based on the feedback provided."
    }

    print(f"Final Response: {json.dumps(final_response, indent=4)}")
    return jsonify(final_response)

if __name__ == '__main__':
    app.run(port=5000)