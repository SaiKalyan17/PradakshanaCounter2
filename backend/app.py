from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app, origins=["https://pradakshana-counter2.vercel.app"]) 
EXCEL_FILE = 'data.xlsx'

# Initialize file if it doesn't exist
if not os.path.exists(EXCEL_FILE):
    pd.DataFrame(columns=['Name', 'Count']).to_excel(EXCEL_FILE, index=False)

@app.route('/', methods=['GET', 'HEAD'])
def home():
    return 'Pradakshana Counter API Running', 200

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get('name')
    count = int(data.get('count'))

    df = pd.read_excel(EXCEL_FILE)
    df = pd.concat([df, pd.DataFrame([{'Name': name, 'Count': count}])], ignore_index=True)
    df.to_excel(EXCEL_FILE, index=False)

    total = df['Count'].sum()
    return jsonify({'total': int(total)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))  # use PORT from Render
    app.run(host='0.0.0.0', port=port)

