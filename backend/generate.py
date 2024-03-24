import time 
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os

txt_file_path = "output.txt"

load_dotenv(find_dotenv())

OPENAI_API_KEY= os.getenv('OPENAI_API_KEY')
ASSISTANT_ID= os.getenv('ASSISTANT_ID')


client = OpenAI(api_key=OPENAI_API_KEY)

assistant = client.beta.assistants.create(
        name="VentureVisionary Assistant",
        instructions= "You are a bot that gets parameters of location, property address, price of property, and a type of business. Generate info that outlines all the given information, target audience of the location, advantages and disadvantages of buying a property for the specified business in that specified location, and important buyer and seller info.",
        tools=[{"type": "code_interpreter"}],
        model="gpt-4"
    )

thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                # Update this with the query you want to use.
                "content": "output the following information in a file called Property Report Dallas: Location: Dallas, Texas, Property Address: 5423 Gregg Street, Price of Property: 1.4 Million, Type of Business: Hospital, Target Audience of location, advantages and disadvantages of buying a property for a hospital in Dallas, and important buyer and seller info", 
                "content": "output the following information in a file called Property Report Chicago: Location: Chicago, Illinois, Property Address: 5423 Gregg Street, Price of Property: 1.4 Million, Type of Business: Restaurant, Target Audience of location, advantages and disadvantages of buying a property for a hospital in Dallas, and important buyer and seller info", 
                #content will be replaced with input from diff file probs
            }
        ]
    )

def get_response(thread):
    return client.beta.threads.messages.list(thread_id=thread.id)

def get_file_ids_from_thread(thread):
    file_ids = [
        file_id
        for m in get_response(thread)
        for file_id in m.file_ids
    ]
    return file_ids

def write_file_to_temp_dir(file_id, output_path):
    file_data = client.files.content(file_id)
    file_data_bytes = file_data.read()
    with open(output_path, "wb") as file:
        file.write(file_data_bytes)


# Submit the thread to the assistant (as a new run).
run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)
print(f"Run Created: {run.id}")

# Wait for run to complete.
while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        print(f"Run Status: {run.status}")
        time.sleep(10)
else:
    print(f"Run Completed!")

    # Get the latest message from the thread.
    message_response = client.beta.threads.messages.list(thread_id=thread.id)
    messages = message_response.data

    # Print the latest message.
    latest_message = messages[0]
    response_text = latest_message.content[0].text.value  # Ensure this is the correct path to the text

    print(response_text)
