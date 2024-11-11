import streamlit as st
import pandas as pd
from utils import generate_visualizations, get_gemini_response, parse_gemini_response


global df
# Set up Google Gemini API key
GENAI_API_KEY = "AIzaSyA6fe32hAo-5ZHTJ5tQCbAmamFz4gFlLD4"  # Replace with your actual Gemini API key

# Streamlit UI components
st.title("Data Analysis and Visualization App with Gemini")
st.write("""
    This application allows users to upload a dataset, generate visualizations,
    and ask natural language questions based on the data. The model can help you explore 
    patterns, correlations, and other insights in your dataset.
""")

# File upload for CSV
uploaded_file = st.file_uploader("Upload a CSV file", type="csv")
if uploaded_file is not None:
    # Load and display the uploaded dataset
    df = pd.read_csv(uploaded_file)
    st.write("Dataset Preview", df.head())


    # Generate 5 initial visualizations based on the dataset
    st.write("Generating the first 5 important visualizations...")
    
    # Automatically generate visualizations based on dataset
    # This can be improved by analyzing the dataset features more thoroughly
    generated_visualizations = set()
    i = 0  # To track the number of unique visualizations generated
    while i < 5:
        query = f"Generate an important visualization for the dataset {i+1}"
        response = get_gemini_response(query, df, GENAI_API_KEY)
        print(response)

        # Parse the response to get chart details
        chart_type, chart_code, x_label, y_label = parse_gemini_response(response)

        # Check if the visualization already exists
        visualization_key = (chart_type, x_label, y_label)
        if visualization_key not in generated_visualizations:
            # Generate and display the visualizations
            generate_visualizations(df, chart_type, chart_code, x_label, y_label)
            generated_visualizations.add(visualization_key)
            i += 1  # Increment only for successful visualizations
        else:
            st.write(f"Skipping duplicate visualization: {chart_type} ({x_label} vs {y_label})")


    # Natural language query input
    query = st.text_input("Ask a question about the dataset:")
    
    if query:
        # Get response from Gemini model
        response = get_gemini_response(query, df, GENAI_API_KEY)
        st.subheader("Gemini's Answer")
        st.write(response)

        # Parse the response to get chart details
        chart_type, chart_code, x_label, y_label = parse_gemini_response(response)
        
        # Generate and display the visualizations
        generate_visualizations(df, chart_type, chart_code, x_label, y_label)
