from flask import Flask, render_template, request, redirect, session, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = '****'  # Set your secret key for session management

# MySQL Database Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = '***'
app.config['MYSQL_PASSWORD'] = '*****'
app.config['MYSQL_DB'] = '***'

mysql = MySQL(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/sign_up', methods=['POST', 'GET'])
def sign_up():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
         # Create a cursor to interact with the database
        cursor = mysql.connection.cursor()

        # Execute the SQL query to insert the data into the users table
        query = "INSERT INTO users (username, password) VALUES (%s, %s)"
        cursor.execute(query, (username, password))

        # Commit the changes to the database
        mysql.connection.commit()

        # Close the cursor and the database connection
        cursor.close()
        mysql.connection.close()

        session['username'] = username
        return redirect('/welcome')
    else:
        return render_template('sign_up.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        user = cur.fetchone()
        cur.close()

        if user:
            session['username'] = user[1]
            return redirect('/welcome')
        else:
            return redirect('/?error=1')
    else:
        return render_template('login.html')

@app.route('/welcome')
def welcome():
    if 'username' in session:
        return render_template('welcome.html', username=session['username'])
    else:
        return redirect('/')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')

@app.route('/found_page')
def found_page():
    username = session.get('username')
    return render_template('found_page.html', username=username)

@app.route('/lost_page')
def lost_page():
    return render_template('lost_page.html')




# for page loads and refreshes in found page
@app.route('/get_items', methods=['GET'])
def get_items():

    # Get a MySQL connection from the extension
    connection = mysql.connection
    cursor = connection.cursor()

    # Replace 'items' with your actual table name and 'username_column' with the column name storing the usernames
    query = "SELECT * FROM items WHERE login = %s"
    cursor.execute(query, (session['username'],))

    items = []
    for item in cursor.fetchall():
        item_data = {
            'id': item[0],
            'title': item[1],
            'description': item[2],
            'image_url': f"/static/images/{item[4]}",
            
        }
        items.append(item_data)

    cursor.close()

    return items



#handling submissions from add item form
@app.route('/add_item', methods=['POST'])
def add_item():
    # Get the data from the request
    data = request.get_json()

    # Extract the relevant information from the data
    title = data['title']
    description = data['description']
    login = session['username']

    # Get the MySQL connection from the app context
    cursor = mysql.connection.cursor()

    # Insert the new item into the database using the MySQL connection
    cursor.execute(
        "INSERT INTO items (title, description, login) VALUES (%s, %s, %s)",
        (title, description, login)
    )

    # Commit the changes and close the cursor
    mysql.connection.commit()
    cursor.close()

     # Return the newly inserted item as JSON response
    new_item = {
        'title': title,
        'description': description,
    }
    return jsonify(new_item)


#loading all the card on lost page
@app.route('/get_all_items', methods=['GET'])
def get_all_items():

    # Get a MySQL connection from the extension
    connection = mysql.connection
    cursor = connection.cursor()

    # Replace 'items' with your actual table name and 'username_column' with the column name storing the usernames
    query = "SELECT * FROM items"
    cursor.execute(query)

    items = []
    for item in cursor.fetchall():
        item_data = {
            'id': item[0],
            'title': item[1],
            'description': item[2],
            'image_url': f"/static/images/{item[4]}",
        }
        items.append(item_data)

    cursor.close()

    return items
    

if __name__ == '__main__':
    app.run(debug=True)
