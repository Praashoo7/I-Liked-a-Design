import requests
from bs4 import BeautifulSoup
import os

def extract_data_original_from_website(url):
    # Fetch the HTML content of the website
    response = requests.get(url)
    if response.status_code == 200:
        html_content = response.text
        # Parse HTML using BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        # Find all elements with data-original attribute
        elements = soup.find_all(lambda tag: tag.has_attr('data-original'))
        # Extract data-original values and put them into a list
        data_original_list = [element['data-original'] for element in elements]
        return data_original_list
    else:
        print("Failed to fetch the website:", response.status_code)
        return []

# Example website URL
website_url = "https://www.transparenttextures.com"

# Extract data-original attributes from the website
data_original_values = extract_data_original_from_website(website_url)

# Prepend "https://www.transparenttextures.com" to each item in the list
data_original_values_with_prefix = [website_url + item for item in data_original_values]

# Print the list of data-original values with the prefix
print(data_original_values_with_prefix)

def download_patterns(data_original_values_with_prefix, download_folder):
    # Create the download folder if it doesn't exist
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)
    
    # Download each pattern
    for url in data_original_values_with_prefix:
        # Extract the filename from the URL
        filename = url.split('/')[-1]
        # Define the file path to save the pattern
        file_path = os.path.join(download_folder, filename)
        # Download the pattern
        response = requests.get(url)
        if response.status_code == 200:
            # Save the pattern to the file
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"Pattern '{filename}' downloaded successfully.")
        else:
            print(f"Failed to download pattern '{filename}': {response.status_code}")
            
# Folder to store downloaded patterns
download_folder = "patterns"

# Download patterns and store them in the local folder
download_patterns(data_original_values_with_prefix, download_folder)
