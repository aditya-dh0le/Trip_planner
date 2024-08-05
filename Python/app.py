from flask import Flask, request, jsonify
from openai import OpenAI

import json
 
app = Flask(__name__)
 
# Initialize OpenAI client
client = OpenAI(api_key='sk-proj-OMa3SyyOrgmDq8JyXF0rT3BlbkFJ6TZVRWmVop263JK93BVN')
 
class PackingListAgent:
    def __init__(self):
        self.name = "Packing List Agent"
 
    def generate_packing_list(self, source, destination):
        prompt = f"Generate a packing list for a trip from {source} to {destination}. Consider the climate of {destination} and include items for different weather conditions, daily essentials, and travel necessities. Mention some items which are specific and different with respect to the source and destination as well. Return it as a JSON"
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a packing list generator. Make sure you also provide some specific items based on the source and destination and not just general packing list items"},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
 
 
class LocationFinderAgent:
    def __init__(self):
        self.name = "Location Finder"
 
    def find_locations(self, source, destination, mood):
        prompt = f"Find interesting locations to visit between {source} and {destination} considering a {mood} mood. Provide a detailed list with a mix of popular tourist spots and hidden gems."
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "You are a location finder agent."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
 
class ItineraryPlannerAgent:
    def __init__(self):
        self.name = "Itinerary Planner"
 
    def plan_itinerary(self, locations, source, destination, trip_type, budget, num_days):
        prompt = f"Using the following locations: {locations}, plan a {trip_type} itinerary from {source} to {destination}. The trip should last {num_days} days and stay within a budget of {budget} dollars. Include detailed daily activities, accommodation suggestions, and meal options."
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "You are an itinerary planner agent."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
 
class TripReviewerAgent:
    def __init__(self):
        self.name = "Trip Reviewer"
 
    def review_itinerary(self, itinerary):
        prompt = f"Here is a proposed itinerary: {itinerary}. Review the itinerary in detail and provide feedback on how well it meets the requirements. Make suggestions for improvement if necessary and provide a conclusion on whether the trip is well planned."
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a trip reviewer agent."},
                {"role": "user", "content": prompt}
            ]
        )
        feedback = response.choices[0].message.content
        conclusion = "Based on my review, the trip is well planned." in feedback
        return feedback, conclusion
 
class FinancialAnalystAgent:
    def __init__(self):
        self.name = "Financial Analyst"
 
    def get_detailed_budget(self, day, activities):
        prompt = f"Provide a detailed budget description for the following activities on day {day}: {activities}. Include costs for accommodation, meals, transportation, and any other relevant expenses.Add it as a string with the description of the budget"
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a financial analyst."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
 
class OutputFormatterAgent:
    def __init__(self):
        self.name = "Output Formatter"
 
    def format_output(self, itinerary, feedback, detailed_budgets):
        prompt = f"""Convert the following itinerary and feedback into a JSON format with sections for itinerary and budget (arrays), where each day is an object with its description inside the sections:
        Itinerary: {itinerary}
        Feedback: {feedback}
        Detailed Budgets: {detailed_budgets}
       
        Use the given format only for the JSON and don't modify it return exactly this format, Dont return anything other than the JSON(no text):
        {{
            "crew":
            [
            {{
                "day": 1,
                "itinerary": {{
                    "morning": "example morning activities",
                    "afternoon": "example afternoon activities",
                    "evening": "example evening activities",
                    "night": "example night activities"
                }},
                "detailed_budget_description": "budget breakdown for the day as a simple paragraph"
 
            }},
            "similarly for other days"
            ]
        }}
        """
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": "You are an output formatter agent."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
 

client = OpenAI(
    api_key='sk-proj-OMa3SyyOrgmDq8JyXF0rT3BlbkFJ6TZVRWmVop263JK93BVN',
)

def get_tourist_places(source=None, destination=None):
    if source and destination:
        prompt = f"List tourist places (at least 5 each) en route from {source} to {destination} and tourist places in {destination}. Provide the response in JSON format with the latitudes, longitudes, and budget (show the budget split approximately for each place) as well. Mention the lat and lng inside the position object.Use the format {{ \"en_route\": [{{\"name\": \"\", \"position\": , \"description\": , \"budget\": \"\"}}], \"destination\": [{{\"name\": \"\", \"position\":  , \"description\": , \"budget\": \"\"}}] ,\"base_budget\": [{{\"budget from source to destination\": \"\"}}],\"requestData\": [{{\"src\": , \"dest\":  \"\"}}]}}."
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
 
@app.route('/planiti', methods=['POST'])
def plan_trip():
    data = request.get_json()
 
    # Extract data from the JSON
    source = data.get('source')
    destination = data.get('destination')
    trip_type = data.get('trip_type')
    budget = data.get('budget')
    num_days = data.get('num_days')
    mood = data.get('mood')
 
    # Initialize agents
    location_finder = LocationFinderAgent()
    itinerary_planner = ItineraryPlannerAgent()
    trip_reviewer = TripReviewerAgent()
    financial_analyst = FinancialAnalystAgent()
    output_formatter = OutputFormatterAgent()
 
    # Location Finder Agent finds locations
    locations = location_finder.find_locations(source, destination, mood)
 
    # Itinerary Planner Agent plans the itinerary
    itinerary = itinerary_planner.plan_itinerary(locations, source, destination, trip_type, budget, num_days)
 
    # Trip Reviewer Agent reviews the itinerary
    feedback, conclusion = trip_reviewer.review_itinerary(itinerary)
 
    # Financial Analyst Agent gets detailed budgets
    detailed_budgets = []
    for day in range(1, num_days + 1):
        activities = {
            "morning": f"Activities for morning of day {day}",
            "afternoon": f"Activities for afternoon of day {day}",
            "evening": f"Activities for evening of day {day}",
            "night": f"Activities for night of day {day}"
        }
        detailed_budget = financial_analyst.get_detailed_budget(day, activities)
        detailed_budgets.append({
            "day": day,
            "itinerary": activities,
            "detailed_budget_description": detailed_budget
        })
 
    # Output Formatter Agent formats the final output into JSON
    formatted_output = output_formatter.format_output(itinerary, feedback, detailed_budgets)
 
    return formatted_output
 
 
@app.route('/packing_list', methods=['POST'])
def packing_list():
    data = request.get_json()
    source = data.get('source')
    destination = data.get('destination')
 
    if not source or not destination:
        return jsonify({"error": "Source and destination are required"}), 400
 
    # Initialize PackingListAgent
    packing_list_agent = PackingListAgent()
    packing_list = packing_list_agent.generate_packing_list(source, destination)
 
    return packing_list
 
 
 
if __name__ == '__main__':
    app.run(debug=True, port=5000)