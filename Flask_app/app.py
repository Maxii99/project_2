import numpy as np
import datetime as dt
import pandas as pd


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
rds_connection_string = "immigration_cnn:@localhost:5432/migration_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
details = Base.classes.details
regional = Base.classes.regional
regions = Base.classes.regions

labels =['Age 0-5', 'Age 6-10', 'Age 11-15', 'Age 16-20', 'Age 20+', '9th Grade', '12th Grade', 'HS_Dropout', 'HS Grad', 'College 2 Yr', 'Bach Degree', 'Adv Degree', 'College Enroll 18-24', 'College Enroll 25+', 'Median Income FT', 'Median Income PT', 'Income 0-25k', 'Income 25k-48k', 'Income 48k-77k', 'Income 77k-125k', 'Income 125k+', 'Management', 'Science & Eng.', 'Legal Social Service', 'Education & Arts', 'Health care', 'Food prep serve', 'Cleaning & maint.', 'Other services', 'Sales', 'Administrative', 'Farming & fishing', 'Construction', 'Manufacturing', 'Transportation', 'Military', 'Unemployed']

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/migration_data/(demography)[age\education\median_income\income\occupation]<br/>"
    )


@app.route("/api/v1.0/migration_data/<demography>")
def migration_data(demography):

    session = Session(engine)

    stmt = session.query(regional).statement
    df = pd.read_sql_query(stmt, session.bind)

    session.close

    meta_dict = {'demography':demography}

    if demography == 'age':
    
        demography_df = df.iloc[:,1:7].T
        meta_dict['labels'] =  labels[0:5]
    
    elif demography == 'education':
        demography_df = df.iloc[:,np.r_[1, 7:16]].T
        meta_dict['labels'] =  labels[5:14]
        
    elif demography == 'median_income':
        demography_df = df.iloc[:,np.r_[1, 16:18]].T
        meta_dict['labels'] =  labels[14:16]

    elif demography == 'income':
        demography_df = df.iloc[:,np.r_[1, 18:23]].T
        meta_dict['labels'] =  labels[16:21]
        
    elif demography == 'occupation':
        demography_df = df.iloc[:,np.r_[1, 23:39]].T
        meta_dict['labels'] =  labels[21:]
    else:
        return jsonify('data not found')     
    

    traces = {demography_df[i].to_list()[0] : demography_df[i].to_list()[1:] for i in demography_df}

    myJSON = [meta_dict, traces]
    return jsonify(myJSON)




if __name__ == '__main__':
    app.run(debug=True)
